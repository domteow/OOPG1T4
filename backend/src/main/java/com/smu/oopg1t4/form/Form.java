package com.smu.oopg1t4.form;

import com.smu.oopg1t4.questionnaire.Questionnaire;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;


@Document(collection = "form")
public class Form {
    enum FormType {
        TEMPLATE,
        RESPONSE
    }

    @Transient
    public static final String SEQUENCE_NAME = "form_sequence";

    @Id
    private int formID; // Internal database form ID
    private String formCode; // Eg. "QLI-QHSP-10-F01"
    private int revisionNo; // To be used with the formCode, for ADMINs/APPROVERs to edit the form shown to vendors
    private String description;

    // TODO: ask abt the below 2 qns~
    // Do we need to show/keep all revisions of a form?
    // When allowing vendors to create a response to a form, do we only show the newest revision?
    private Date effectiveDate; // Effective date of form
    private ArrayList<Questionnaire> questionnaires; // FULL questionnaire used in the form, will NOT be stored in the DB
    private ArrayList<Integer> questionnaireIDs = new ArrayList<>(); // Questionnaire IDs used in the form, to be stored in DB
    private ArrayList<Integer> vendorsAllowed = new ArrayList<>(); // Vendors allowed to view the form.
    // TODO: is it better to just store this in the vendor's table, or do we just store on both ends (Form and vendor collections)

    // For the attributes below, is it better to have a "FormResponse" class and DB, instead of all the additional attributes in the "Form" class
    private FormType formType; // Form is either a template (uneditable by vendors-> can only create copy) or a response (created by vendor)
    private ArrayList<Integer> formOwners = new ArrayList<>(); // Vendor IDs, to query for formResponses created by a vendor, visible to creator (and their accounts)
    private String pendingUserInput;
    private boolean approved;

    public Form() {
    }

    public Form(String formCode, int revisionNo, Date effectiveDate, String description) {
        this.formCode = formCode;
        this.revisionNo = revisionNo;
        this.effectiveDate = effectiveDate;
        this.description = description;
    }

    public Form(String formCode,
                int revisionNo,
                Date effectiveDate,
                ArrayList<Questionnaire> questionnaires,
                ArrayList<Integer> questionnaireIDs,
                ArrayList<Integer> vendorsAllowed,
                FormType formType,
                ArrayList<Integer> formOwners,
                String pendingUserInput,
                boolean approved) {
        this.formCode = formCode;
        this.revisionNo = revisionNo;
        this.effectiveDate = effectiveDate;
        this.questionnaires = questionnaires;
        this.questionnaireIDs = questionnaireIDs;
        this.vendorsAllowed = vendorsAllowed;
        this.formType = formType;
        this.formOwners = formOwners;
        this.pendingUserInput = pendingUserInput;
        this.approved = approved;
    }

    public int getFormID() {
        return formID;
    }

    public void setFormID(int formID) {
        this.formID = formID;
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

    public Date getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(Date effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public ArrayList<Questionnaire> getQuestionnaires() {
        return questionnaires;
    }

    public void setQuestionnaires(ArrayList<Questionnaire> questionnaires) {
        this.questionnaires = questionnaires;
    }

    public ArrayList<Integer> getQuestionnaireIDs() {
        return questionnaireIDs;
    }

    public void setQuestionnaireIDs(ArrayList<Integer> questionnaireIDs) {
        this.questionnaireIDs = questionnaireIDs;
    }

    public void addQuestionnaireID(int questionnaireID) {
        questionnaireIDs.add(questionnaireID);
    }

    public ArrayList<Integer> getVendorsAllowed() {
        return vendorsAllowed;
    }

    public void setVendorsAllowed(ArrayList<Integer> vendorsAllowed) {
        this.vendorsAllowed = vendorsAllowed;
    }

    public FormType getFormType() {
        return formType;
    }

    public void setFormType(FormType formType) {
        this.formType = formType;
    }

    public ArrayList<Integer> getFormOwners() {
        return formOwners;
    }

    public void setFormOwners(ArrayList<Integer> formOwners) {
        this.formOwners = formOwners;
    }

    public String getPendingUserInput() {
        return pendingUserInput;
    }

    public void setPendingUserInput(String pendingUserInput) {
        this.pendingUserInput = pendingUserInput;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public ArrayList<Questionnaire> getAllQuestionnaire() {
        return this.questionnaires;
    }

    public void addQuestionnaireToForm(Questionnaire q) {
        if (questionnaires == null) {
            questionnaires = new ArrayList<>();
        }
        this.questionnaires.add(q);
    }

    public void removeQuestionnaireFromForm(Questionnaire q) {
        // Need error handling
        this.questionnaires.remove(q);
    }

    @Override
    public String toString() {
        return "Form{" +
                "formID=" + formID +
                ", formCode='" + formCode + '\'' +
                ", revisionNo=" + revisionNo +
                ", effectiveDate=" + effectiveDate +
                ", questionnaires=" + questionnaires +
                ", questionnaireIDs=" + questionnaireIDs +
                ", vendorsAllowed=" + vendorsAllowed +
                ", formType=" + formType +
                ", formOwners=" + formOwners +
                ", pendingUserInput='" + pendingUserInput + '\'' +
                ", approved=" + approved +
                '}';
    }
}
