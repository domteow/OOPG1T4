package com.smu.oopg1t4.user.admin;

import com.smu.oopg1t4.response.StatusResponse;
import com.smu.oopg1t4.user.admin.Admin;
import com.smu.oopg1t4.user.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
public class AdminController {
    @Autowired
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/getAllAdmins")
    public ResponseEntity<?> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/getAdmin/{id}")
    public ResponseEntity<?> getAdmin(@PathVariable int id){
        return adminService.getAdmin(id);
    }

    @GetMapping("/getAdminByEmail/{email}")
    public ResponseEntity<?> getAdminByEmail(@PathVariable String email){
        return adminService.getAdminByEmail(email);
    }

    @PostMapping("/createAdmin")
    public ResponseEntity<StatusResponse> createNewAdmin(@RequestBody Admin admin){
        return adminService.createNewAdmin(admin);
    }

    @PostMapping("/createAdmins")
    public ResponseEntity<StatusResponse> createNewAdmins(@RequestBody List<Admin> admin){
        return adminService.createNewAdmins(admin);
    }
    @DeleteMapping("/deleteAdmin/{id}")
    public ResponseEntity<StatusResponse> deleteAdmin(@PathVariable int id){
        return adminService.deleteAdmin(id);
    }

}
