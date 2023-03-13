package com.smu.oopg1t4.exceptions;

public class FormAlreadyExistsException extends Exception {
    public FormAlreadyExistsException(String message) {
        super(message);
    }

    public FormAlreadyExistsException() {
        this("Form already exists. Please try a different form code or revision number.");
    }
}
