package com.smu.mdbspringboot;

import com.smu.oopg1t4.field.FieldRepository;
import com.smu.oopg1t4.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class MdbSpringBootApplication{

    //to add class repos
    @Autowired
    FieldRepository fieldRepository;

    @Autowired
    UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(MdbSpringBootApplication.class, args);

    }
}
