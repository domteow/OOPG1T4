package com.smu.oopg1t4.email;

public class Email {
    private String recipient;
    private String subject;
    private String msgBody; // Can be HTML
    private String attachment;

    public Email(String recipient, String subject, String msgBody) {
        this.recipient = recipient;
        this.subject = subject;
        this.msgBody = msgBody;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getMsgBody() {
        return msgBody;
    }

    public void setMsgBody(String msgBody) {
        this.msgBody = msgBody;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }
}
