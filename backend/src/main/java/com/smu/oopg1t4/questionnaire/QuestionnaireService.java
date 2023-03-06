package com.smu.oopg1t4.questionnaire;

import com.smu.oopg1t4.util.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


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
    public List<Questionnaire> getAllQuestionnaires() {
        return questionnaireRepository.findAll();
    }

    //get questionnaire by id
    public Questionnaire getQuestionnaireByID(int id) throws Exception {
        List<Questionnaire> questionnaires = questionnaireRepository.findByID(id);
        // need to implement check if id exists
        return questionnaires.get(0);
    }

    //create a new questionnaire
    public Questionnaire createQuestionnaire(Questionnaire questionnaire) {
        questionnaire.setID(sequenceGeneratorService.generateSequence(Questionnaire.SEQUENCE_NAME));
        return questionnaireRepository.save(questionnaire);
    }

    //create more than one questionnaire
    public void createQuestionnaires(List<Questionnaire> questionnaires) {
        for (Questionnaire questionnaire : questionnaires) {
            questionnaire.setID(sequenceGeneratorService.generateSequence(Questionnaire.SEQUENCE_NAME));
        }
        questionnaireRepository.saveAll(questionnaires);
    }
}
