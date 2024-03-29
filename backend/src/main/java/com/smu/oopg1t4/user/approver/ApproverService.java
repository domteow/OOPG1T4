package com.smu.oopg1t4.user.approver;

import com.smu.oopg1t4.email.EmailService;
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
public class ApproverService {

    private final UserRepository userRepository;

    private final SequenceGeneratorService sequenceGeneratorService;
    private final EmailService emailService;

    @Autowired
    public ApproverService(UserRepository userRepository, SequenceGeneratorService sequenceGeneratorService, EmailService emailService) {
        this.userRepository = userRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
        this.emailService = emailService;

    }

    public ResponseEntity<StatusResponse> createNewApprover(Approver approver) {
        try {
            if (userRepository.findByEmailOnly(approver.getEmailAddress()).size() != 0) {
                StatusResponse statusResponse = new StatusResponse("Account with email address already exists", HttpStatus.INTERNAL_SERVER_ERROR.value());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
            }
            approver.setId(sequenceGeneratorService.generateSequence(User.SEQUENCE_NAME));
            String passwordBeforeHash = approver.getPassword();
            approver.setPassword(Encryptor.hash(approver.getPassword()));
            approver.setActive(true);
            userRepository.save(approver);
            emailService.sendWelcomeMail(approver, passwordBeforeHash);
            StatusResponse successResponse = new StatusResponse("Approver added successfully", HttpStatus.CREATED.value());
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error saving approver: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }

    public ResponseEntity<?> getAllApprovers() {
        try {
            List<User> admins = userRepository.findByAccountTypeActive("Approver");

            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), admins);
            return ResponseEntity.ok().body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error retrieving approvers", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }

    public ResponseEntity<?> getApprover(int id) {
        try {
            List<User> admin = userRepository.findById(id, "Approver");
            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), admin.get(0));
            return ResponseEntity.ok().body(successResponse);

        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Approver not found for id: " + id, HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }
    }

    public ResponseEntity<?> getApproverByEmail(String email) {
        try {
            List<User> admin = userRepository.findByEmail(email, "Approver");
            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), admin.get(0));
            return ResponseEntity.ok().body(successResponse);

        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Approver not found for email: " + email, HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }
    }

    public ResponseEntity<StatusResponse> createNewApprovers(List<Approver> approvers) {
        try {
            for (Approver approver : approvers) {
                approver.setId(sequenceGeneratorService.generateSequence(User.SEQUENCE_NAME));
            }
            userRepository.saveAll(approvers);
            StatusResponse successResponse = new StatusResponse("Approvers added successfully", HttpStatus.CREATED.value());
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error saving approvers: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }

    public ResponseEntity<StatusResponse> deleteApprover(int id) {
        Optional<User> optionalApprover = userRepository.findById(id);
        if (optionalApprover.isPresent()) {
            User approver = optionalApprover.get();
            boolean check = approver.getActive();
            if (check) {
                approver.setActive(false);
            } else {
                approver.setActive(true);
            }
            userRepository.save(approver);
            StatusResponse successResponse = new StatusResponse("Approver with id " + id + " deleted successfully", HttpStatus.NO_CONTENT.value());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(successResponse);

        } else {
            StatusResponse statusResponse = new StatusResponse("Approver not found for id: " + id, HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }

    }
}
