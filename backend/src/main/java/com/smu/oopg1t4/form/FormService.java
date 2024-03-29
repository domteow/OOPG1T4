package com.smu.oopg1t4.form;

import com.smu.oopg1t4.exceptions.FormAlreadyExistsException;
import com.smu.oopg1t4.exceptions.FormNotEditableException;
import com.smu.oopg1t4.exceptions.FormNotFoundException;
import com.smu.oopg1t4.field.Field;
import com.smu.oopg1t4.field.FieldService;
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
    private final FieldService fieldService;

    @Autowired
    public FormService(
            FormRepository formRepository,
            SequenceGeneratorService sequenceGeneratorService,
            QuestionnaireService questionnaireService,
            FieldService fieldService
    ) {
        this.formRepository = formRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
        this.questionnaireService = questionnaireService;
        this.fieldService = fieldService;

    }

    // Returns response of created form
    public ResponseEntity<?> createForm(Form form) {
        try {
            checkDuplicateForm(form.getFormCode(), form.getRevisionNo());
            form.setId(sequenceGeneratorService.generateSequence(Form.SEQUENCE_NAME));
            List<Questionnaire> questionnaires = form.getQuestionnaires();
            String current = null;
            int count = 0;
            ArrayList<Integer> workflow = new ArrayList<>();
            List<Questionnaire> questionnaireToAdd = new ArrayList<>();
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

                if(questionnaire.getId() == 0){
                    questionnaireToAdd.add(questionnaire);
                }
            }

            if (questionnaireToAdd.size() != 0) {
                questionnaireService.createQuestionnaires(questionnaireToAdd);
            }

            workflow.add(count);
            int upTo = workflow.get(0);

            form.setWorkflow(workflow);
            form.setUpTo(upTo);
            form.setActive(true);


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

    public ResponseEntity<?> deleteForm(int id) {
        try{
            Optional<Form> optionalForm = formRepository.findById(id);
            String message = "";
            if (optionalForm.isPresent()) {
                Form form = optionalForm.get();
                boolean check = form.getActive();
                if (check){
                    form.setActive(false);
                    message = "in";
                } else {
                    form.setActive(true);
                }
                formRepository.save(form);
                StatusResponse statusResponse = new StatusResponse("Form active status has been toggled to " + message +"active", HttpStatus.OK.value());
                return ResponseEntity.status(HttpStatus.OK).body(statusResponse);
            }

            StatusResponse statusResponse = new StatusResponse("Form not found", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);

        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error when toggling form active status", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }



    }

    public Form getFormById(int formId) throws FormNotFoundException {
        Optional<Form> formOptional = formRepository.findById(formId);
        if (formOptional.isEmpty()) {
            throw new FormNotFoundException("Form with id " + formId + " was not found.");
        }
        return formOptional.get();
    }

    private void setPreviousRevisionStatus(String formCode, int revisionNo) {
        List<Form> previousFormQuery = formRepository.findByFormCodeAndRevisionNo(formCode, revisionNo);

        if (previousFormQuery.isEmpty()) {
            return;
        }

        Form previousRevision = previousFormQuery.get(0);

        if (previousRevision.getFormStatus().equals("readonly")){
            previousRevision.setFormStatus("outdated readonly");
        } else {
            previousRevision.setFormStatus("outdated");
        }

        previousRevision.setActive(false);
        formRepository.save(previousRevision);
    }

    private void checkDuplicateForm(String formCode, int revisionNo) throws FormAlreadyExistsException {
        boolean duplicateFormExists = formRepository.existsByFormCodeAndRevisionNumber(formCode, revisionNo);
        if (duplicateFormExists) {
            throw new FormAlreadyExistsException("A form with the proposed Form Code and Revision Number already exists.");
        }
    }

    public ResponseEntity<?> reviseFormById(int id, Form form) {
        try {
            Form oldForm = getFormById(id);
            int revNo = getLatestRevisionNo(oldForm.getFormCode());
            form.setRevisionNo(revNo + 1);
            checkDuplicateForm(form.getFormCode(), form.getRevisionNo());
            setPreviousRevisionStatus(oldForm.getFormCode(), revNo);
            createForm(form);

            SuccessResponse successResponse = new SuccessResponse("New revision created.", HttpStatus.CREATED.value(), form);
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

    private int getLatestRevisionNo(String formCode){
        List<Form> forms = formRepository.findByFormCode(formCode);
        Form form = forms.get(forms.size() - 1);
        return form.getRevisionNo();
    }
}
