package com.smu.oopg1t4.form;

import com.smu.oopg1t4.exceptions.FormAlreadyExistsException;
import com.smu.oopg1t4.exceptions.FormNotEditableException;
import com.smu.oopg1t4.exceptions.FormNotFoundException;
import com.smu.oopg1t4.questionnaire.Questionnaire;
import com.smu.oopg1t4.questionnaire.QuestionnaireService;
import com.smu.oopg1t4.response.StatusResponse;
import com.smu.oopg1t4.response.SuccessResponse;
import com.smu.oopg1t4.util.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;


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
        try {
            checkDuplicateForm(form.getFormCode(), form.getRevisionNo());
            form.setId(sequenceGeneratorService.generateSequence(Form.SEQUENCE_NAME));
            List<Questionnaire> questionnaires = form.getQuestionnaires();
            String current = null;
            int count = 0;
            List<Integer> workflow = new ArrayList<>();

            for (Questionnaire questionnaire: questionnaires){
                if (current == null){
                    current = questionnaire.getRoleRequired();
                    count = 1;
                } else if (questionnaire.getRoleRequired().equals(current)){
                    count++;
                } else if (!questionnaire.getRoleRequired().equals(current)){
                    workflow.add(count);
                    count = 1;
                    current = questionnaire.getRoleRequired();
                }
            }

            workflow.add(count);
            int upTo = workflow.get(0);

            form.setWorkflow(workflow);
            form.setUpTo(upTo);

            Form createdForm = formRepository.save(form);
            SuccessResponse successResponse = new SuccessResponse("Successfully created form.", HttpStatus.CREATED.value(), createdForm);
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (FormAlreadyExistsException e) {
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error adding form. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    // Returns updated form
    public ResponseEntity<?> updateFormById(int formId, Form form) {
        try {
            Form formToUpdate = getFormById(formId);

            updateForm(formToUpdate, form);

            SuccessResponse successResponse = new SuccessResponse("Successfully updated form with id " + formToUpdate.getId(), HttpStatus.OK.value(), formToUpdate);
            return ResponseEntity.ok().body(successResponse);
        } catch (FormNotFoundException e) {
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        } catch (FormNotEditableException e) {
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.METHOD_NOT_ALLOWED.value());
            return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(statusResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error updating form. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }

    public ResponseEntity<?> updateFormAndSaveQuestionnaire(int formId, int questionnaireIndex, Form form) {
        try {
            Form formToUpdate = getFormById(formId);

            updateForm(formToUpdate, form);

            ArrayList<Questionnaire> questionnaires = formToUpdate.getQuestionnaires();
            Questionnaire questionnaireToSave = questionnaires.get(questionnaireIndex);
            questionnaireService.createQuestionnaire(questionnaireToSave);

            StatusResponse successResponse = new StatusResponse("Successfully saved questionnaire.", HttpStatus.CREATED.value());
            return ResponseEntity.ok().body(successResponse);
        } catch (IndexOutOfBoundsException e) {
            StatusResponse statusResponse = new StatusResponse("Questionnaire index out of bounds.", HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        } catch (NoSuchElementException e) {
            StatusResponse statusResponse = new StatusResponse("Form with id " + formId + " not found.", HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        } catch (FormNotFoundException e) {
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        } catch (FormNotEditableException e) {
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.METHOD_NOT_ALLOWED.value());
            return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(statusResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error saving questionnaire. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    // Returns all forms in a List
    public ResponseEntity<?> getAllForms() {
        try {
            List<Form> allForms = formRepository.findAll();

            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), allForms);
            return ResponseEntity.ok().body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Unable to retrieve all forms. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    //get form by id
    public ResponseEntity<?> getForm(int id) {
        try {
            Form form = getFormById(id);

            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), form);
            return ResponseEntity.ok().body(successResponse);
        } catch (FormNotFoundException e) {
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error updating form. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    public ResponseEntity<?> searchForms(
            String formCode,
            String description,
            String[] formStatus,
            String start,
            String end
    ) {
        try {
            // not sure how to do isNull in mongodb query, so this is the dirty fix..
            formCode = (formCode == null || formCode.equals("")) ? ".*" : formCode;
            description = (description == null || description.equals("")) ? ".*" : description;
            formStatus = (formStatus == null || formStatus.length == 0) ? new String[]{"draft", "published", "outdated"} : formStatus;
            start = (start == null || start.equals("")) ? "1900-01-01" : start;
            end = (end == null || end.equals("")) ? "9999-12-31" : end;

            Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse(start);
            Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse(end);

            List<Form> forms = formRepository.searchFormsByProperties(formCode, description, formStatus, startDate, endDate);
            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), forms);
            return ResponseEntity.status(HttpStatus.OK).body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Failed to get results. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    public ResponseEntity<?> reviseForm(int id) {
        try {
            Form form = getFormById(id);
            Form newForm = new Form(
                    sequenceGeneratorService.generateSequence(Form.SEQUENCE_NAME),
                    form.getFormCode(),
                    form.getRevisionNo() + 1,
                    form.getDescription(),
                    form.getEffectiveDate(),
                    form.getQuestionnaires(),
                    "draft",
                    form.getWorkflow(),
                    form.getUpTo()
            );

            checkDuplicateForm(newForm.getFormCode(), newForm.getRevisionNo());

            formRepository.save(newForm);

            SuccessResponse successResponse = new SuccessResponse("New revision created.", HttpStatus.CREATED.value(), newForm);
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (FormNotFoundException e) {
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        } catch (FormAlreadyExistsException e) {
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error creating new revision of form. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    public ResponseEntity<?> saveAndPublishForm(int id, Form form) {
        try {
            Form formToPublish = getFormById(id);
            updateForm(formToPublish, form);

            formToPublish.setFormStatus("published");
            formRepository.save(formToPublish);

            setPreviousRevisionStatus(formToPublish.getFormCode(), formToPublish.getRevisionNo() - 1);

            StatusResponse successResponse = new StatusResponse("Success!", HttpStatus.OK.value());
            return ResponseEntity.status(HttpStatus.OK).body(successResponse);
        } catch (FormNotFoundException e) {
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        } catch (FormNotEditableException e) {
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.METHOD_NOT_ALLOWED.value());
            return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(statusResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error publishing form. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    public ResponseEntity<?> deleteForm(int id) {
        formRepository.deleteById(id);
        StatusResponse statusResponse = new StatusResponse("Success", HttpStatus.OK.value());
        return ResponseEntity.status(HttpStatus.OK).body(statusResponse);
    }

    private Form getFormById(int formId) throws FormNotFoundException {
        Optional<Form> formOptional = formRepository.findById(formId);
        if (formOptional.isEmpty()) {
            throw new FormNotFoundException("Form with id " + formId + " was not found.");
        }
        return formOptional.get();
    }

    private void updateForm(Form formToUpdate, Form form) throws FormNotEditableException {
        if (!formToUpdate.getFormStatus().equals("draft")) {
            throw new FormNotEditableException("Form has previously been published.");
        }

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
    }

    private void setPreviousRevisionStatus(String formCode, int revisionNo) {
        List<Form> previousFormQuery = formRepository.findByFormCodeAndRevisionNo(formCode, revisionNo);

        if (previousFormQuery.isEmpty()) {
            return;
        }

        Form previousRevision = previousFormQuery.get(0);
        previousRevision.setFormStatus("outdated");
        formRepository.save(previousRevision);
    }

    private void checkDuplicateForm(String formCode, int revisionNo) throws FormAlreadyExistsException {
        boolean duplicateFormExists = formRepository.existsByFormCodeAndRevisionNumber(formCode, revisionNo);
        if (duplicateFormExists) {
            throw new FormAlreadyExistsException("A form with the proposed Form Code and Revision Number already exists.");
        }
    }
}
