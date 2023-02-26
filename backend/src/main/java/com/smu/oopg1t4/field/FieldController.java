package com.smu.oopg1t4.field;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/field")
public class FieldController {
    @Autowired
    FieldService fieldService;

    @GetMapping("/getAllFields")
    public List<Field> getAllFields() {
        return fieldService.getAllFields();
    }

    @GetMapping("/getFieldByID/{id}")
    public Field getFieldByID(@PathVariable int id){
        try{
            Field myField = fieldService.getFieldByID(id);
            return myField;
        } catch (Exception e){
            return null;
        }
    }

    @PostMapping("/createField")
    public void createField(@RequestBody Field field){
        fieldService.createField(field);
    }
}

