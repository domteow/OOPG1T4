package com.smu.oopg1t4.questionnaire;

import com.smu.oopg1t4.field.Field;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;


@Document(collection = "questionnaire")
public class Questionnaire {

    @Transient
    public static final String SEQUENCE_NAME = "questionnaire_sequence";

    @Id
    private int id;
    private String name;
    private ArrayList<Field<String[]>> fields;
    private String roleRequired;
    public Questionnaire(int id, String name, ArrayList<Field<String[]>> fields, String roleRequired){
        this.id = id;
        this.name = name;
        this.fields = fields;
        this.roleRequired = roleRequired;
    }
    public int getID(){
        return this.id;
    }
    public void setID(int i){
        this.id = i;
    }
    public String getName(){
        return this.name;
    }
    public void setName(String s){
        this.name = s;
    }
    public ArrayList<Field<String[]>> getFields(){
        return this.fields;
    }
    public void addField(Field<String[]> f){
        this.fields.add(f);
    }
    public void removeField(Field<String[]> f){
        this.fields.remove(f);
    }
}
