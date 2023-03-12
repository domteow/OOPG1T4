package com.smu.oopg1t4.formResponse;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.smu.oopg1t4.form.Form;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "form_response")
public class FormResponse2 extends Form {

    @Transient
    public static final String SEQUENCE_NAME = "form_response_sequence";

    @JsonProperty("ownerId")
    private int ownerId; // Tagged to whoever the form is for. (vendorId)
    private String pendingUserInput;
    private int questionnairesCompleted = 0; // Frontend will block inputs to n-1 questionnairesCompleted (?)
    private boolean submitted; // If submitted by Vendor, for FrontEnd to block actions from vendor
    private boolean approved; // If approved = true, no more actions needed.


    public FormResponse2(){

    }
    public FormResponse2(
            int ownerId,
            String pendingUserInput,
            int questionnairesCompleted,
            boolean submitted,
            boolean approved
    ) {
        this.ownerId = ownerId;
        this.pendingUserInput = pendingUserInput;
        this.questionnairesCompleted = questionnairesCompleted;
        this.submitted = submitted;
        this.approved = approved;
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
