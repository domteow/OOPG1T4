package com.smu.oopg1t4.user.vendor;

import com.smu.oopg1t4.user.User;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "user")
public class Vendor extends User {

    private ArrayList<String> countries;
    private String phoneNumber;
    private String faxNumber;

    public Vendor(String name, String emailAddress, String password, ArrayList<String> countries, String phoneNumber, String faxNumber) {
        super(name, emailAddress, password);
        this.countries = countries;
        this.phoneNumber = phoneNumber;
        this.faxNumber = faxNumber;
    }

    public Vendor(int id, String name, String emailAddress, String password, ArrayList<String> countries, String phoneNumber, String faxNumber) {
        super(id, name, emailAddress, password);
        this.countries = countries;
        this.phoneNumber = phoneNumber;
        this.faxNumber = faxNumber;
    }



    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int getID() {
        return this.id;
    }

    @Override
    public String getEmailAddress() {
        return this.emailAddress;
    }

    @Override
    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }


    public ArrayList<String> getCountries() {
        return countries;
    }

    public void setCountries(ArrayList<String> countries) {
        this.countries = countries;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFaxNumber() {
        return faxNumber;
    }

    public void setFaxNumber(String faxNumber) {
        this.faxNumber = faxNumber;
    }

}
