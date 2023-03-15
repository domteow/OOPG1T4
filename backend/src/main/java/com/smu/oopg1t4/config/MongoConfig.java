package com.smu.oopg1t4.config;

import com.smu.oopg1t4.field.Field;
import com.smu.oopg1t4.field.FieldRepository;
import com.smu.oopg1t4.field.FieldService;
import com.smu.oopg1t4.form.Form;
import com.smu.oopg1t4.form.FormRepository;
import com.smu.oopg1t4.formresponse.FormResponse;
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
            //QLI-SHSP-10-F01 NEW VENDOR ASSESSMENT FORM FIELDS
            //Questionnaire 1 for NEW VENDOR ASSESSMENT FORM
            Field f1 = new Field("Company Name", "text");
            Field f2 = new Field("Company Registration No", "text");
            Field f3 = new Field( "GST Registered", "radio", List.of("Yes", "No"), false);
            Field f4 = new Field("Office Address", "text");
            Field f5 = new Field("Type of business License / Registration", "radio", List.of("Sole proprietorship", "Limited Company", "Partnership Agreement"), true);
//            Field f6 = new Field("Type of business License / Registration (Others) (Fill as NIL if not applicable)", "text");
            Field f7 = new Field("Contact Person", "subheader");
            Field f8 = new Field("Name", "text");
            Field f9 = new Field("Tel", "text");
            Field f10 = new Field("Designation", "text");
            Field f11 = new Field("Nature of Business ", "radio", List.of("Manufacturing", "Agent/dealer", "Distributor"), true);
//            Field f12 = new Field("Nature of Business (Others) (Fill as NIL if not applicable)", "text", null);
            Field f13 = new Field("Product/Services", "text");

            //Questionnaire 2 for NEW VENDOR ASSESSMENT FORM
            Field f14 = new Field("ISO 9001 Certification (if present, type in Certification Body)", "text");
            Field f15 = new Field("Accreditation of Laboratory (if present, type in Accreditation Body)", "text");
            Field f16 = new Field("Product Certification (if present, type in Product Markings (e.g. PSB, UL, TUV):", "text");
            Field f17 = new Field("Site Evaluation Results", "radio", List.of("Satisfactory", "Unsatisfactory"), false);
            Field f18 = new Field("Results of Samples/Product Evaluation", "radio", List.of("Satisfactory", "Unsatisfactory"), false);
            Field f19 = new Field("Results of First Deal", "radio", List.of("Satisfactory", "Unsatisfactory"), false);
            Field f20 = new Field("Track Record Review/ Customer Reference", "radio", List.of("Satisfactory", "Unsatisfactory"), false);
            Field f21 = new Field("Others (e.g. commercial, sole supplier, customer specified, franchise etc.)", "text");

            //Questionnaire 3 for NEW VENDOR ASSESSMENT FORM
            Field f22 = new Field("RESULT OF EVALUATION", "radio", List.of("APPROVED", "NOT APPROVED"), false);
            Field f23 = new Field("Evaluated by", "text");
            Field f24 = new Field("Signature (Full Name)", "text");
            Field f25 = new Field("Approved by Director", "text");
            Field f26 = new Field("Effective date", "text");


            List<Field> fields = List.of(f1,f2,f3,f4,f5,f7,f8,f9,f10,f11,f13,f14,f15,f16,f17,f18,f19,f20,f21,f22,f23,f24,f25,f26);
            int fieldId = 1;
            for (Field field: fields){
                field.setId(fieldId);
                fieldId++;
            }

            fieldRepository.saveAll(
                    fields
            );

            // ------------------Questionnaires-----------------------
            //QLI-SHSP-10-F01 NEW VENDOR ASSESSMENT FORM QUESTIONNAIRES

            //Questionnaire 1 for NEW VENDOR ASSESSMENT FORM
            ArrayList<Field> fields1 = new ArrayList<>();
            fields1.addAll(List.of(f1,f2,f3,f4,f5,f7,f8,f9,f10,f11,f13));
            Questionnaire q1 = new Questionnaire("Vendor Information", fields1, "Vendor");

            //Questionnaire 2 for NEW VENDOR ASSESSMENT FORM

            ArrayList<Field> fields2 = new ArrayList<>();
            fields2.addAll(List.of(f14,f15,f16,f17,f18,f19,f20,f21));
            Questionnaire q2 = new Questionnaire("Vendor Evaluation", fields2, "Admin");

            //Questionnaire 3 for NEW VENDOR ASSESSMENT FORM

            ArrayList<Field> fields3 = new ArrayList<>();
            fields3.addAll(List.of(f22,f23,f24,f25,f26));
            Questionnaire q3 = new Questionnaire("Evaluation Results", fields3, "Admin");





            List<Questionnaire> questionnaires = List.of(q1,q2,q3);
            int questionnaireId = 1;
            for (Questionnaire questionnaire: questionnaires){
                questionnaire.setId(questionnaireId);
                questionnaireId++;
            }
            questionnaireRepository.saveAll(
                    questionnaires
            );

            // ------------------Forms-----------------------
            ArrayList<Questionnaire> questionnaires1 = new ArrayList<>();
            questionnaires1.addAll(List.of(q1,q2,q3));
            //QLI-QHSP-10-F01 NEW VENDOR ASSESSMENT FORM
            Form form1 = new Form(1,"QLI-QHSP-10-F01", 1, "New Vendor Assessment Form","2022-04-04", questionnaires1,"published");
            formRepository.saveAll(
                    List.of(form1)
            );

            // ------------------Form Responses-----------------------
            FormResponse formResponse = new FormResponse(
                    1,
                    "QLI-QHSP-10-F01",
                    1,
                    "New Vendor Assessment Form",
                    "2022-04-04",
                    questionnaires1,
                    "published",
                    1,
                    "Vendor",
                    0,
                    false,
                    false
            );

            // ------------------Database Sequence-----------------------
            if (!databaseSequenceRepository.findById("user_sequence").isPresent() || databaseSequenceRepository.findById("user_sequence").get().getSeq() < 3){
                DatabaseSequence userSequence = new DatabaseSequence("user_sequence",3);
                databaseSequenceRepository.save(userSequence);
            }
            if (!databaseSequenceRepository.findById("field_sequence").isPresent() || databaseSequenceRepository.findById("field_sequence").get().getSeq() < 24){
                DatabaseSequence fieldSequence = new DatabaseSequence("field_sequence",24);
                databaseSequenceRepository.save(fieldSequence);
            }
            if (!databaseSequenceRepository.findById("questionnaire_sequence").isPresent() || databaseSequenceRepository.findById("questionnaire_sequence").get().getSeq() < 3){
                DatabaseSequence questionnaireSequence = new DatabaseSequence("questionnaire_sequence",3);
                databaseSequenceRepository.save(questionnaireSequence);
            }
            if (!databaseSequenceRepository.findById("form_sequence").isPresent() || databaseSequenceRepository.findById("form_sequence").get().getSeq() < 1){
                DatabaseSequence formSequence = new DatabaseSequence("form_sequence",1);
                databaseSequenceRepository.save(formSequence);
            }
            if (!databaseSequenceRepository.findById("form_response_sequence").isPresent() || databaseSequenceRepository.findById("form_response_sequence").get().getSeq() < 1){
                DatabaseSequence formResponseSequence = new DatabaseSequence("form_response_sequence",1);
                databaseSequenceRepository.save(formResponseSequence);
            }
            

        };
    }


}
