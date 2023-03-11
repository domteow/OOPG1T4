package com.smu.oopg1t4.form;

import org.springframework.data.mongodb.repository.ExistsQuery;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FormRepository extends MongoRepository<Form, Integer> {
    @ExistsQuery("{'formCode':?0, 'revisionNo':  ?1}")
    boolean existsByFormCodeAndRevisionNumber(String formCode, int revisionNumber);
}
