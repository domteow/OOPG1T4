package com.smu.oopg1t4.util;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface DatabaseSequenceRepository extends MongoRepository<DatabaseSequence, Integer> {

}
