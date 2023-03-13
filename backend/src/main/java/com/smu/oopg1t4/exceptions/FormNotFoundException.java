package com.smu.oopg1t4.exceptions;

public class FormNotFoundException extends Exception {
    public FormNotFoundException(String message) {
        super(message);
    }

    public FormNotFoundException() {
        this("Form not found.");
    }
}
