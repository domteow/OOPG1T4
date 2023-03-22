package com.smu.oopg1t4.login;

import com.smu.oopg1t4.user.User;
import com.smu.oopg1t4.encryptor.Encryptor;

import java.security.NoSuchAlgorithmException;


public class login {
    public boolean verifyLogin(User user, String password) throws NoSuchAlgorithmException{
        Encryptor e = new Encryptor();
        if (user.getHashedPassword() == e.hash(password)){
            return true;
        }
        return false;
    }
}
