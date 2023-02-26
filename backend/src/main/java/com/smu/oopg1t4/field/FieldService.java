package com.smu.oopg1t4.field;

import com.smu.oopg1t4.util.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FieldService {

    @Autowired
    FieldRepository fieldRepository;

    @Autowired
    SequenceGeneratorService sequenceGeneratorService;

    //returns all fields in a List
    public List<Field> getAllFields() {
        return fieldRepository.findAll();
    };

    //get field by id
    public Field getFieldByID(int id) throws Exception{
        List<Field> fields = fieldRepository.findByID(id);
        // need to implement check if id exists
        return fields.get(0);
    }

    //create a new field
    public void createField(Field field){
        field.setId(sequenceGeneratorService.generateSequence(Field.SEQUENCE_NAME));
        fieldRepository.save(field);
    }

    //create more than one field
    public void createFields(List<Field> fields){
        for (Field field: fields){
            field.setId(sequenceGeneratorService.generateSequence(Field.SEQUENCE_NAME));
        }
        fieldRepository.saveAll(fields);
    }






}
