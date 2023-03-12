package com.smu.oopg1t4.questionnaire;

import com.smu.oopg1t4.response.StatusResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/questionnaire")
public class QuestionnaireController {
    private final QuestionnaireService questionnaireService;

    @Autowired
    public QuestionnaireController(QuestionnaireService questionnaireService) {
        this.questionnaireService = questionnaireService;
    }

    @GetMapping("/getAllQuestionnaires")
    public ResponseEntity<?> getAllQuestionnaires() {
        return questionnaireService.getAllQuestionnaires();
    }

    @GetMapping("/getQuestionnaireByID/{id}")
    public ResponseEntity<?> getQuestionnaireByID(@PathVariable int id) {
        return questionnaireService.getQuestionnaireByID(id);
    }

    @PostMapping("/createQuestionnaire")
    public ResponseEntity<StatusResponse> createQuestionnaire(@RequestBody Questionnaire questionnaire) {
        return questionnaireService.createQuestionnaire(questionnaire);
    }

    @PostMapping("/createQuestionnaires")
    public ResponseEntity<StatusResponse> createQuestionnaires(@RequestBody List<Questionnaire> questionnaires) {
        return questionnaireService.createQuestionnaires(questionnaires);
    }
}
