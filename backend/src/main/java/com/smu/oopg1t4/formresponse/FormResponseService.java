package com.smu.oopg1t4.formresponse;

import com.smu.oopg1t4.exceptions.FormNotEditableException;
import com.smu.oopg1t4.exceptions.FormNotFoundException;
import com.smu.oopg1t4.exceptions.FormResponseNotFoundException;
import com.smu.oopg1t4.form.Form;
import com.smu.oopg1t4.form.FormRepository;
import com.smu.oopg1t4.form.FormService;
import com.smu.oopg1t4.questionnaire.Questionnaire;
import com.smu.oopg1t4.questionnaire.QuestionnaireService;
import com.smu.oopg1t4.response.StatusResponse;
import com.smu.oopg1t4.response.SuccessResponse;
import com.smu.oopg1t4.util.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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

    @Autowired
    public FormResponseService(
            FormResponseRepository formResponseRepository,
            SequenceGeneratorService sequenceGeneratorService,
            QuestionnaireService questionnaireService,
            FormRepository formRepository,
            FormService formService
    ) {
        this.formResponseRepository = formResponseRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
        this.questionnaireService = questionnaireService;
        this.formRepository = formRepository;
        this.formService = formService;
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
                    "incomplete",
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

    public ResponseEntity<StatusResponse> rejectFormResponse(int formId) {
        //reset entire form response to default (restart form response from the beginning)
        try{
            Optional<FormResponse> formResponseToReject = formResponseRepository.findById(formId);
            if (formResponseToReject.isPresent()){
                rejectFormResponse(formResponseToReject.get());
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
            StatusResponse statusResponse = new StatusResponse("Error rejecting form response: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(statusResponse);
        }
    }

    private void rejectFormResponse(FormResponse formResponseToReject) throws FormNotFoundException {
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
