package com.smu.oopg1t4.user;

import com.smu.oopg1t4.encryptor.Encryptor;
import com.smu.oopg1t4.response.StatusResponse;
import com.smu.oopg1t4.response.SuccessResponse;
import com.smu.oopg1t4.user.UserRepository;
import com.smu.oopg1t4.user.admin.Admin;
import com.smu.oopg1t4.util.SequenceGeneratorService;
import com.smu.oopg1t4.user.User;
import org.bson.json.JsonObject;
import org.json.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    public UserService(UserRepository userRepository, SequenceGeneratorService sequenceGeneratorService) {
        this.userRepository = userRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), users);
            return ResponseEntity.ok().body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error retrieving users", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    public ResponseEntity<?> login(String user) {
        try {
            JSONObject userObj = new JSONObject(user);
            String emailAddress = userObj.getString("emailAddress");
            String password = userObj.getString("password");
            List<User> optionalUser = userRepository.findByEmailOnly(emailAddress);
            if (optionalUser != null) {
                User userInDB = optionalUser.get(0);
                if (userInDB.getPassword().equals(Encryptor.hash(password))) {
                    SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), userInDB);
                    return ResponseEntity.ok().body(successResponse);
                }
            }
            StatusResponse statusResponse = new StatusResponse("Wrong Password", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("User does not exist", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }
}
