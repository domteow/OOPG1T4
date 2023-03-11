package com.smu.oopg1t4.util;

import com.smu.oopg1t4.util.DatabaseSequence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Objects;

import javax.management.Query;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;


@Service
public class SequenceGeneratorService {


    private MongoOperations mongoOperations;
//    private int lastId = 0;

    @Autowired
    public SequenceGeneratorService(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    public int generateSequence(String seqName) {

         DatabaseSequence counter = mongoOperations.findAndModify(query(where("_id").is(seqName)),
                 new Update().inc("seq",1), options().returnNew(true).upsert(true),
                 DatabaseSequence.class);
         return !Objects.isNull(counter) ? counter.getSeq() : 1;

//        if (lastId == 0) {
//            DatabaseSequence lastRecord = mongoOperations.findOne(
//                query(where("_id").is(seqName)),
//                DatabaseSequence.class
//            );
//            lastId = (lastRecord != null) ? lastRecord.getSeq() : 0;
//        }
//        lastId++;
//        mongoOperations.save(new DatabaseSequence(seqName, lastId));
//        return lastId;

    }
}