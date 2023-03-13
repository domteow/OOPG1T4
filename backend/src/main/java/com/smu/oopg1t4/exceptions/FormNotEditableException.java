package com.smu.oopg1t4.exceptions;

public class FormNotEditableException extends Exception {
    public FormNotEditableException(String message) {
        super(message);
    }

    public FormNotEditableException() {
        this("Form cannot be edited. Please check the formStatus of the form that you are trying to edit.");
    }
}
