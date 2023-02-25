package com.example.mdbspringboot;

import com.example.demo.student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class MdbSpringBootApplication{

    //to add class repos

    public static void main(String[] args) {
        SpringApplication.run(MdbSpringBootApplication.class, args);

    }
}
