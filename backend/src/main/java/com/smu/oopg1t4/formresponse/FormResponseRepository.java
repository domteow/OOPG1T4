package com.smu.oopg1t4.formresponse;

import org.springframework.data.mongodb.repository.ExistsQuery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface FormResponseRepository extends MongoRepository<FormResponse, Integer> {
    @ExistsQuery("{'formCode':?0, 'revisionNo':  ?1}")
    boolean existsByFormCodeAndRevisionNumber(String formCode, int revisionNumber);

    @Query("{'ownerId': ?0}")
    List<FormResponse> getFormByVendorID(int ownerId);
}
