package com.smu.oopg1t4.user.vendor;

import com.fasterxml.jackson.annotation.JsonTypeName;
import com.smu.oopg1t4.user.User;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
public class Vendor extends User {

    private ArrayList<String> countries;
    private String phoneNumber;
    private String faxNumber;
    private String company;

    public Vendor(String name, String emailAddress, String password, String accountType, boolean active, ArrayList<String> countries, String phoneNumber, String faxNumber, String company) throws NoSuchAlgorithmException {
        super(name, emailAddress, password, accountType, active);
        this.countries = countries;
        this.phoneNumber = phoneNumber;
        this.faxNumber = faxNumber;
        this.company = company;
    }

    public Vendor(int id, String name, String emailAddress, String password, String accountType, boolean active, ArrayList<String> countries, String phoneNumber, String faxNumber, String company) throws NoSuchAlgorithmException {
        super(id, name, emailAddress, password, accountType, active);
        this.countries = countries;
        this.phoneNumber = phoneNumber;
        this.faxNumber = faxNumber;
        this.company = company;
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
    public int getId() {
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

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }
}
