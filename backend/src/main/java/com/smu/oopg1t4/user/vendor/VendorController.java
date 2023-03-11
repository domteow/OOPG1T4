package com.smu.oopg1t4.user.vendor;

import com.smu.oopg1t4.response.StatusResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/vendor")
public class VendorController {
    @Autowired
    private final VendorService vendorService;

    public VendorController(VendorService vendorService) {
        this.vendorService = vendorService;
    }

    @GetMapping("/getAllVendors")
    public ResponseEntity<?> getAllVendors() {
        return vendorService.getAllVendors();
    }

    @GetMapping("/getVendor/{id}")
    public ResponseEntity<?> getVendor(@PathVariable int id){
        return vendorService.getVendor(id);

    }

    @GetMapping("/getVendorByEmail/{email}")
    public ResponseEntity<?> getVendorByEmail(@PathVariable String email){
        return vendorService.getVendorByEmail(email);
    }


    @PostMapping("/createVendor")
    public ResponseEntity<StatusResponse> createNewVendor(@RequestBody Vendor vendor){
        return vendorService.createNewVendor(vendor);
    }

    @PostMapping("/createVendors")
    public ResponseEntity<StatusResponse> createNewVendors(@RequestBody List<Vendor> vendors){
        return vendorService.createNewVendors(vendors);
    }
    @DeleteMapping("/deleteVendor/{id}")
    public ResponseEntity<StatusResponse> deleteVendor(@PathVariable int id){
        return vendorService.deleteVendor(id);
    }

}
