package com.smu.oopg1t4.formResponse;


import com.smu.oopg1t4.questionnaire.QuestionnaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/formResponse")
public class FormResponseController {
    private final FormResponseService formResponseService;
    private final QuestionnaireService questionnaireService;

    @Autowired
    public FormResponseController(
            FormResponseService formResponseService,
            QuestionnaireService questionnaireService
    ) {
        this.formResponseService = formResponseService;
        this.questionnaireService = questionnaireService;
    }

    @GetMapping("/getFormsByVendorId/{ownerId}")
    public ResponseEntity<?> getFormsByVendorId(@PathVariable int ownerId) {
        return formResponseService.getFormByVendorID(ownerId);
    }

    @GetMapping("/getFormByFormResponseID/{id}")
    public ResponseEntity<?> getFormByID(@PathVariable int id) {
        return formResponseService.getFormByFormResponseID(id);
    }




}
