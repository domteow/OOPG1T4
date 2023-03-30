package com.smu.oopg1t4.field;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "field")
public class Field<T> {
    @Transient
    public static final String SEQUENCE_NAME = "field_sequence";

    @Id
    private int id;
    private String name;
    private T value;
    private String type;
    //For radio and checkbox
    private List<String> options;
    private boolean others;

    public Field(){

    }

    //For Text
    public Field(String name, String type){
        this.name = name;
        this.type = type;
    }
    //For Text with id
    public Field(int id, String name, String type){
        this(name, type);
        this.id = id;
    }

    //For Text with value
    public Field(String name, T value, String type){
        this(name, type);
        this.value = value;
    }

    //For Text with id,value
    public Field(int id, String name, T value, String type){
        this(name, value, type);
        this.id = id;
    }

    //For Form Response Radio/Checkbox
    public Field(String name, String type, List<String> options, boolean others){
        this.name = name;
        this.type = type;
        this.options = options;
        this.others = others;
    }
    //For Form Response Radio/Checkbox with id
    public Field(int id, String name, String type, List<String> options, boolean others){
        this(name, type, options, others);
        this.id = id;
    }

    //For Form Response Radio/Checkbox with value
    public Field(String name, T value, String type, List<String> options, boolean others){
        this(name, type, options, others);
        this.value = value;
    }

    //For Form Response Radio/Checkbox with id, value
    public Field(int id, String name, T value, String type, List<String> options, boolean others){
        this(name, value, type, options, others);
        this.id = id;
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

    public List<?> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }
}
