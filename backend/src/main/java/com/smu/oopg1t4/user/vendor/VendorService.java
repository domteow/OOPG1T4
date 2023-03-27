package com.smu.oopg1t4.user.vendor;

import com.smu.oopg1t4.encryptor.Encryptor;
import com.smu.oopg1t4.form.Form;
import com.smu.oopg1t4.response.StatusResponse;
import com.smu.oopg1t4.response.SuccessResponse;
import com.smu.oopg1t4.user.UserRepository;
import com.smu.oopg1t4.user.admin.Admin;
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
            if (userRepository.findByEmailOnly(vendor.getEmailAddress()).size() != 0){
                StatusResponse statusResponse = new StatusResponse("Account with email address already exists", HttpStatus.INTERNAL_SERVER_ERROR.value());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
            }
            vendor.setId(sequenceGeneratorService.generateSequence(User.SEQUENCE_NAME));
            vendor.setPassword(Encryptor.hash(vendor.getPassword()));
            vendor.setActive(true);
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
            List<User> vendors = userRepository.findByAccountTypeActive("Vendor");
            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), vendors);
            return ResponseEntity.ok().body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error retrieving vendors", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }

    public ResponseEntity<?> getVendor(int id) {
        try{
            List<User> vendorList = userRepository.findById(id, "Vendor");
            User vendor = vendorList.get(0);
            vendor.setPassword("************");
            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), vendor);
            return ResponseEntity.ok().body(successResponse);

        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Vendor not found for id: " + id, HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }
    }

    public ResponseEntity<?> getVendorByEmail(String email) {
        try{
            List<User> vendor = userRepository.findByEmail(email, "Vendor");
            SuccessResponse successResponse = new SuccessResponse("Success", HttpStatus.OK.value(), vendor.get(0));
            return ResponseEntity.ok().body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Vendor not found for email: " + email, HttpStatus.NOT_FOUND.value());
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
            User vendor = optionalVendor.get();
            boolean check = vendor.getActive();
            if (check){
                vendor.setActive(false);
            } else {
                vendor.setActive(true);
            }
            userRepository.save(vendor);
            StatusResponse successResponse = new StatusResponse("Vendor with id " + id + " deleted successfully", HttpStatus.OK.value());
            return ResponseEntity.status(HttpStatus.OK).body(successResponse);

        } else {
            StatusResponse statusResponse = new StatusResponse("Vendor not found for id: " + id, HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }

    }


    public ResponseEntity<StatusResponse> editVendor(int id, Vendor vendor) {
        try{
            Optional<User> optionalVendor = userRepository.findById(id);
            if (optionalVendor.isPresent()){
                User oldVendor = optionalVendor.get();
                vendor.setPassword(oldVendor.getPassword());
                userRepository.save(vendor);
            }
            StatusResponse successResponse = new StatusResponse("Vendor with id " + id + " edited successfully", HttpStatus.OK.value());
            return ResponseEntity.status(HttpStatus.OK).body(successResponse);
        } catch (Exception e){
            StatusResponse statusResponse = new StatusResponse("Error editing vendor for id: " + id, HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }

    }
}
