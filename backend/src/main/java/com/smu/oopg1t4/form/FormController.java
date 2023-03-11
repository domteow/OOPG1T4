package com.smu.oopg1t4.form;

import com.smu.oopg1t4.questionnaire.QuestionnaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/form")
public class FormController {
    private final FormService formService;
    private final QuestionnaireService questionnaireService;

    @Autowired
    public FormController(
            FormService formService,
            QuestionnaireService questionnaireService
    ) {
        this.formService = formService;
        this.questionnaireService = questionnaireService;
    }

    @GetMapping("/get")
    public ResponseEntity<?> getAllForms() {
        return formService.getAllForms();
    }

    @GetMapping("/get/id/{id}")
    public ResponseEntity<?> getFormByID(@PathVariable int id) {
        return formService.getFormByID(id);
    }

    @PostMapping("/createForm")
    public ResponseEntity<?> createForm(@RequestBody Form form) {
        return formService.createForm(form);
    }

    @PostMapping("/revise/{id}")
    public ResponseEntity<?> reviseForm(
            @PathVariable int id
    ) {
        return formService.reviseForm(id);
    }

    // Only updates description, effectiveDate, questionnaires.
    // (?) revisionNo should only be updated when admins "revise" a form?
    // formStatus should only be updated when they "publish" a form
    @PutMapping("/update/{formId}")
    public ResponseEntity<?> updateForm(
            @PathVariable int formId,
            @RequestBody Form form) {
        return formService.updateFormById(formId, form);
    }

    @PutMapping("/update/{formId}/{questionnaireIndex}")
    public ResponseEntity<?> updateFormAndSaveQuestionnaire(
            @PathVariable int formId,
            @PathVariable int questionnaireIndex,
            @RequestBody Form form
    ) {
        return formService.updateFormAndSaveQuestionnaire(formId, questionnaireIndex, form);
    }

    @PutMapping("/publish/{id}")
    public ResponseEntity<?> saveAndPublishForm(
            @PathVariable int id,
            @RequestBody Form form
    ) {
        return formService.saveAndPublishForm(id, form);
    }

    // implement searching for forms
    // need to get forms by status
    // need to get forms by formcode + description (search)
}
