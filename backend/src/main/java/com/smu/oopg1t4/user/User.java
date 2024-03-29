package com.smu.oopg1t4.user;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.security.NoSuchAlgorithmException;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import com.smu.oopg1t4.encryptor.Encryptor;


@Document(collection = "user")
public abstract class User {

    @Transient
    public static final String SEQUENCE_NAME = "user_sequence";

    @Id
    protected int id;
    protected String name;
    protected String emailAddress;
//    @JsonProperty("password") // IF YOU WANT TO FORCE A RETURN OF PASSWORD
    protected String password;
    protected String accountType;
    protected boolean active;


    public User() {

    }
    
    
    public User(String name, String emailAddress, String password, String accountType, boolean active) throws NoSuchAlgorithmException {
        this.name = name;
        this.emailAddress = emailAddress;
        this.password = Encryptor.hash(password);
        this.accountType = accountType;
        this.active = active;
    }

    public User(int id, String name, String emailAddress, String password, String accountType, boolean active) throws NoSuchAlgorithmException {
       this(name, emailAddress, password, accountType, active);
        this.id = id;
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

    public String getPassword(){
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
