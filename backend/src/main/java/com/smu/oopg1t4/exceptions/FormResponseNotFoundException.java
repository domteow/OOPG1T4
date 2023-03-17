package com.smu.oopg1t4.exceptions;

public class FormResponseNotFoundException extends Exception {
    public FormResponseNotFoundException(String message) {
        super(message);
    }

    public FormResponseNotFoundException() {
        this("Form Response is not found.");
    }
}

