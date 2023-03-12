package com.smu.oopg1t4.questionnaire;

import com.smu.oopg1t4.field.Field;
import com.smu.oopg1t4.response.StatusResponse;
import com.smu.oopg1t4.response.SuccessResponse;
import com.smu.oopg1t4.util.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class QuestionnaireService {
    private final QuestionnaireRepository questionnaireRepository;

    private final SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    public QuestionnaireService(QuestionnaireRepository questionnaireRepository, SequenceGeneratorService sequenceGeneratorService) {
        this.questionnaireRepository = questionnaireRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    //returns all questionnaires in a List
    public ResponseEntity<?> getAllQuestionnaires() {
        try {
            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), questionnaireRepository.findAll());
            return ResponseEntity.ok().body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error retrieving questionnaires", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    //get questionnaire by id
    public ResponseEntity<?> getQuestionnaireByID(int id) {
        Optional<Questionnaire> questionnaire = questionnaireRepository.findById(id);
        // need to implement check if id exists
        if (questionnaire.isPresent()) {
            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), questionnaire.get());
            return ResponseEntity.ok().body(successResponse);
        } else {
            StatusResponse statusResponse = new StatusResponse("Questionnaire not found for id: " + id, HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }
    }

    //create a new questionnaire
    public ResponseEntity<StatusResponse> createQuestionnaire(Questionnaire questionnaire) {
        // TODO: Is there any way to find duplicates of the questionnaires without the id??
        try {
            questionnaire.setId(sequenceGeneratorService.generateSequence(Questionnaire.SEQUENCE_NAME));
            questionnaireRepository.save(questionnaire);
            StatusResponse successResponse = new StatusResponse("Questionnaire added successfully", HttpStatus.CREATED.value());
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error saving questionnaire: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    //create more than one questionnaire
    public ResponseEntity<StatusResponse> createQuestionnaires(List<Questionnaire> questionnaires) {
        try {
            for (Questionnaire questionnaire : questionnaires) {
                questionnaire.setId(sequenceGeneratorService.generateSequence(Questionnaire.SEQUENCE_NAME));
            }
            questionnaireRepository.saveAll(questionnaires);
            StatusResponse successResponse = new StatusResponse("Questionnaires added successfully", HttpStatus.CREATED.value());
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error saving questionnaires: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }
}
