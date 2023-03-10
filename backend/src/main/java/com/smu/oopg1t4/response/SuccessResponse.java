package com.smu.oopg1t4.response;

import java.util.HashMap;

public class SuccessResponse<T> {
    private String message;
    private int status;
    private T data;

    public SuccessResponse(String message, int statusCode, T data) {
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

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}

