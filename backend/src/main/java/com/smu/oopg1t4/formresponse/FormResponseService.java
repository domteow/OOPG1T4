package com.smu.oopg1t4.formresponse;

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
    private final FormResponseRepository formResponseRepository;
    private final SequenceGeneratorService sequenceGeneratorService;
    private final QuestionnaireService questionnaireService;

    @Autowired
    public FormResponseService(
            FormResponseRepository formResponseRepository,
            SequenceGeneratorService sequenceGeneratorService,
            QuestionnaireService questionnaireService
    ) {
        this.formResponseRepository = formResponseRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
        this.questionnaireService = questionnaireService;
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
        if (form.isPresent()){
            return ResponseEntity.ok().body(
                    new SuccessResponse("Success", HttpStatus.OK.value(), form.get()));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new StatusResponse("Form not found.", HttpStatus.NOT_FOUND.value()));
    }

}
