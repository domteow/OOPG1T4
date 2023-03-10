package com.smu.oopg1t4.user.admin;

import com.smu.oopg1t4.response.StatusResponse;
import com.smu.oopg1t4.user.User;
import com.smu.oopg1t4.user.UserRepository;
import com.smu.oopg1t4.user.vendor.Vendor;
import com.smu.oopg1t4.util.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final UserRepository userRepository;

    private final SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    public AdminService(UserRepository userRepository, SequenceGeneratorService sequenceGeneratorService) {
        this.userRepository = userRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    public ResponseEntity<StatusResponse> createNewAdmin(Admin admin) {
        try {
            admin.setId(sequenceGeneratorService.generateSequence(User.SEQUENCE_NAME));
            userRepository.save(admin);
            StatusResponse successResponse = new StatusResponse("Admin added successfully", HttpStatus.CREATED.value());
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error saving admin: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }

    public ResponseEntity<?> getAllAdmins() {
        try {
            return ResponseEntity.ok().body(userRepository.findAll());
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error retrieving admins", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }

    public ResponseEntity<?> getAdmin(int id) {
        Optional<User> optionalAdmin = userRepository.findById(id);
        if (optionalAdmin.isPresent()) {
            return ResponseEntity.ok().body(optionalAdmin.get());
        } else {
            StatusResponse statusResponse = new StatusResponse("Admin not found for id: " + id, HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }

    }

    public ResponseEntity<StatusResponse> createNewAdmins(List<Admin> admins) {
        try {
            for (Admin admin : admins) {
                admin.setId(sequenceGeneratorService.generateSequence(User.SEQUENCE_NAME));
            }
            userRepository.saveAll(admins);
            StatusResponse successResponse = new StatusResponse("Admins added successfully", HttpStatus.CREATED.value());
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error saving admins: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }

    public ResponseEntity<StatusResponse> deleteAdmin(int id) {
        Optional<User> optionalAdmin = userRepository.findById(id);
        if (optionalAdmin.isPresent()) {
            userRepository.deleteById(id);
            StatusResponse successResponse = new StatusResponse("Admin with id " + id + " deleted successfully", HttpStatus.NO_CONTENT.value());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(successResponse);

        } else {
            StatusResponse statusResponse = new StatusResponse("Admin not found for id: " + id, HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }

    }
}
