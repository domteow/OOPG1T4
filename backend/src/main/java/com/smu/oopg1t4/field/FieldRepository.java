package com.smu.oopg1t4.field;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface FieldRepository extends MongoRepository<Field, String> {
    @Query("{'id':?0}")
    List<Field> findByID(int id);

    @Query("{'name':?0}")
    List<Field> findByName(String name);
}
