package com.smu.oopg1t4.questionnaire;

import com.smu.oopg1t4.util.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class QuestionnaireService {
    @Autowired
    QuestionnaireRepository questionnaireRepository;

    @Autowired
    SequenceGeneratorService sequenceGeneratorService;

    //returns all questionnaires in a List
    public List<Questionnaire> getAllQuestionnaires() {
        return questionnaireRepository.findAll();
    }

    //get questionnaire by id
    public Questionnaire getQuestionnaireByID(int id) throws Exception{
        List<Questionnaire> questionnaires = questionnaireRepository.findByID(id);
        // need to implement check if id exists
        return questionnaires.get(0);
    }

    //create a new questionnaire
    public void createQuestionnaire(Questionnaire questionnaire){
        questionnaire.setID(sequenceGeneratorService.generateSequence(Questionnaire.SEQUENCE_NAME));
        questionnaireRepository.save(questionnaire);
    }

    //create more than one questionnaire
    public void createQuestionnaires(List<Questionnaire> questionnaires) {
        for (Questionnaire questionnaire : questionnaires) {
            questionnaire.setID(sequenceGeneratorService.generateSequence(Questionnaire.SEQUENCE_NAME));
        }
        questionnaireRepository.saveAll(questionnaires);
    }
}
