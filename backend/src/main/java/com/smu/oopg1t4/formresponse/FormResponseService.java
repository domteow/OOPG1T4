package com.smu.oopg1t4.formresponse;

import com.smu.oopg1t4.form.Form;
import com.smu.oopg1t4.form.FormRepository;
import com.smu.oopg1t4.questionnaire.QuestionnaireService;
import com.smu.oopg1t4.response.StatusResponse;
import com.smu.oopg1t4.response.SuccessResponse;
import com.smu.oopg1t4.util.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class FormResponseService {
    private final FormRepository formRepository;
    private final FormResponseRepository formResponseRepository;
    private final SequenceGeneratorService sequenceGeneratorService;
    private final QuestionnaireService questionnaireService;

    @Autowired
    public FormResponseService(
            FormResponseRepository formResponseRepository,
            SequenceGeneratorService sequenceGeneratorService,
            QuestionnaireService questionnaireService,
            FormRepository formRepository
    ) {
        this.formResponseRepository = formResponseRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
        this.questionnaireService = questionnaireService;
        this.formRepository = formRepository;
    }


    //get forms by vendor id
    public ResponseEntity<?> getFormByVendorID(int ownerId) {
        List<FormResponse> forms = formResponseRepository.getFormByVendorID(ownerId);
        if (forms.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new StatusResponse("Forms not found.", HttpStatus.NOT_FOUND.value()));
        }
        return ResponseEntity.ok().body(
                new SuccessResponse("Success", HttpStatus.OK.value(), forms));
    }

    public ResponseEntity<?> getFormByFormResponseID(int id) {
        Optional<FormResponse> form = formResponseRepository.findById(id);
        if (form.isPresent()) {
            return ResponseEntity.ok().body(
                    new SuccessResponse("Success", HttpStatus.OK.value(), form.get()));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new StatusResponse("Form not found.", HttpStatus.NOT_FOUND.value()));
    }

    public ResponseEntity<StatusResponse> assignFormToVendor(int formId, int vendorId) {
        Optional<Form> optionalForm = formRepository.findById(formId);
        if (optionalForm.isPresent()) {
            Form form = optionalForm.get();
            FormResponse formResponse = new FormResponse(
                    sequenceGeneratorService.generateSequence(FormResponse.SEQUENCE_NAME),
                    form.getFormCode(),
                    form.getRevisionNo(),
                    form.getDescription(),
                    form.getEffectiveDate(),
                    form.getQuestionnaires(),
                    form.getFormStatus(),
                    vendorId,
                    form.getQuestionnaires().get(0).getRoleRequired(),
                    0,
                    false,
                    false
            );
            formResponseRepository.save(formResponse);

            return ResponseEntity.ok().body(
                    new StatusResponse("Success", HttpStatus.OK.value()));
        } else {
            return ResponseEntity.ok().body(
                    new StatusResponse("Failure", HttpStatus.OK.value()));
        }

    }
}
