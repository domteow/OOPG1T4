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

import java.security.NoSuchAlgorithmException;
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


    public ResponseEntity<?> getUserById(int id) {
        try{
            List<User> userList = userRepository.findByIdOnly(id);
            User user = userList.get(0);
            user.setPassword("************");
            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), user);
            return ResponseEntity.ok().body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Vendor not found for id: " + id, HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }
    }


    public ResponseEntity<?> login(String userString) {
        try {
            JSONObject userObj = new JSONObject(userString);
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


    public ResponseEntity<?> editUserDetails(String userString) {
        try{
            JSONObject userObj = new JSONObject(userString);
            int id = userObj.getInt("id");
            List<User> userList = userRepository.findByIdOnly(id);
            User user = userList.get(0);
            String emailAddress = userObj.getString("emailAddress");
            String name = userObj.getString("name");
            user.setEmailAddress(emailAddress);
            user.setName(name);

            userRepository.save(user);

            StatusResponse statusResponse = new StatusResponse("Changes saved successfully", HttpStatus.OK.value());
            return ResponseEntity.status(HttpStatus.OK).body(statusResponse);

        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error saving the changes to user details", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }

    public ResponseEntity<?> changePassword(String passwordString) {
        try{
            JSONObject userObj = new JSONObject(passwordString);
            int id = userObj.getInt("id");
            List<User> userList = userRepository.findByIdOnly(id);
            User user = userList.get(0);
            String oldPassword = userObj.getString("oldPassword");
            String newPassword = userObj.getString("newPassword");
            String hashedPassword = user.getPassword();
            if (checkPassword(oldPassword, hashedPassword)){

                user.setPassword(Encryptor.hash(newPassword));

                userRepository.save(user);

                StatusResponse statusResponse = new StatusResponse("Password changed successfully", HttpStatus.OK.value());
                return ResponseEntity.status(HttpStatus.OK).body(statusResponse);
            }

            StatusResponse statusResponse = new StatusResponse("Current password incorrect", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);

        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error changing password", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }


    }

    public boolean checkPassword(String password, String hashedPassword) throws NoSuchAlgorithmException {
        boolean check = hashedPassword.equals(Encryptor.hash(password));
        return check;
    }
}
