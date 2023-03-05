package com.smu.oopg1t4.form;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/form")
public class FormController {
    @Autowired
    FormService formService;

    @GetMapping("/getAllForms")
    public List<Form> getAllForms() {
        return formService.getAllForms();
    }

    @GetMapping("/getFormByID/{id}")
    public Form getFormByID(@PathVariable int id){
        try{
            return formService.getFormByID(id);
        } catch (Exception e){
            return null;
        }
    }

    @PostMapping("/createForm")
    public void createForm(@RequestBody Form form){
        formService.createForm(form);
    }

    @PostMapping("/createForms")
    public void createForms(@RequestBody List<Form> forms) {
        formService.createForms(forms);
    }
}
