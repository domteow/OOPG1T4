package com.smu.oopg1t4.form;

import org.springframework.data.mongodb.repository.ExistsQuery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.core.query.Criteria;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public interface FormRepository extends MongoRepository<Form, Integer> {
    @ExistsQuery("{'formCode': ?0, 'revisionNo': ?1}")
    boolean existsByFormCodeAndRevisionNumber(String formCode, int revisionNumber);

    @Query("{'formCode': ?0, 'revisionNo': ?1}")
    List<Form> findByFormCodeAndRevisionNo(String formCode, int revisionNo);

    @Query("{'formCode': ?0}")
    List<Form> findByFormCode(String formCode);

    @Query("{ " +
            "'formCode' : { $regex: ?0, $options : 'i'}, " +
            "'description' : { $regex: ?1, $options: 'i' }, " +
            "'formStatus' : { $in: ?2 }, " +
            "'effectiveDate': { $gte: ?3, $lte: ?4 } " +
            "}")
    List<Form> searchFormsByProperties(String formCode, String description, String[] formStatus, Date startDate, Date endDate);
}