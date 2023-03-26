package com.smu.oopg1t4.formresponse;

import com.smu.oopg1t4.email.Email;
import com.smu.oopg1t4.exceptions.FormNotEditableException;
import com.smu.oopg1t4.exceptions.FormNotFoundException;
import com.smu.oopg1t4.exceptions.FormResponseNotFoundException;
import com.smu.oopg1t4.form.Form;
import com.smu.oopg1t4.form.FormRepository;
import com.smu.oopg1t4.form.FormService;
import com.smu.oopg1t4.questionnaire.Questionnaire;
import com.smu.oopg1t4.questionnaire.QuestionnaireService;
import com.smu.oopg1t4.response.RejectionResponse;
import com.smu.oopg1t4.response.StatusResponse;
import com.smu.oopg1t4.response.SuccessResponse;
import com.smu.oopg1t4.user.User;
import com.smu.oopg1t4.user.UserRepository;
import com.smu.oopg1t4.util.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.smu.oopg1t4.user.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class FormResponseService {
    private final FormRepository formRepository;
    private final FormResponseRepository formResponseRepository;
    private final SequenceGeneratorService sequenceGeneratorService;
    private final QuestionnaireService questionnaireService;
    private final FormService formService;
    private final UserRepository userRepository;

    @Autowired
    public FormResponseService(
            FormResponseRepository formResponseRepository,
            SequenceGeneratorService sequenceGeneratorService,
            QuestionnaireService questionnaireService,
            FormRepository formRepository,
            FormService formService,
            UserRepository userRepository
    ) {
        this.formResponseRepository = formResponseRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
        this.questionnaireService = questionnaireService;
        this.formRepository = formRepository;
        this.formService = formService;
        this.userRepository = userRepository;
    }


    //get forms by vendor id
    public ResponseEntity<?> getFormByVendorID(int ownerId) {
        List<FormResponse> forms = formResponseRepository.getFormByVendorID(ownerId);
        if (forms.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new StatusResponse("Forms not found.", HttpStatus.NOT_FOUND.value()));
        }
        return ResponseEntity.ok().body(
                new SuccessResponse("Success", HttpStatus.OK.value(), forms));
    }

    public ResponseEntity<?> getFormByFormResponseID(int id) {
        Optional<FormResponse> form = formResponseRepository.findById(id);
        if (form.isPresent()) {
            return ResponseEntity.ok().body(
                    new SuccessResponse("Success", HttpStatus.OK.value(), form.get()));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new StatusResponse("Form not found.", HttpStatus.NOT_FOUND.value()));
    }

    public ResponseEntity<StatusResponse> assignFormToVendor(int formId, int vendorId) {
        Optional<Form> optionalForm = formRepository.findById(formId);
        if (optionalForm.isPresent()) {
            Form form = optionalForm.get();
            String status = "incomplete";
            if (form.getQuestionnaires().get(0).getRoleRequired().equals("Approver")){
                status = "complete";
            }
            FormResponse formResponse = new FormResponse(
                    sequenceGeneratorService.generateSequence(FormResponse.SEQUENCE_NAME),
                    form.getFormCode(),
                    form.getRevisionNo(),
                    form.getDescription(),
                    form.getEffectiveDate(),
                    form.getQuestionnaires(),
                    form.getFormStatus(),
                    form.getWorkflow(),
                    form.getUpTo(),
                    form.getActive(),
                    vendorId,
                    form.getQuestionnaires().get(0).getRoleRequired(),
                    0,
                    status,
                    formId
            );
            formResponseRepository.save(formResponse);

            return ResponseEntity.ok().body(
                    new StatusResponse("Success", HttpStatus.OK.value()));
        } else {
            return ResponseEntity.ok().body(
                    new StatusResponse("Failure", HttpStatus.OK.value()));
        }

    }

    public ResponseEntity<StatusResponse> updateFormResponse(int formId, FormResponse updatedFormResponse) {
        try{
            Optional<FormResponse> formResponseToUpdate = formResponseRepository.findById(formId);
            if (formResponseToUpdate.isPresent()){
                updateFormResponse(formResponseToUpdate.get(), updatedFormResponse);


                StatusResponse successResponse = new StatusResponse("Success!", HttpStatus.OK.value());
                return ResponseEntity.status(HttpStatus.OK).body(successResponse);
            }else{
                throw new FormResponseNotFoundException();
            }
        }catch(FormResponseNotFoundException e){
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }catch(Exception e){
            StatusResponse statusResponse = new StatusResponse("Error updating form response: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    private void updateFormResponse(FormResponse formResponseToUpdate, FormResponse updatedFormResponse){

        //Pop first index of workflow and get the removed element
        int numQuestionnairesSubmitted = formResponseToUpdate.getWorkflow().remove(0);

        //set status (incomplete/complete/approved)
        if (formResponseToUpdate.getWorkflow().size() == 1){
            formResponseToUpdate.setStatus("complete");
        }
        if (formResponseToUpdate.getWorkflow().size() == 0){
            formResponseToUpdate.setStatus("approved");
        }

        //Add to questionnaires completed
        formResponseToUpdate.setQuestionnairesCompleted(formResponseToUpdate.getQuestionnairesCompleted() + numQuestionnairesSubmitted);

        //Add to upTo (for frontend use)
        formResponseToUpdate.setUpTo(formResponseToUpdate.getUpTo() + numQuestionnairesSubmitted);

        //Update pendingUserInput
        if (formResponseToUpdate.getWorkflow().size()!= 0) {
            String nextRoleRequired = updatedFormResponse.getQuestionnaires().get(formResponseToUpdate.getQuestionnairesCompleted()).getRoleRequired();
            formResponseToUpdate.setPendingUserInput(nextRoleRequired);
        }

        //update questionnaires
        formResponseToUpdate.setQuestionnaires(updatedFormResponse.getQuestionnaires());

        //update complete field in Questionnaire
        for(int i = 0; i< numQuestionnairesSubmitted; i++){
            formResponseToUpdate.getQuestionnaires().get(i).setComplete(true);
        }



        formResponseRepository.save(formResponseToUpdate);
    }

    public ResponseEntity<StatusResponse> saveFormResponseAsDraft(int formId, FormResponse formResponseDraft) {
        // Only updating questionnaire. pendingUserInput, workflow, upTo all remains same. (since current user still working on it)
        try{
            Optional<FormResponse> formResponseToUpdate = formResponseRepository.findById(formId);
            if (formResponseToUpdate.isPresent()){
                updateFormResponseDraft(formResponseToUpdate.get(), formResponseDraft);
                StatusResponse successResponse = new StatusResponse("Success!", HttpStatus.OK.value());
                return ResponseEntity.status(HttpStatus.OK).body(successResponse);
            }else{
                throw new FormResponseNotFoundException();
            }
        }catch(FormResponseNotFoundException e){
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }catch(Exception e){
            StatusResponse statusResponse = new StatusResponse("Error saving form response draft: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    private void updateFormResponseDraft(FormResponse formResponseToUpdate, FormResponse formResponseDraft) {
        //update questionnaires
        formResponseToUpdate.setQuestionnaires(formResponseDraft.getQuestionnaires());
        formResponseRepository.save(formResponseToUpdate);
    }

    public ResponseEntity<StatusResponse> rejectFormResponse(int formId, RejectionResponse rejectionResponse) {
        //reset entire form response to default (restart form response from the beginning)
        try{
            Optional<FormResponse> formResponseToReject = formResponseRepository.findById(formId);
            if (formResponseToReject.isPresent()){
                rejectFormResponse(formResponseToReject.get(), rejectionResponse);
                StatusResponse successResponse = new StatusResponse("Success!", HttpStatus.OK.value());
                return ResponseEntity.status(HttpStatus.OK).body(successResponse);
            }else{
                throw new FormResponseNotFoundException();
            }
        }catch(FormResponseNotFoundException e){
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        }catch (FormNotFoundException e) {
            StatusResponse statusResponse = new StatusResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(statusResponse);
        } catch(Exception e){
            e.printStackTrace();
            StatusResponse statusResponse = new StatusResponse("Error rejecting form response: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    private void rejectFormResponse(FormResponse formResponseToReject, RejectionResponse rejectionResponse) throws FormNotFoundException,Exception {
        //Get template questionnaires
        ArrayList<Questionnaire> templateQuestionnaires = formService.getFormById(formResponseToReject.getTemplateId()).getQuestionnaires();


        //reset questionnaires
        formResponseToReject.setQuestionnaires(templateQuestionnaires);

        //reset questionnaires completed
        formResponseToReject.setQuestionnairesCompleted(0);

        //reset status
        formResponseToReject.setStatus("incomplete");

        //reset workflow and upTo
        String current = null;
        int count = 0;
        ArrayList<Integer> newWorkflow = new ArrayList<>();

        for (Questionnaire questionnaire: templateQuestionnaires){
            if (current == null){
                current = questionnaire.getRoleRequired();
                count = 1;
            } else if (questionnaire.getRoleRequired().equals(current)){
                count++;
            } else if (!questionnaire.getRoleRequired().equals(current)){
                newWorkflow.add(count);
                count = 1;
                current = questionnaire.getRoleRequired();
            }

        }
        newWorkflow.add(count);
        int newUpTo = newWorkflow.get(0);

        //setting new workflow and upTo
        formResponseToReject.setWorkflow(newWorkflow);
        formResponseToReject.setUpTo(newUpTo);

        //reset pending user input
        String firstPendingUser = formResponseToReject.getQuestionnaires().get(0).getRoleRequired();
        formResponseToReject.setPendingUserInput(firstPendingUser);

        //updating
        formResponseRepository.save(formResponseToReject);

        //email rejection response
        //1. Craft the subject line
        String rejectionSubject = "The form " + formResponseToReject.getFormCode() + " has been rejected.";

        //2. Craft Message Body
        String rejectionBody = "Dear vendor,<br/><br/>The approver has rejected the form <b>(" + formResponseToReject.getFormCode() + ")</b> that you have submitted.<br/><br/><b>Reason for rejection:</b>"+ rejectionResponse.getMessage() + "<br/><br/>Please visit our website again to re-submit the form.<br/><br/>Thank you.<br/><br/>Bestest of Regards,<br/>Fuck you.";

        //4. Get User email
        Optional<User> owner = userRepository.findById(formResponseToReject.getOwnerId());
        String ownerEmail = owner.get().getEmailAddress();

        //3. Create Email object
        Email rejectionEmail = new Email(ownerEmail, rejectionSubject, rejectionBody);
        //4. Send the Email
        
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8080/api/v1/email/sendMail";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Email> request = new HttpEntity<>(rejectionEmail, headers);
        ResponseEntity<?> response = restTemplate.postForEntity(url, request, Object.class);
        if (response.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR){
            throw new Exception("Error sending email");
        }
    }

    public ResponseEntity<StatusResponse> deleteFormFromVendor(int formId) {
        try{
            Optional<FormResponse> optionalForm = formResponseRepository.findById(formId);
            if (optionalForm.isPresent()){
                formResponseRepository.deleteById(formId);
            }
            return ResponseEntity.ok().body(
                    new StatusResponse("Success", HttpStatus.OK.value()));
        } catch (Exception e) {
            return ResponseEntity.ok().body(
                    new StatusResponse("Error deleting form response: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
}
