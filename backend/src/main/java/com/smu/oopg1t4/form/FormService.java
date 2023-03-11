package com.smu.oopg1t4.form;

import com.smu.oopg1t4.questionnaire.Questionnaire;
import com.smu.oopg1t4.questionnaire.QuestionnaireService;
import com.smu.oopg1t4.response.StatusResponse;
import com.smu.oopg1t4.response.SuccessResponse;
import com.smu.oopg1t4.util.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


@Service
public class FormService {
    private final FormRepository formRepository;
    private final SequenceGeneratorService sequenceGeneratorService;
    private final QuestionnaireService questionnaireService;

    @Autowired
    public FormService(
            FormRepository formRepository,
            SequenceGeneratorService sequenceGeneratorService,
            QuestionnaireService questionnaireService
    ) {
        this.formRepository = formRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
        this.questionnaireService = questionnaireService;
    }

    // Returns response of created form
    public ResponseEntity<?> createForm(Form form) {
        form.setId(sequenceGeneratorService.generateSequence(Form.SEQUENCE_NAME));
        try {
            boolean duplicateFormExists = formRepository
                    .existsByFormCodeAndRevisionNumber(form.getFormCode(), form.getRevisionNo());
            if (duplicateFormExists) {
                throw new FormAlreadyExistsException();
            }

            Form createdForm = formRepository.save(form);
            SuccessResponse successResponse = new SuccessResponse("Successfully created form.", HttpStatus.CREATED.value(), createdForm);
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (FormAlreadyExistsException e) {
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error adding form. Please try again", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    // Returns updated form
    public ResponseEntity<?> updateFormById(int formId, Form form) {
        Optional<Form> formOptional = formRepository.findById(formId);
        if (formOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new StatusResponse("Form not found.", HttpStatus.NOT_FOUND.value()));
        }

        Form formToUpdate = formOptional.get();
        if (!formToUpdate.getFormStatus().equals("draft")) {
            return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(
                    new StatusResponse("Form has already been published. Cannot be updated.", HttpStatus.METHOD_NOT_ALLOWED.value()));
        }

        // Seems a bit stupid here??
        if (form.getDescription() != null) {
            formToUpdate.setDescription(form.getDescription());
        }

        if (form.getEffectiveDate() != null) {
            formToUpdate.setEffectiveDate(form.getEffectiveDate());
        }

        if (!form.getQuestionnaires().equals(new ArrayList<>())) {
            formToUpdate.setQuestionnaires(form.getQuestionnaires());
        }

        formRepository.save(formToUpdate);
        return ResponseEntity.ok().body(
                new SuccessResponse("Successfully updated form with id " + formToUpdate.getId(), HttpStatus.OK.value(), formToUpdate));
    }

    public ResponseEntity<?> updateFormAndSaveQuestionnaire(int formId, int questionnaireIndex, Form form) {
        updateFormById(formId, form);
        try {
            Form updatedForm = formRepository.findById(formId).get();
            ArrayList<Questionnaire> questionnaires = updatedForm.getQuestionnaires();
            Questionnaire questionnaireToSave = questionnaires.get(questionnaireIndex);
            questionnaireService.createQuestionnaire(questionnaireToSave);
            return ResponseEntity.ok().body(
                    new SuccessResponse("Successfully saved questionnaire.", HttpStatus.CREATED.value(), questionnaireToSave));
        } catch (IndexOutOfBoundsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new StatusResponse("Questionnaire index out of bounds.", HttpStatus.NOT_FOUND.value()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new StatusResponse("Form with id " + formId + " not found.", HttpStatus.NOT_FOUND.value()));
        }
    }

    //returns all forms in a List
    public ResponseEntity<?> getAllForms() {
        return ResponseEntity.ok().body(
                new SuccessResponse("Success", HttpStatus.OK.value(), formRepository.findAll()));
    }

    //get form by id
    public ResponseEntity<?> getFormByID(int id) {
        Optional<Form> form = formRepository.findById(id);
        if (form.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new StatusResponse("Form not found.", HttpStatus.NOT_FOUND.value()));
        }
        return ResponseEntity.ok().body(
                new SuccessResponse("Success", HttpStatus.OK.value(), form.get()));
    }

    public ResponseEntity<?> reviseForm(int id) {
        Optional<Form> formOptional = formRepository.findById(id);
        if (formOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new StatusResponse("Form not found.", HttpStatus.NOT_FOUND.value()));
        }
        Form previousForm = formOptional.get();
        Form newForm = new Form(
                sequenceGeneratorService.generateSequence(Form.SEQUENCE_NAME),
                previousForm.getFormCode(),
                previousForm.getRevisionNo() + 1,
                previousForm.getDescription(),
                previousForm.getEffectiveDate(),
                previousForm.getQuestionnaires(),
                "draft"
        );
        formRepository.save(newForm);
        SuccessResponse successResponse = new SuccessResponse("New revision created.", HttpStatus.CREATED.value(), newForm);
        return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
    }

    public ResponseEntity<?> saveAndPublishForm(int id, Form form) {
        updateFormById(id, form);
        Optional<Form> formOptional = formRepository.findById(id);
        if (formOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new StatusResponse("Form not found.", HttpStatus.NOT_FOUND.value()));
        }
        Form formToPublish = formOptional.get();
        formToPublish.setFormStatus("published");
        // TODO: change the status of the prev revision to outdated

        formRepository.save(formToPublish);
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponse("Success!", HttpStatus.OK.value()));
    }
}
