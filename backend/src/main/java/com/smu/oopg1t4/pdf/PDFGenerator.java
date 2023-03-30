package com.smu.oopg1t4.pdf;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.lowagie.text.*;
import com.smu.oopg1t4.field.Field;
import com.smu.oopg1t4.formresponse.FormResponseRepository;
import com.smu.oopg1t4.questionnaire.Questionnaire;
import jakarta.servlet.http.HttpServletResponse;
import com.lowagie.text.pdf.CMYKColor;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.smu.oopg1t4.formresponse.FormResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PDFGenerator {

    private final FormResponseRepository formResponseRepository;

    @Autowired
    public PDFGenerator(
            FormResponseRepository formResponseRepository
    ) {
        this.formResponseRepository = formResponseRepository;

    }
    public void export(int id, HttpServletResponse response) throws DocumentException, IOException {

        Optional<FormResponse> optionalForm = formResponseRepository.findById(id);
        FormResponse form = optionalForm.get();
        // Creating the Object of Document
        Document document = new Document();
        // Getting instance of PdfWriter
        PdfWriter.getInstance(document, response.getOutputStream());
        // Opening the created document to change it
        document.open();

        // Add logo
        Image png = Image.getInstance("backend\\src\\main\\java\\com\\smu\\oopg1t4\\pdf\\image.png");
        png.setAlignment(Paragraph.ALIGN_CENTER);

        document.add(png);
        // Creating font
        // Setting font style and size
        Font fontTitle = FontFactory.getFont(FontFactory.TIMES_BOLD);
        fontTitle.setSize(18);
        fontTitle.setStyle("underline");

        Font fontBody = FontFactory.getFont(FontFactory.TIMES_ROMAN);
        fontBody.setSize(13);

        Font fontBodyBold = FontFactory.getFont(FontFactory.TIMES_BOLD);
        fontBody.setSize(13);

        Font fontHeader = FontFactory.getFont(FontFactory.TIMES_BOLD);
        fontHeader.setSize(13);
        fontHeader.setStyle("underline");


        Font fontAnswer = FontFactory.getFont(FontFactory.TIMES_ROMAN);
        fontAnswer.setSize(13);

        // Creating paragraph
        Paragraph paragraph1 = new Paragraph(form.getDescription() + "\n", fontTitle);
        Paragraph paragraph2 = new Paragraph("Form No: " + form.getFormCode() + "   |   Rev. No: " + form.getRevisionNo() + "   |   Effective Date: " + form.getEffectiveDate() + "\n\n", fontBodyBold);

        // Aligning the paragraph in the document
        paragraph1.setAlignment(Paragraph.ALIGN_CENTER);
        paragraph2.setAlignment(Paragraph.ALIGN_CENTER);

        // Adding the created paragraph in the document
        document.add(paragraph1);
        document.add(paragraph2);


        for (Questionnaire questionnaire: form.getQuestionnaires()){
            Paragraph tempParagraph = new Paragraph("",fontBody);
            tempParagraph.setKeepTogether(true);
            tempParagraph.add(new Phrase(questionnaire.getName() + "\n", fontHeader));
            for (Field field: questionnaire.getFields()){
                if (field.getType().equals("header") || field.getType().equals("subheader")){
                    tempParagraph.add(new Phrase( " \n" + field.getName() + "\n", fontHeader));
                } else if (field.getType().equals("subtext")) {
                    tempParagraph.add(new Phrase(field.getName() + "\n", fontBody));
                }
                else {
                    tempParagraph.add(new Phrase(field.getName() + ":\n", fontBodyBold));
                    tempParagraph.add(new Phrase(field.getValue() + "\n", fontAnswer));
                }
            }
            tempParagraph.add(new Phrase("\n"));

            document.add(tempParagraph);
        }


        // Closing the document
        document.close();
    }
}
