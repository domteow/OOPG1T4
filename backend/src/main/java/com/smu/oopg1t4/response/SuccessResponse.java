package com.smu.oopg1t4.response;

import java.util.HashMap;

public class SuccessResponse {
    private String message;
    private int status;
    private HashMap data;

    public SuccessResponse(String message, int statusCode, HashMap data) {
        this.message = message;
        this.status = statusCode;
        this.data = data;
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

    public HashMap getData() {
        return data;
    }

    public void setData(HashMap data) {
        this.data = data;
    }
}

