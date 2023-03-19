package com.smu.oopg1t4.form;

import com.smu.oopg1t4.questionnaire.QuestionnaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return formService.getForm(id);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchForms(
            @RequestParam(required = false) String formCode,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String[] formStatus,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate
    ) {
        return formService.searchForms(formCode, description, formStatus, startDate, endDate);
    }

    @PostMapping("/createForm")
    public ResponseEntity<?> createForm(@RequestBody Form form) {
        return formService.createForm(form);
    }

    @PostMapping("/revise/{id}")
    public ResponseEntity<?> reviseForm(@PathVariable int id) {
        return formService.reviseForm(id);
    }

    @PostMapping("/reviseFormById/{id}")
    public ResponseEntity<?> reviseForm(@PathVariable int id, @RequestBody Form form) {
        return formService.reviseFormById(id, form);
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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteForm(@PathVariable int id) {
        return formService.deleteForm(id);
    }
}
