package com.smu.oopg1t4.response;

public class RejectionResponse {
    private String message;

    public RejectionResponse() {
        // default constructor
    }

    public RejectionResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
