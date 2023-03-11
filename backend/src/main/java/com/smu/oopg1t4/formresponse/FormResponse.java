package com.smu.oopg1t4.formresponse;

import com.smu.oopg1t4.form.Form;
import com.smu.oopg1t4.questionnaire.Questionnaire;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

@Document(collection = "form_response")
public class FormResponse {

    @Transient
    public static final String SEQUENCE_NAME = "form_response_sequence";

    @Id
    private int id;
    private Form form;
    // private ArrayList<String> formAnswers;
    // it may be better to keep the answers to each form field here, so that the form does not need to be touched anymore?
    private int ownerId; // Tagged to whoever the form is for. (vendorId)
    private String pendingUserInput;
    private int questionnairesCompleted = 0; // Frontend will block inputs to n-1 questionnairesCompleted (?)
    private boolean submitted; // If submitted by Vendor, for FrontEnd to block actions from vendor
    private boolean approved; // If approved = true, no more actions needed.

    public FormResponse(
            Form form,
            int ownerId,
            String pendingUserInput,
            int questionnairesCompleted,
            boolean submitted,
            boolean approved
    ) {
        this.form = form;
        this.ownerId = ownerId;
        this.pendingUserInput = pendingUserInput;
        this.questionnairesCompleted = questionnairesCompleted;
        this.submitted = submitted;
        this.approved = approved;
    }

    public FormResponse(
            int id,
            Form form,
            int ownerId,
            String pendingUserInput,
            int questionnairesCompleted,
            boolean submitted,
            boolean approved
    ) {
        this.form = form;
        this.id = id;
        this.ownerId = ownerId;
        this.pendingUserInput = pendingUserInput;
        this.questionnairesCompleted = questionnairesCompleted;
        this.submitted = submitted;
        this.approved = approved;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(int ownerId) {
        this.ownerId = ownerId;
    }

    public String getPendingUserInput() {
        return pendingUserInput;
    }

    public void setPendingUserInput(String pendingUserInput) {
        this.pendingUserInput = pendingUserInput;
    }

    public int getQuestionnairesCompleted() {
        return questionnairesCompleted;
    }

    public void setQuestionnairesCompleted(int questionnairesCompleted) {
        this.questionnairesCompleted = questionnairesCompleted;
    }

    public boolean isSubmitted() {
        return submitted;
    }

    public void setSubmitted(boolean submitted) {
        this.submitted = submitted;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }
}
