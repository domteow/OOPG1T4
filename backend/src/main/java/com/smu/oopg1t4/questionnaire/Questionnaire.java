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
    private ArrayList<Field> fields;
    private String roleRequired;

    public Questionnaire() {
    }

    public Questionnaire(String name, ArrayList<Field> fields, String roleRequired) {
        this.name = name;
        this.fields = fields;
        this.roleRequired = roleRequired;
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

    @Override
    public String toString() {
        return "Questionnaire{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", fields=" + fields +
                ", roleRequired='" + roleRequired + '\'' +
                '}';
    }
}
