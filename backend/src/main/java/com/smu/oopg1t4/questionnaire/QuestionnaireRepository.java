package com.smu.oopg1t4.questionnaire;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface QuestionnaireRepository extends MongoRepository<Questionnaire, Integer> {
    @Query("{'id':?0}")
    List<Questionnaire> findByID(int id);
}
