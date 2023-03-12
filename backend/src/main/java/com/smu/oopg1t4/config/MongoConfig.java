package com.smu.oopg1t4.config;

import com.smu.oopg1t4.field.Field;
import com.smu.oopg1t4.field.FieldRepository;
import com.smu.oopg1t4.field.FieldService;
import com.smu.oopg1t4.form.Form;
import com.smu.oopg1t4.form.FormRepository;
import com.smu.oopg1t4.questionnaire.Questionnaire;
import com.smu.oopg1t4.questionnaire.QuestionnaireController;
import com.smu.oopg1t4.questionnaire.QuestionnaireRepository;
import com.smu.oopg1t4.user.UserRepository;
import com.smu.oopg1t4.user.admin.Admin;
import com.smu.oopg1t4.user.vendor.Vendor;
import com.smu.oopg1t4.util.DatabaseSequence;
import com.smu.oopg1t4.util.DatabaseSequenceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.xml.crypto.Data;
import java.lang.reflect.Array;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

@Configuration
public class MongoConfig {

    @Bean
    CommandLineRunner commandLineRunner(FieldRepository fieldRepository, DatabaseSequenceRepository databaseSequenceRepository, QuestionnaireRepository questionnaireRepository, UserRepository userRepository, FormRepository formRepository){
        return args -> {
            // ------------------Users-----------------------

            ArrayList<String> countries1 = new ArrayList<>();
            countries1.addAll(List.of("doggydogworld","spca"));
            Vendor v1 = new Vendor("Bruno", "doggydog@gmail.com", "woof3", "Vendor", countries1, "999", "9843037", "Bruno's Company");
            v1.setId(1);
            Vendor v2 = new Vendor("Dom", "meow2@gmail.com", "meow5","Vendor", countries1, "99292922", "1231231","Dom's Company");
            v2.setId(2);

            ArrayList<String> countries2 = new ArrayList<>();
            countries2.addAll(List.of("Singapore", "Malaysia"));
            Admin a1 = new Admin("Kelvin", "kelvin@gmail.com", "xdxd", "Admin");
            a1.setId(3);

            userRepository.saveAll(
                    List.of(v1,v2,a1)
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
            Questionnaire q1 = new Questionnaire("Generic Questionnaire", fields1, "Vendor");
            q1.setId(1);
            questionnaireRepository.saveAll(
                    List.of(q1)
            );

            // ------------------Forms-----------------------
            ArrayList<Questionnaire> questionnaires1 = new ArrayList<>();
            questionnaires1.addAll(List.of(q1));
            Form form1 = new Form(1,"QLI-QHSP-10-F01", 1, "New Vendor Assessment Form", new SimpleDateFormat("yyyy-MM-dd").parse("2022-04-04"), questionnaires1,"published");
            formRepository.saveAll(
                    List.of(form1)
            );

            // ------------------Database Sequence-----------------------
            if (!databaseSequenceRepository.findById("user_sequence").isPresent() || databaseSequenceRepository.findById("user_sequence").get().getSeq() < 3){
                DatabaseSequence userSequence = new DatabaseSequence("user_sequence",3);
                databaseSequenceRepository.save(userSequence);
            }
            if (!databaseSequenceRepository.findById("field_sequence").isPresent() || databaseSequenceRepository.findById("field_sequence").get().getSeq() < 3){
                DatabaseSequence fieldSequence = new DatabaseSequence("field_sequence",3);
                databaseSequenceRepository.save(fieldSequence);
            }
            if (!databaseSequenceRepository.findById("questionnaire_sequence").isPresent() || databaseSequenceRepository.findById("questionnaire_sequence").get().getSeq() < 1){
                DatabaseSequence questionnaireSequence = new DatabaseSequence("questionnaire_sequence",1);
                databaseSequenceRepository.save(questionnaireSequence);
            }
            if (!databaseSequenceRepository.findById("form_sequence").isPresent() || databaseSequenceRepository.findById("form_sequence").get().getSeq() < 1){
                DatabaseSequence formSequence = new DatabaseSequence("form_sequence",1);
                databaseSequenceRepository.save(formSequence);
            }

            DatabaseSequence formResponseSequence = new DatabaseSequence("form_response_sequence", 0);


        };
    }


}
