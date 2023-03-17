package com.smu.oopg1t4.formresponse;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.smu.oopg1t4.form.Form;
import com.smu.oopg1t4.questionnaire.Questionnaire;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

@Document(collection = "form_response")
public class FormResponse extends Form {

    @Transient
    public static final String SEQUENCE_NAME = "form_response_sequence";

    @JsonProperty("ownerId")
    private int ownerId; // Tagged to whoever the form is for. (vendorId)
    private String pendingUserInput;
    private int questionnairesCompleted = 0; // Frontend will block inputs to n-1 questionnairesCompleted (?)
    private String status; // incomplete, complete, approved, rejected


    public FormResponse() {

    }

    public FormResponse(
            int ownerId,
            String pendingUserInput,
            int questionnairesCompleted,
            String status
    ) {
        this.ownerId = ownerId;
        this.pendingUserInput = pendingUserInput;
        this.questionnairesCompleted = questionnairesCompleted;
        this.status = status;
    }

    public FormResponse(
            int formId,
            String formCode,
            int revisionNo,
            String description,
            String effectiveDate,
            ArrayList<Questionnaire> questionnaires,
            String formStatus,
            int ownerId,
            String pendingUserInput,
            int questionnairesCompleted,
            String status
    ) {
        super(formId, formCode, revisionNo, description, effectiveDate, questionnaires, formStatus);
        this.ownerId = ownerId;
        this.pendingUserInput = pendingUserInput;
        this.questionnairesCompleted = questionnairesCompleted;
        this.status = status;
    }

    @Override
    public int getId() {
        return super.getId();
    }

    @Override
    public void setId(int id) {
        super.setId(id);
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
