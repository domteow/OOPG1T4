package com.smu.oopg1t4.email;

import com.smu.oopg1t4.form.Form;
import com.smu.oopg1t4.form.FormRepository;
import com.smu.oopg1t4.formresponse.FormResponse;
import com.smu.oopg1t4.formresponse.FormResponseRepository;
import com.smu.oopg1t4.formresponse.FormResponseService;
import com.smu.oopg1t4.response.StatusResponse;
import com.smu.oopg1t4.user.User;
import com.smu.oopg1t4.user.UserRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.util.List;
import java.util.Optional;

@Service
public class EmailService {
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String sender;
    private String senderName = "OOP G1T4";

    private final UserRepository userRepository;
    private final FormResponseRepository formResponseRepository;

    @Autowired
    public EmailService(JavaMailSender javaMailSender, UserRepository userRepository, FormResponseRepository formResponseRepository) {
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;
        this.formResponseRepository = formResponseRepository;
    }

    public ResponseEntity<?> sendMail(Email email) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "utf-8");
            mimeMessageHelper.setFrom(String.format("%s <%s>", senderName, sender));
            mimeMessageHelper.setTo(email.getRecipient());
            mimeMessageHelper.setSubject(email.getSubject());
            mimeMessageHelper.setText(email.getMsgBody(), true);

            javaMailSender.send(mimeMessage);
            StatusResponse successResponse = new StatusResponse("Success!", HttpStatus.OK.value());
            return ResponseEntity.status(HttpStatus.OK).body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error sending email", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    public ResponseEntity<?> sendMailWithAttachment(Email email) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(email.getRecipient());
            mimeMessageHelper.setText(email.getMsgBody());
            mimeMessageHelper.setSubject(email.getSubject());

            // Adding the attachment
            FileSystemResource file = new FileSystemResource(
                    new File(email.getAttachment()));

            mimeMessageHelper.addAttachment(file.getFilename(), file);

            // Sending the mail
            javaMailSender.send(mimeMessage);
            StatusResponse successResponse = new StatusResponse("Success!", HttpStatus.OK.value());
            return ResponseEntity.status(HttpStatus.OK).body(successResponse);
        } catch (Exception e) {
            StatusResponse statusResponse = new StatusResponse("Error sending email", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    public ResponseEntity<?> sendReminderMail(int vendorId, int formId) {
        //get User email
        Optional<User> user = userRepository.findById(vendorId);
        String userEmail = user.get().getEmailAddress();
//        String userEmail = "oopg1t4@gmail.com";

        //Get pending form response
        FormResponse pendingForm = formResponseRepository.findById(formId).get();

        //Get pending form code
        String pendingFormCode = pendingForm.getFormCode();

        //get form description
        String pendingFormDescription = pendingForm.getDescription();

        //1. Craft the subject line
        String reminderSubject = "Reminder to complete your required forms";

        //2. Craft Message Body
        String reminderBody = "Dear vendor,<br/><br/>Please be reminded to complete the following form: <b>(" +pendingFormCode + ") - "+ pendingFormDescription + "</b>. <br/><br/>Please visit our website again to complete the form.<br/><br/>Thank you.<br/><br/>Regards,<br/>zxc.";

        //3. Create Email object
        Email reminderEmail = new Email(userEmail, reminderSubject, reminderBody);

        //4. Send the Email
        try{
            RestTemplate restTemplate = new RestTemplate();
            String url = "http://localhost:8080/api/v1/email/sendMail";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Email> request = new HttpEntity<>(reminderEmail, headers);
            ResponseEntity<?> response = restTemplate.postForEntity(url, request, Object.class);

            StatusResponse successResponse = new StatusResponse("Success!", HttpStatus.OK.value());
            return ResponseEntity.status(HttpStatus.OK).body(successResponse);
        }catch(Exception e){
            StatusResponse statusResponse = new StatusResponse("Error sending email", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }

    }
}
