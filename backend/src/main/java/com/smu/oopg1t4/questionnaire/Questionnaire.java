package com.smu.oopg1t4.questionnaire;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.smu.oopg1t4.field.Field;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@AllArgsConstructor
@Document(collection = "questionnaire")
public class Questionnaire {

    @Transient
    public static final String SEQUENCE_NAME = "questionnaire_sequence";

    @Id
    private int id;
    private String name;
    private ArrayList<Field> fields;
    private String roleRequired;

    private boolean complete;


    public Questionnaire() {
    }

    public Questionnaire(String name, ArrayList<Field> fields, String roleRequired) {
        this.name = name;
        this.fields = fields;
        this.roleRequired = roleRequired;
    }

    public Questionnaire(String name, ArrayList<Field> fields, String roleRequired, boolean complete) {
        this(name, fields, roleRequired);
        this.complete = complete;
    }



    public int getId() {
        return this.id;
    }

    public void setId(int i) {
        this.id = i;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String s) {
        this.name = s;
    }

    public ArrayList<Field> getFields() {
        return this.fields;
    }

    public void addField(Field f) {
        this.fields.add(f);
    }

    public void removeField(Field f) {
        this.fields.remove(f);
    }

    public String getRoleRequired() {
        return roleRequired;
    }

    public void setRoleRequired(String roleRequired) {
        this.roleRequired = roleRequired;
    }

    public boolean getComplete() {
        return complete;
    }

    public void setComplete(boolean complete) {
        this.complete = complete;
    }



    @Override
    public String toString() {
        return "Questionnaire{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", fields=" + fields +
                ", roleRequired='" + roleRequired + '\'' +
                ", complete='" + complete + '\'' +
                '}';
    }
}
