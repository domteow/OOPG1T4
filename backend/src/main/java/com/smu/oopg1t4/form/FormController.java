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


    @PostMapping("/reviseFormById/{id}")
    public ResponseEntity<?> reviseForm(@PathVariable int id, @RequestBody Form form) {
        return formService.reviseFormById(id, form);
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deleteForm(@PathVariable int id) {
        return formService.deleteForm(id);
    }
}
