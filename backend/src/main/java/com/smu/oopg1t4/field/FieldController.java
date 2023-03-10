package com.smu.oopg1t4.field;

import com.smu.oopg1t4.response.StatusResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/field")
public class FieldController {
    @Autowired
    FieldService fieldService;

    @GetMapping("/getAllFields")
    public ResponseEntity<?> getAllFields() {
        return fieldService.getAllFields();
    }

    @GetMapping("/getFieldByID/{id}")
    public ResponseEntity<?> getFieldByID(@PathVariable int id){
        return fieldService.getFieldByID(id);

    }

    @PostMapping("/createField")
    public ResponseEntity<StatusResponse> createField(@RequestBody Field field){
        return fieldService.createField(field);
    }

    @PostMapping("/createFields")
    public ResponseEntity<StatusResponse> createFields(@RequestBody List<Field> fields) {
        return fieldService.createFields(fields);
    }
}

