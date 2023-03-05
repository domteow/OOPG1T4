package com.smu.oopg1t4.form;

import com.smu.oopg1t4.questionnaire.Questionnaire;
import com.smu.oopg1t4.vendor.Vendor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;


@Document(collection = "form")
public class Form {

    @Transient
    public static final String SEQUENCE_NAME = "form_sequence";

    @Id
    private int formID;
    private int revisionNo;
    private Date effectiveDate;
    private ArrayList<Questionnaire> questionnaires;
    private String pendingUserInput;
    private boolean approved;
    private ArrayList<Vendor> vendorsAllowed;
    public Form(int formID, int revisionNo, Date effectiveDate, ArrayList<Questionnaire> questionnaires, String pendingUserInput, boolean approved, ArrayList<Vendor> vendorsAllowed){
        this.formID = formID;
        this.revisionNo = revisionNo;
        this.effectiveDate = effectiveDate;
        this.questionnaires = questionnaires;
        this.pendingUserInput = pendingUserInput;
        this.approved = approved;
        this.vendorsAllowed = vendorsAllowed;
    }
    public int getID(){
        return this.formID;
    }
    public void setID(int i){
        this.formID = i;
    }
    public ArrayList<Questionnaire> getAllQuestionnaire(){
        return this.questionnaires;
    }
    public void addQuestionnaireToForm(Questionnaire q){
        this.questionnaires.add(q);
    }
    public void removeQuestionnaireFromForm(Questionnaire q){
        this.questionnaires.remove(q);
    }
}
