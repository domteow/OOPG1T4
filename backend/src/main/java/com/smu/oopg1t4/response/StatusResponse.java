package com.smu.oopg1t4.response;

public class StatusResponse {
    private String message;
    private int status;

    public StatusResponse(String message, int statusCode) {
        this.message = message;
        this.status = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int statusCode) {
        this.status = statusCode;
    }
}
