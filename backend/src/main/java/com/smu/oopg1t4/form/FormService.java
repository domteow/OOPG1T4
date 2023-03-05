package com.smu.oopg1t4.form;

import com.smu.oopg1t4.util.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class FormService {
    @Autowired
    FormRepository formRepository;

    @Autowired
    SequenceGeneratorService sequenceGeneratorService;

    //returns all forms in a List
    public List<Form> getAllForms() {
        return formRepository.findAll();
    }

    //get form by id
    public Form getFormByID(int id) throws Exception{
        List<Form> forms = formRepository.findByID(id);
        // need to implement check if id exists
        return forms.get(0);
    }

    //create a new form
    public void createForm(Form form){
        form.setID(sequenceGeneratorService.generateSequence(Form.SEQUENCE_NAME));
        formRepository.save(form);
    }

    //create more than one form
    public void createForms(List<Form> forms) {
        for (Form form : forms) {
            form.setID(sequenceGeneratorService.generateSequence(Form.SEQUENCE_NAME));
        }
        formRepository.saveAll(forms);
    }
}
