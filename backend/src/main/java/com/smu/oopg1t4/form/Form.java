package com.smu.oopg1t4.form;

import com.smu.oopg1t4.questionnaire.Questionnaire;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Document(collection = "form")
public class Form {

    @Transient
    public static final String SEQUENCE_NAME = "form_sequence";
    @Id
    private int id;
    private String formCode; // Eg. "QLI-QHSP-10-F01"
    private int revisionNo; // To be used with the formCode, for ADMINs/APPROVERs to edit the form shown to vendors
    private String description; // Form Description, for "QLI-QHSP-10-F01", it would be "New Vendor Assessment Form"
    private String effectiveDate; // Effective date of form
    private ArrayList<Questionnaire> questionnaires = new ArrayList<>(); // FULL questionnaire used in the form.
    private String formStatus = "draft"; // Either "draft" or "published" or "outdated". Drafts are editable, will not be allowed to have form responses. Published forms are not editable, shown to vendors.
    private ArrayList<Integer> workflow;
    private int upTo; //for FE to know how many questionnaires can be completed

    public Form() {
    }

    public Form(String formCode, int revisionNo) {
        this.formCode = formCode;
        this.revisionNo = revisionNo;
    }

    public Form(
            String formCode,
            int revisionNo,
            String description,
            String effectiveDate,
            ArrayList<Questionnaire> questionnaires,
            String formStatus
    ) {
        this.formCode = formCode;
        this.revisionNo = revisionNo;
        this.description = description;
        this.effectiveDate = effectiveDate;
        this.questionnaires = questionnaires;
        this.formStatus = formStatus;
    }

    public Form(
            int formId,
            String formCode,
            int revisionNo,
            String description,
            String effectiveDate,
            ArrayList<Questionnaire> questionnaires,
            String formStatus
    ) {
        this.id = formId;
        this.formCode = formCode;
        this.revisionNo = revisionNo;
        this.description = description;
        this.effectiveDate = effectiveDate;
        this.questionnaires = questionnaires;
        this.formStatus = formStatus;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFormCode() {
        return formCode;
    }

    public void setFormCode(String formCode) {
        this.formCode = formCode;
    }

    public int getRevisionNo() {
        return revisionNo;
    }

    public void setRevisionNo(int revisionNo) {
        this.revisionNo = revisionNo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(String effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public ArrayList<Questionnaire> getQuestionnaires() {
        return questionnaires;
    }

    public void setQuestionnaires(ArrayList<Questionnaire> questionnaires) {
        this.questionnaires = questionnaires;
    }

    public void addQuestionnaireToForm(Questionnaire q) {
        this.questionnaires.add(q);
    }

    public void removeQuestionnaireFromForm(Questionnaire q) {
        this.questionnaires.remove(q);
    }

    public String getFormStatus() {
        return formStatus;
    }

    public void setFormStatus(String formStatus) {
        this.formStatus = formStatus;
    }

    public ArrayList<Integer> getWorkflow() {
        return workflow;
    }

    public void setWorkflow(ArrayList<Integer> workflow) {
        this.workflow = workflow;
    }

    public int getUpTo() {
        return upTo;
    }

    public void setUpTo(int upTo) {
        this.upTo = upTo;
    }

    @Override
    public String toString() {
        return "Form{" +
                "formId=" + id +
                ", formCode='" + formCode + '\'' +
                ", revisionNo=" + revisionNo +
                ", description='" + description + '\'' +
                ", effectiveDate=" + effectiveDate +
                ", questionnaires=" + questionnaires +
                ", formStatus='" + formStatus + '\'' +
                '}';
    }
}
