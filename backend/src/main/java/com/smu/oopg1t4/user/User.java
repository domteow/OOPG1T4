package com.smu.oopg1t4.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "user")
public abstract class User {

    @Transient
    public static final String SEQUENCE_NAME = "user_sequence";

    @Id
    protected int id;
    protected String name;
    protected String emailAddress;
//    @JsonProperty("password") IF YOU WANT TO FORCE A RETURN OF PASSWORD
    protected String password;
    protected String accountType;


    public User(){

    }

    public User(String name, String emailAddress, String password, String accountType) {
        this.name = name;
        this.emailAddress = emailAddress;
        this.password = password;
        this.accountType = accountType;
    }

    public User(int id, String name, String emailAddress, String password, String accountType) {
        this.id = id;
        this.name = name;
        this.emailAddress = emailAddress;
        this.password = password;
        this.accountType = accountType;

    }



    public abstract String getName();
    public abstract void setName(String name);
    public abstract int getId();

    public void setId(int id) {
        this.id = id;
    }
    public abstract String getEmailAddress();
    public abstract void setEmailAddress(String emailAddress);

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }
}
