package com.smu.oopg1t4.form;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface FormRepository extends MongoRepository<Form, Integer> {
    @Query("{'id':?0}")
    List<Form> findByID(int id);


    @Query("{'formCode':?0, 'revisionNo':  ?1}")
    List<Form> findByFormCodeAndRevisionNumber(String formCode, int revisionNumber);
}
