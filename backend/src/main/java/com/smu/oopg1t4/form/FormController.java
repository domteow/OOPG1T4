package com.smu.oopg1t4.form;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/form")
public class FormController {
    private final FormService formService;

    @Autowired
    public FormController(FormService formService) {
        this.formService = formService;
    }

    /*
    For admin users to "Create New Form Template"
    Example format to be passed in:
    {
        "formCode": "QLI-QHSP-10-F01",
        "revisionNo": 1,
        "description": "New Vendor Assessment Form"
        "effectiveDate": "2023-03-03"
    }

    Format for caller to receive:
    {
        "formID": 17,
        "formCode": "QLI-QHSP-10-F01",
        "revisionNo": 1,
        "effectiveDate": "2023-03-03T00:00:00.000+00:00",
        "questionnaires": [<1 new questionnaire here>], // Automatically created new questionnaire
        "questionnaireIDs": [<1 new questionnaire ID here>], // Automatically created new questionnaire
        "vendorsAllowed": [],
        "formType": null,
        "formOwners": [],
        "pendingUserInput": null,
        "approved": false
    }
    If error:
    {
        "message": "Form already exists. Please try creating form under a different form code or revision number.",
        "statusCode": 500
    }
     */
    @PostMapping("/createForm")
    public Object createForm(@RequestBody Form form) {
        return formService.createForm(form);
    }

//    @PutMapping("/addQuestionnaire/{id}")
//    public


    @GetMapping("/getAllForms")
    public List<Form> getAllForms() {
        return formService.getAllForms();
    }

    @GetMapping("/getFormByID/{id}")
    public Form getFormByID(@PathVariable int id) {
        try {
            return formService.getFormByID(id);
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/createForms")
    public void createForms(@RequestBody List<Form> forms) {
        formService.createForms(forms);
    }
}
