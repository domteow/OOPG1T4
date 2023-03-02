package com.smu.oopg1t4.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "users")
public abstract class User {

    @Transient
    public static final String SEQUENCE_NAME = "user_sequence";

    @Id
    protected int id;
    protected String name;
    protected String emailAddress;
    protected String password;

    public User(int id, String name, String emailAddress, String password) {
        this.id = id;
        this.name = name;
        this.emailAddress = emailAddress;
        this.password = password;
    }

    public abstract String getName();
    public abstract void setName(String name);
    public abstract int getID();

    public void setId(int id) {
        this.id = id;
    }
    public abstract String getEmailAddress();
    public abstract void setEmailAddress(String emailAddress);

}
