package com.smu.oopg1t4.user.approver;

import java.security.NoSuchAlgorithmException;

import com.smu.oopg1t4.user.admin.Admin;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
public class Approver extends Admin {

    public Approver(String name, String emailAddress, String password, String accountType) throws NoSuchAlgorithmException {
        super(name, emailAddress, password, accountType);
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


}
