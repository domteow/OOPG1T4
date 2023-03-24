package com.smu.oopg1t4.user.admin;

import com.smu.oopg1t4.encryptor.Encryptor;
import com.smu.oopg1t4.response.StatusResponse;
import com.smu.oopg1t4.response.SuccessResponse;
import com.smu.oopg1t4.user.User;
import com.smu.oopg1t4.user.UserRepository;
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
            admin.setPassword(Encryptor.hash(admin.getPassword()));
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
            List<User> admins = userRepository.findByAccountTypeActive("Admin");

            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), admins);
            return ResponseEntity.ok().body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error retrieving admins", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }

    public ResponseEntity<?> getAdmin(int id) {
        try{
            List<User> admin = userRepository.findById(id, "Admin");
            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), admin.get(0));
            return ResponseEntity.ok().body(successResponse);

        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Admin not found for id: " + id, HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }
    }

    public ResponseEntity<?> getAdminByEmail(String email) {
        try{
            List<User> admin = userRepository.findByEmail(email, "Admin");
            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), admin.get(0));
            return ResponseEntity.ok().body(successResponse);

        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Admin not found for email: " + email, HttpStatus.NOT_FOUND.value());
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
            User admin = optionalAdmin.get();
            boolean check = admin.getActive();
            if (check){
                admin.setActive(false);
            } else {
                admin.setActive(true);
            }
            userRepository.save(admin);
            StatusResponse successResponse = new StatusResponse("Admin with id " + id + " deleted successfully", HttpStatus.NO_CONTENT.value());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(successResponse);

        } else {
            StatusResponse statusResponse = new StatusResponse("Admin not found for id: " + id, HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }

    }
}
