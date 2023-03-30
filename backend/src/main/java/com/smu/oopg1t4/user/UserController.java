package com.smu.oopg1t4.user;

import com.smu.oopg1t4.response.StatusResponse;
import org.json.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/user")
public class UserController {
    
    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id){
        return userService.getUserById(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody String userString){
        return userService.login(userString);
    }

    @PutMapping("/editUserDetails")
    public ResponseEntity<?> editUserDetails(@RequestBody String userString) {
        return userService.editUserDetails(userString);
    }

    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody String passwordString) {
        return userService.changePassword(passwordString);
    }

}
