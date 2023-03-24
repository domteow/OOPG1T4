package com.smu.oopg1t4.user.approver;

import com.smu.oopg1t4.response.StatusResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/approver")
public class ApproverController {
    @Autowired
    private final ApproverService approverService;

    public ApproverController(ApproverService approverService) {
        this.approverService = approverService;
    }

    @GetMapping("/getAllApprovers")
    public ResponseEntity<?> getAllApprovers() {
        return approverService.getAllApprovers();
    }

    @GetMapping("/getApprover/{id}")
    public ResponseEntity<?> getApprover(@PathVariable int id){
        return approverService.getApprover(id);
    }

    @GetMapping("/getApproverByEmail/{email}")
    public ResponseEntity<?> getApproverByEmail(@PathVariable String email){
        return approverService.getApproverByEmail(email);
    }

    @PostMapping("/createApprover")
    public ResponseEntity<StatusResponse> createNewApprover(@RequestBody Approver approver){
        return approverService.createNewApprover(approver);
    }

    @PostMapping("/createApprovers")
    public ResponseEntity<StatusResponse> createNewAdmins(@RequestBody List<Approver> approver){
        return approverService.createNewApprovers(approver);
    }

    @DeleteMapping("/deleteApprover/{id}")
    public ResponseEntity<StatusResponse> deleteApprover(@PathVariable int id){
        return approverService.deleteApprover(id);
    }

}
