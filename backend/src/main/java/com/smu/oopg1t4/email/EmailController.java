package com.smu.oopg1t4.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/email")
public class EmailController {
    private EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/sendMail")
    public ResponseEntity<?> sendMail(@RequestBody Email email) {
        return emailService.sendMail(email);
    }

    public ResponseEntity<?> sendMailWithAttachment(@RequestBody Email email) {
        return emailService.sendMailWithAttachment(email);
    }

    @PostMapping("/sendReminderMail/{vendorId}/{formId}")
    public ResponseEntity<?> sendReminderMail(@PathVariable int vendorId, @PathVariable int formId) {
        return emailService.sendReminderMail(vendorId, formId);
    }
}
