package com.smu.oopg1t4.form;

import com.smu.oopg1t4.questionnaire.Questionnaire;
import com.smu.oopg1t4.questionnaire.QuestionnaireService;
import com.smu.oopg1t4.statusResponse.StatusResponse;
import com.smu.oopg1t4.util.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class FormService {
    private final FormRepository formRepository;
    private final QuestionnaireService questionnaireService;
    private final SequenceGeneratorService sequenceGeneratorService;


    @Autowired
    public FormService(FormRepository formRepository, SequenceGeneratorService sequenceGeneratorService, QuestionnaireService questionnaireService) {
        this.formRepository = formRepository;
        this.questionnaireService = questionnaireService;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    //returns all forms in a List
    public List<Form> getAllForms() {
        return formRepository.findAll();
    }

    //get form by id
    public Form getFormByID(int id) throws Exception {
        List<Form> forms = formRepository.findByID(id);
        // need to implement check if id exists
        return forms.get(0);
    }

    // Returns created form to caller in http response
    // If error, return message and status code.
    public Object createForm(Form form) {
        try {
            form.setFormID(sequenceGeneratorService.generateSequence(Form.SEQUENCE_NAME));
            List<Form> formsWithSameCodeAndRevisionNumber = formRepository.findByFormCodeAndRevisionNumber(form.getFormCode(), form.getRevisionNo());
            if (!formsWithSameCodeAndRevisionNumber.isEmpty()) {
                throw new FormAlreadyExistsException();
            }
            Questionnaire newQuestionnaire = questionnaireService.createQuestionnaire(new Questionnaire());

            form.addQuestionnaireID(newQuestionnaire.getID());

            Form createdForm = formRepository.save(form);
            createdForm.addQuestionnaireToForm(newQuestionnaire);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdForm);
        } catch (FormAlreadyExistsException e) {
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error adding form. Please try again", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    //create more than one form
    public void createForms(List<Form> forms) {
        for (Form form : forms) {
            form.setFormID(sequenceGeneratorService.generateSequence(Form.SEQUENCE_NAME));
        }
        formRepository.saveAll(forms);
    }
}
