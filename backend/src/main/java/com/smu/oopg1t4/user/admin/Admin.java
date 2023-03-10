package com.smu.oopg1t4.user.admin;

import com.smu.oopg1t4.user.User;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@AllArgsConstructor
public class Admin extends User {

    public Admin(String name, String emailAddress, String password, String accountType) {
        super(name, emailAddress, password, accountType);
    }

    public Admin(int id, String name, String emailAddress, String password, String accountType) {
        super(id, name, emailAddress, password, accountType);
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
