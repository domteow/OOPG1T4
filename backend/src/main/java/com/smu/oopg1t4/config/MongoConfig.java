package com.smu.oopg1t4.config;

import com.smu.oopg1t4.field.Field;
import com.smu.oopg1t4.field.FieldRepository;
import com.smu.oopg1t4.field.FieldService;
import com.smu.oopg1t4.form.Form;
import com.smu.oopg1t4.form.FormRepository;
import com.smu.oopg1t4.formresponse.FormResponse;
import com.smu.oopg1t4.formresponse.FormResponseRepository;
import com.smu.oopg1t4.questionnaire.Questionnaire;
import com.smu.oopg1t4.questionnaire.QuestionnaireController;
import com.smu.oopg1t4.questionnaire.QuestionnaireRepository;
import com.smu.oopg1t4.user.UserRepository;
import com.smu.oopg1t4.user.admin.Admin;
import com.smu.oopg1t4.user.approver.Approver;
import com.smu.oopg1t4.user.vendor.Vendor;
import com.smu.oopg1t4.util.DatabaseSequence;
import com.smu.oopg1t4.util.DatabaseSequenceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import java.lang.reflect.Array;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

@Configuration
public class MongoConfig {

    @Bean
    CommandLineRunner commandLineRunner(FieldRepository fieldRepository, DatabaseSequenceRepository databaseSequenceRepository, QuestionnaireRepository questionnaireRepository, UserRepository userRepository, FormRepository formRepository, FormResponseRepository formResponseRepository){
        return args -> {
            // ------------------Users-----------------------

            ArrayList<String> countries1 = new ArrayList<>();
            countries1.addAll(List.of("Singapore", "Portugal"));

            ArrayList<String> countries2 = new ArrayList<>();
            countries2.addAll(List.of("Singapore", "United States of America"));
            Vendor v1 = new Vendor("Bruno", "bruno.goh.2020@scis.smu.edu.sg", "brunogoh", "Vendor", true, countries1, "98430376", "123123123", "Bruno's Company");
            v1.setId(1);
            Vendor v2 = new Vendor("Dominic", "dominicteow.2020@scis.smu.edu.sg", "domteowzy","Vendor", true, countries2, "99292922", "1231231","Dom's Company");
            v2.setId(2);


            Admin a1 = new Admin("Kelvin", "kelvin.yap.2020@scis.smu.edu.sg", "kelvinyap", "Admin", true);
            a1.setId(3);

            Approver ap1 = new Approver("Rhys", "rhys.tan.2020@scis.smu.edu.sg", "rhystanyq", "Approver", true);
            ap1.setId(4);

            userRepository.saveAll(
                    List.of(v1,v2,a1,ap1)
            );

            // ------------------Fields-----------------------
            //QLI-SHSP-10-F01 NEW VENDOR ASSESSMENT FORM FIELDS
            //Questionnaire 1 for NEW VENDOR ASSESSMENT FORM
//            Field fx0 = new Field("Company Details", "header");
            Field f1 = new Field("Company Name", "text");
            Field f2 = new Field("Company Registration No", "text");
            Field f3 = new Field( "GST Registered", "radio", List.of("Yes", "No"), false);
            Field f4 = new Field("Office Address", "text");
            Field f5 = new Field("Type of business License / Registration", "radio", List.of("Sole proprietorship", "Limited Company", "Partnership Agreement"), true);
//            Field f6 = new Field("Type of business License / Registration (Others) (Fill as NIL if not applicable)", "text");
            Field f7 = new Field("Contact Person", "header");
            Field f8 = new Field("Name", "text");
            Field f9 = new Field("Tel", "text");
            Field f10 = new Field("Designation", "text");
            Field f11 = new Field("Nature of Business ", "radio", List.of("Manufacturing", "Agent/dealer", "Distributor"), true);
            Field f12 = new Field("Product/Services", "text");
            Field f13 = new Field("Submit company's profile, brochure on product/services, if available", "subtext");

            //Questionnaire 2 for NEW VENDOR ASSESSMENT FORM
//            Field fx1 = new Field("Evaluation", "header");
            Field f14 = new Field("ISO 9001 Certification (if present, type in Certification Body)", "text");
            Field f15 = new Field("Accreditation of Laboratory (if present, type in Accreditation Body)", "text");
            Field f16 = new Field("Product Certification (if present, type in Product Markings (e.g. PSB, UL, TUV)", "text");
            Field f17 = new Field("Site Evaluation Results", "radio", List.of("Satisfactory", "Unsatisfactory"), false);
            Field f18 = new Field("Results of Samples/Product Evaluation", "radio", List.of("Satisfactory", "Unsatisfactory"), false);
            Field f19 = new Field("Results of First Deal", "radio", List.of("Satisfactory", "Unsatisfactory"), false);
            Field f20 = new Field("Track Record Review/ Customer Reference", "radio", List.of("Satisfactory", "Unsatisfactory"), false);
            Field f21 = new Field("Others (e.g. commercial, sole supplier, customer specified, franchise etc.)", "text");

            //Questionnaire 3 for NEW VENDOR ASSESSMENT FORM
//            Field fx2 = new Field("Evaluation Result", "header");
            Field f22 = new Field("Result of Evaluation", "radio", List.of("Approved", "not Approved"), false);
            Field f23 = new Field("Evaluated by", "text");
            Field f24 = new Field("Signature (Full Name)", "text");


            //Questionnaire 4 for NEW VENDOR ASSESSMENT FORM
//            Field fx3 = new Field("For Approval", "header");
            Field f25 = new Field("Approved by Director (name)", "text");
            //use f24
            Field f26 = new Field("Effective date", "text");

            //---------------------------------------------------------------
            //QLI-SHSP-10-F04 NEW VENDOR ASSESSMENT FORM FIELDS
            //Questionnaire 5 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
//            Field fx4 = new Field("Sub-Contractor Details", "header");
            Field f27 = new Field("Name of Sub-Contractor", "text");
            Field f28 = new Field("Scope of Work", "text");
            Field f29 = new Field("Evaluated By", "text");
            Field f30 = new Field("Date", "text");

            //Questionnaire 6 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            Field f31 = new Field("1. Safety & Health Policy and Organisation", "header");
            Field f32 = new Field("a) Is there a written Safety & Health Policy?", "radio", List.of("Yes", "No"), false);
            Field f33 = new Field("b) Is there a Safety Organisation with proper delegation of responsibility and accountability for safety and health?", "radio", List.of("Yes", "No"), false);
            Field f34 = new Field("c) Is there a written safety commitment and is it submitted?", "radio", List.of("Yes", "No"), false);

            //Questionnaire 7 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            Field f35 = new Field("2. Tool Box Meeting", "header");
            Field f36 = new Field("a) Are regular tool-box meetings conducted and reports submitted?", "radio", List.of("Yes", "No"), false);

            //Questionnaire 8 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            Field f37 = new Field("3. Safety Training", "header");
            Field f38 = new Field("a) Are relevant safety training courses provided for management / Supervisors?", "radio", List.of("Yes", "No"), false);
            Field f39 = new Field("b) Are relevant safety training courses provided for workers?", "radio", List.of("Yes", "No"), false);
            Field f40 = new Field("c) Are relevant safety training certificates submitted?", "radio", List.of("Yes", "No"), false);

            //Questionnaire 9 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            Field f41 = new Field("4. Safety & Health Rules & Safe Work Procedures/ Risk Assessment", "header");
            Field f42 = new Field("a) Are there written safety & health rules for the workers?", "radio", List.of("Yes", "No"), false);
            Field f43 = new Field("b) Are there written safe work procedures/ risk assessment formulated and submitted?", "radio", List.of("Yes", "No"), false);

            //Questionnaire 10 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            Field f44 = new Field("5. Safety & Health Inspection & Equipment", "header");
            Field f45 = new Field("a) Is there a written programme outlining inspection guidelines, frequency and follow-up corrective actions?", "radio", List.of("Yes", "No"), false);
            Field f46 = new Field("b) Is there available Personal Protective Equipment and of proper working condition and comply to safety requirements?", "radio", List.of("Yes", "No"), false);

            //Questionnaire 11 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            Field f47 = new Field("6. Responsible Personnel", "header");
            Field f48 = new Field("a) Is there a Safety Supervisor working at least 5 hrs / week?", "radio", List.of("Yes", "No"), false);
            Field f49 = new Field("b) Is there a qualified First Aider?", "radio", List.of("Yes", "No"), false);
            Field f50 = new Field("c) Are there relevant Licensed Electrical Workers, qualified engineers, qualified supervisors, lifting supervisors, qualified JCB Tower / Mobile / Crawler Crane operators?", "radio", List.of("Yes", "No"), false);

            //Questionnaire 12 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            Field f51 = new Field("7. Accident Analysis", "header");
            Field f52 = new Field("a) Accident Records for the last three years:", "subtext");
            Field f53 = new Field("Number of Temporary Disability Cases", "text");
            Field f54 = new Field("Number of Permanent Disability Cases", "text");
            Field f55 = new Field("Number of Fatal Cases", "text");

            //Questionnaire 13 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
//            Field f56 = new Field("Acknowledgement", "header");
            Field f57 = new Field("I, representative of the above-named sub-contractor, have understand the various Safety Criteria listed above and hereby acknowledged that the information given above are valid and supporting items/documents are available upon request by the main contractor.", "subtext");
            Field f58 = new Field("Date", "text");
            Field f59 = new Field("Acknowledged by", "text");
            //use f24

            //Use Questionnaire 4 again for Approver

            ArrayList<Field> fields = new ArrayList<>();

            //For Form 1
            fields.addAll(List.of(f1,f2,f3,f4,f5,f7,f8,f9,f10,f11,f12,f13,f14,f15,f16,f17,f18,f19,f20,f21,f22,f23,f24,f25,f26));

            //For Form 2
            fields.addAll(List.of(f27,f28,f29,f30,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f41,f42,f43,f44,f45,f46,f47,f48,f49,f50,f51,f52,f53,f54,f55,f57,f58,f59));
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
            fields1.addAll(List.of(f1,f2,f3,f4,f5,f7,f8,f9,f10,f11,f12,f13));
            Questionnaire q1 = new Questionnaire("Company Details", fields1, "Vendor", false);

            //Questionnaire 2 for NEW VENDOR ASSESSMENT FORM

            ArrayList<Field> fields2 = new ArrayList<>();
            fields2.addAll(List.of(f14,f15,f16,f17,f18,f19,f20,f21));
            Questionnaire q2 = new Questionnaire("Evaluation", fields2, "Admin", false);

            //Questionnaire 3 for NEW VENDOR ASSESSMENT FORM

            ArrayList<Field> fields3 = new ArrayList<>();
            fields3.addAll(List.of(f22,f23,f24));
            Questionnaire q3 = new Questionnaire("Evaluation Result", fields3, "Admin", false);

            //Questionnaire 4 for NEW VENDOR ASSESSMENT FORM
            ArrayList<Field> fields4 = new ArrayList<>();
            fields4.addAll(List.of(f25,f24,f26));
            Questionnaire q4 = new Questionnaire("For Approval", fields4, "Approver", false);

            //Questionnaire 5 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            ArrayList<Field> fields5 = new ArrayList<>();
            fields5.addAll(List.of(f27,f28,f29,f30));
            Questionnaire q5 = new Questionnaire("Sub-Contractor Details", fields5, "Vendor", false);

            //Questionnaire 6 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            ArrayList<Field> fields6 = new ArrayList<>();
            fields6.addAll(List.of(f31,f32,f33,f34));
            Questionnaire q6 = new Questionnaire("Safety & Health Policy and Organisation", fields6, "Vendor", false);

            //Questionnaire 7 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            ArrayList<Field> fields7 = new ArrayList<>();
            fields7.addAll(List.of(f35,f36));
            Questionnaire q7 = new Questionnaire("Tool Box Meeting", fields7, "Vendor", false);

            //Questionnaire 8 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            ArrayList<Field> fields8 = new ArrayList<>();
            fields8.addAll(List.of(f37,f38,f39,f40));
            Questionnaire q8 = new Questionnaire("Safety Training", fields8, "Vendor", false);

            //Questionnaire 9 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            ArrayList<Field> fields9 = new ArrayList<>();
            fields9.addAll(List.of(f41,f42,f43));
            Questionnaire q9 = new Questionnaire("Safety & Health Rules & Safe Work Procedures/ Risk Assessment", fields9, "Vendor", false);

            //Questionnaire 10 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            ArrayList<Field> fields10 = new ArrayList<>();
            fields10.addAll(List.of(f44,f45,f46));
            Questionnaire q10 = new Questionnaire("Safety & Health Inspection & Equipment", fields10, "Vendor", false);

            //Questionnaire 11 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            ArrayList<Field> fields11 = new ArrayList<>();
            fields11.addAll(List.of(f47,f48,f49,f50));
            Questionnaire q11 = new Questionnaire("Responsible Personnel", fields11, "Vendor", false);

            //Questionnaire 12 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            ArrayList<Field> fields12 = new ArrayList<>();
            fields12.addAll(List.of(f51,f52,f53,f54,f55));
            Questionnaire q12 = new Questionnaire("Accident Analysis", fields12, "Vendor", false);

            //Questionnaire 13 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            ArrayList<Field> fields13 = new ArrayList<>();
            fields13.addAll(List.of(f57,f58,f59,f24));
            Questionnaire q13 = new Questionnaire("Acknowledgement", fields13, "Vendor", false);

            //Questionnaire 4 for SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION



            ArrayList<Questionnaire> questionnaires = new ArrayList<>();

            //For Form 1
            questionnaires.addAll(List.of(q1,q2,q3,q4));

            //For Form 2
            questionnaires.addAll(List.of(q5,q6,q7,q8,q9,q10,q11,q12,q13));

            int questionnaireId = 1;
            for (Questionnaire questionnaire: questionnaires){
                questionnaire.setId(questionnaireId);
                questionnaireId++;
            }

            questionnaireRepository.saveAll(
                    questionnaires
            );

            // ------------------Forms-----------------------
            //QLI-QHSP-10-F01 NEW VENDOR ASSESSMENT FORM
            ArrayList<Questionnaire> questionnaires1 = new ArrayList<>();
            questionnaires1.addAll(List.of(q1,q2,q3,q4));
            ArrayList<Integer> workflow1 = new ArrayList<>();
            workflow1.addAll(List.of(1,2,1));
            Form form1 = new Form(1,"QLI-QHSP-10-F01", 1, "New Vendor Assessment Form","2022-04-04", questionnaires1,"published", workflow1, 1, true);

            //QLI-QHSP-10-F04 SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION
            ArrayList<Questionnaire> questionnaires2 = new ArrayList<>();
            questionnaires2.addAll(List.of(q5,q6,q7,q8,q9,q10,q11,q12,q13,q4));
            ArrayList<Integer> workflow2 = new ArrayList<>();
            workflow2.addAll(List.of(9,1));
            Form form2 = new Form(2,"QLI-QHSP-10-F04", 1, "SUBCONTRACTOR’S SAFETY & HEALTH PRE-EVALUATION","2022-04-04", questionnaires2,"published", workflow2, 9, true);


            ArrayList<Form> forms = new ArrayList<>();

            //For Form 1
            forms.add(form1);

            //For Form 2
            forms.add(form2);

//            int formId = 1;
//            for (Form form: forms){
//                form.setId(formId);
//                formId++;
//            }

            formRepository.saveAll(
                    List.of(form1,form2)
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
                    workflow1,
                    1,
                    true,
                    1,
                    "Vendor",
                    0,
                    "incomplete",
                    1
            );

            formResponseRepository.saveAll(
                    List.of(formResponse)
            );
            // ------------------Database Sequence-----------------------
            if (!databaseSequenceRepository.findById("user_sequence").isPresent() || databaseSequenceRepository.findById("user_sequence").get().getSeq() < 4){
                DatabaseSequence userSequence = new DatabaseSequence("user_sequence",4);
                databaseSequenceRepository.save(userSequence);
            }
            if (!databaseSequenceRepository.findById("field_sequence").isPresent() || databaseSequenceRepository.findById("field_sequence").get().getSeq() < 59){
                DatabaseSequence fieldSequence = new DatabaseSequence("field_sequence",59);
                databaseSequenceRepository.save(fieldSequence);
            }
            if (!databaseSequenceRepository.findById("questionnaire_sequence").isPresent() || databaseSequenceRepository.findById("questionnaire_sequence").get().getSeq() < 13){
                DatabaseSequence questionnaireSequence = new DatabaseSequence("questionnaire_sequence",13);
                databaseSequenceRepository.save(questionnaireSequence);
            }
            if (!databaseSequenceRepository.findById("form_sequence").isPresent() || databaseSequenceRepository.findById("form_sequence").get().getSeq() < 2){
                DatabaseSequence formSequence = new DatabaseSequence("form_sequence",2);
                databaseSequenceRepository.save(formSequence);
            }
            if (!databaseSequenceRepository.findById("form_response_sequence").isPresent() || databaseSequenceRepository.findById("form_response_sequence").get().getSeq() < 1){
                DatabaseSequence formResponseSequence = new DatabaseSequence("form_response_sequence",1);
                databaseSequenceRepository.save(formResponseSequence);
            }
            

        };
    }


}
