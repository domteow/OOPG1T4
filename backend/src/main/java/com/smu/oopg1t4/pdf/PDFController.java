package com.smu.oopg1t4.pdf;

import com.lowagie.text.DocumentException;
import com.smu.oopg1t4.form.FormRepository;
import com.smu.oopg1t4.form.FormService;
import com.smu.oopg1t4.questionnaire.QuestionnaireService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping(path = "api/v1/pdf")
public class PDFController {

    private final PDFGenerator pdfGenerator;
    private final FormRepository formRepository;

    @Autowired
    public PDFController(
            PDFGenerator pdfGenerator,
            FormRepository formRepository
    ) {
        this.pdfGenerator = pdfGenerator;
        this.formRepository = formRepository;
    }
    @GetMapping("/generatePDF/{id}")
    public void generatePDF(@PathVariable int id, HttpServletResponse response) throws DocumentException, IOException{
        response.setContentType("application/pdf");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd:hh:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=pdf_" + currentDateTime + ".pdf";
        response.setHeader(headerKey, headerValue);

        pdfGenerator.export(id, response);
    }
}
