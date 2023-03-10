package com.smu.oopg1t4.config;

import com.smu.oopg1t4.field.Field;
import com.smu.oopg1t4.field.FieldRepository;
import com.smu.oopg1t4.questionnaire.Questionnaire;
import com.smu.oopg1t4.questionnaire.QuestionnaireController;
import com.smu.oopg1t4.questionnaire.QuestionnaireRepository;
import com.smu.oopg1t4.user.UserRepository;
import com.smu.oopg1t4.user.vendor.Vendor;
import com.smu.oopg1t4.util.DatabaseSequence;
import com.smu.oopg1t4.util.DatabaseSequenceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.xml.crypto.Data;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class MongoConfig {

    @Bean
    CommandLineRunner commandLineRunner(FieldRepository fieldRepository, DatabaseSequenceRepository databaseSequenceRepository, QuestionnaireRepository questionnaireRepository, UserRepository userRepository){
        return args -> {
            // ------------------Users-----------------------

            ArrayList<String> countries1 = new ArrayList<>();
            countries1.addAll(List.of("doggydogworld","spca"));
            Vendor v1 = new Vendor("Bruno", "doggydog@gmail.com", "woof3", countries1, "999", "9843037");
            v1.setId(1);
            Vendor v2 = new Vendor("Dom", "meow2@gmail.com", "meow5", countries1, "99292922", "1231231");
            v2.setId(2);

            userRepository.saveAll(
                    List.of(v1,v2)
            );

            // ------------------Fields-----------------------

            Field f1 = new Field(1, "Vendor Name", "text");
            Field f2 = new Field(2, "Age", "text");
            Field f3 = new Field( 3, "Location", "text");
            fieldRepository.saveAll(
                    List.of(f1, f2, f3)
            );

            // ------------------Questionnaires-----------------------

            ArrayList<Field> fields1 = new ArrayList<>();
            fields1.addAll(List.of(f1, f2));
            Questionnaire q1 = new Questionnaire("Generic Questionnaire", fields1, "vendor");
            q1.setId(1);
            questionnaireRepository.saveAll(
                    List.of(q1)
            );

            // ------------------Forms-----------------------




            // ------------------Database Sequence-----------------------

            DatabaseSequence userSequence = new DatabaseSequence("user_sequence",2);
            DatabaseSequence fieldSequence = new DatabaseSequence("field_sequence", 3);
            DatabaseSequence questionnaireSequence = new DatabaseSequence("questionnaire_sequence", 1);
            DatabaseSequence formSequence = new DatabaseSequence("form_sequence", 0);
            DatabaseSequence formResponseSequence = new DatabaseSequence("form_response_sequence", 0);

            databaseSequenceRepository.saveAll(
                    List.of(userSequence,fieldSequence, questionnaireSequence)
            );
        };
    }


}
