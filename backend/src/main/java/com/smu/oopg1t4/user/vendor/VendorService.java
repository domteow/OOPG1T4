package com.smu.oopg1t4.user.vendor;

import com.smu.oopg1t4.response.StatusResponse;
import com.smu.oopg1t4.user.UserRepository;
import com.smu.oopg1t4.util.SequenceGeneratorService;
import com.smu.oopg1t4.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendorService {

    private final UserRepository userRepository;

    private final SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    public VendorService(UserRepository userRepository, SequenceGeneratorService sequenceGeneratorService) {
        this.userRepository = userRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    public ResponseEntity<StatusResponse> createNewVendor(Vendor vendor) {
        try {
            vendor.setId(sequenceGeneratorService.generateSequence(User.SEQUENCE_NAME));
            userRepository.save(vendor);
            StatusResponse successResponse = new StatusResponse("Vendor added successfully", HttpStatus.CREATED.value());
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error saving vendor: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }

    public ResponseEntity<?> getAllVendors() {
        try {
            return ResponseEntity.ok().body(userRepository.findAll());
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error retrieving vendors", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }

    public ResponseEntity<?> getVendor(int id) {
        Optional<User> optionalVendor = userRepository.findById(id);
        if (optionalVendor.isPresent()) {
            return ResponseEntity.ok().body(optionalVendor.get());
        } else {
            StatusResponse statusResponse = new StatusResponse("Vendor not found for id: " + id, HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }

    }

    public ResponseEntity<StatusResponse> createNewVendors(List<Vendor> vendors) {
        try {
            for (Vendor vendor : vendors) {
                vendor.setId(sequenceGeneratorService.generateSequence(User.SEQUENCE_NAME));
            }
            userRepository.saveAll(vendors);
            StatusResponse successResponse = new StatusResponse("Vendors added successfully", HttpStatus.CREATED.value());
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error saving vendors: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }

    public ResponseEntity<StatusResponse> deleteVendor(int id) {
        Optional<User> optionalVendor = userRepository.findById(id);
        if (optionalVendor.isPresent()) {
            userRepository.deleteById(id);
            StatusResponse successResponse = new StatusResponse("Vendor with id " + id + " deleted successfully", HttpStatus.NO_CONTENT.value());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(successResponse);

        } else {
            StatusResponse statusResponse = new StatusResponse("Vendor not found for id: " + id, HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }

    }
}
