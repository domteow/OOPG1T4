package com.smu.oopg1t4.questionnaire;

import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Questionnaire> getAllQuestionnaires() {
        return questionnaireService.getAllQuestionnaires();
    }

    @GetMapping("/getQuestionnaireByID/{id}")
    public Questionnaire getQuestionnaireByID(@PathVariable int id) {
        try {
            return questionnaireService.getQuestionnaireByID(id);
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/createQuestionnaire")
    public void createQuestionnaire(@RequestBody Questionnaire questionnaire) {
        questionnaireService.createQuestionnaire(questionnaire);
    }

    @PostMapping("/createQuestionnaires")
    public void createQuestionnaires(@RequestBody List<Questionnaire> questionnaires) {
        questionnaireService.createQuestionnaires(questionnaires);
    }
}
