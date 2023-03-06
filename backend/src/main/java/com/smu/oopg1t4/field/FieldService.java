package com.smu.oopg1t4.field;

import com.smu.oopg1t4.statusResponse.StatusResponse;
import com.smu.oopg1t4.util.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FieldService {

    public final FieldRepository fieldRepository;

    public final SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    public FieldService(FieldRepository fieldRepository, SequenceGeneratorService sequenceGeneratorService) {
        this.fieldRepository = fieldRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    //returns all fields in a List
    public ResponseEntity<?> getAllFields() {
        try {
            return ResponseEntity.ok().body(fieldRepository.findAll());
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error retrieving vendors", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }

    ;

    //get field by id
    public ResponseEntity<?> getFieldByID(int id) {
        Optional<Field> field = fieldRepository.findById(id);
        // need to implement check if id exists
        if (field.isPresent()) {
            return ResponseEntity.ok().body(field.get());
        } else {
            StatusResponse statusResponse = new StatusResponse("Field not found for id: " + id, HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }
    }

    //create a new field
    public ResponseEntity<StatusResponse> createField(Field field) {
        try {
            field.setId(sequenceGeneratorService.generateSequence(Field.SEQUENCE_NAME));
            fieldRepository.save(field);
            StatusResponse successResponse = new StatusResponse("Field added successfully", HttpStatus.CREATED.value());
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (IllegalArgumentException e) {
            StatusResponse statusResponse = new StatusResponse("Error saving field: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    //create more than one field
    public ResponseEntity<StatusResponse> createFields(List<Field> fields) {
        try {
            for (Field field : fields) {
                field.setId(sequenceGeneratorService.generateSequence(Field.SEQUENCE_NAME));
            }
            fieldRepository.saveAll(fields);
            StatusResponse successResponse = new StatusResponse("Fields added successfully", HttpStatus.CREATED.value());
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error saving fields: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }


}
