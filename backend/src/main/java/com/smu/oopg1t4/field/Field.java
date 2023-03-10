package com.smu.oopg1t4.field;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "field")
public class Field<T> {
    @Transient
    public static final String SEQUENCE_NAME = "field_sequence";

    @Id
    private int id;
    private String name;
    private T value;
    private String type;

    public Field(){

    }

    public Field(String name, String type){
        this.name = name;
        this.type = type;
    }

    public Field(int id, String name, String type){
        this.id = id;
        this.name = name;
        this.type = type;
    }

    public Field(String name, T value, String type){
        this.name = name;
        this.value = value;
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
