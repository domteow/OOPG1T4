package com.smu.oopg1t4.formresponse;


import com.smu.oopg1t4.questionnaire.QuestionnaireService;
import com.smu.oopg1t4.response.StatusResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.smu.oopg1t4.response.RejectionResponse;

@RestController
@RequestMapping(path = "api/v1/formResponse")
public class FormResponseController {
    private final FormResponseService formResponseService;
    private final QuestionnaireService questionnaireService;

    @Autowired
    public FormResponseController(
            FormResponseService formResponseService,
            QuestionnaireService questionnaireService
    ) {
        this.formResponseService = formResponseService;
        this.questionnaireService = questionnaireService;
    }

    @GetMapping("/getFormsByVendorId/{ownerId}")
    public ResponseEntity<?> getFormsByVendorId(@PathVariable int ownerId) {
        return formResponseService.getFormByVendorID(ownerId);
    }

    @GetMapping("/getFormByFormResponseID/{id}")
    public ResponseEntity<?> getFormByID(@PathVariable int id) {
        return formResponseService.getFormByFormResponseID(id);
    }

    @GetMapping("/assignFormToVendor/{formId}/{vendorId}")
    public ResponseEntity<StatusResponse> assignFormToVendor(@PathVariable int formId, @PathVariable int vendorId){
        return formResponseService.assignFormToVendor(formId, vendorId);
    }

    @PutMapping("/updateFormResponse/{formId}")
    public ResponseEntity<StatusResponse> updateFormResponseWithId(@PathVariable int formId, @RequestBody FormResponse updatedFormResponse){
        return formResponseService.updateFormResponse(formId, updatedFormResponse);
    }

    @PutMapping("/saveFormResponseAsDraft/{formId}")
    public ResponseEntity<StatusResponse> saveFormResponseAsDraft(@PathVariable int formId, @RequestBody FormResponse formResponseDraft){
        return formResponseService.saveFormResponseAsDraft(formId, formResponseDraft);
    }

    @PutMapping("/rejectFormResponse/{formId}")
    public ResponseEntity<StatusResponse> rejectFormResponse(@PathVariable int formId, @RequestBody RejectionResponse rejectionResponse){
        return formResponseService.rejectFormResponse(formId, rejectionResponse);
    }

    @DeleteMapping("deleteFormFromVendor/{formId}")
    public ResponseEntity<StatusResponse> deleteFormFromVendor(@PathVariable int formId){
        return formResponseService.deleteFormFromVendor(formId);
    }


}
