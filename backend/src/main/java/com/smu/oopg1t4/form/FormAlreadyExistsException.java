package com.smu.oopg1t4.form;

public class FormAlreadyExistsException extends Exception {
    public FormAlreadyExistsException(String message) {
        super(message);
    }

    public FormAlreadyExistsException() {
        this("Form already exists. Please try creating form under a different form code or revision number.");
    }
}
