import React, {Component, useLayoutEffect} from 'react'
import { useState, useEffect, useMemo } from 'react'
import axios from '../../api/axios'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate, useParams } from 'react-router-dom'
import '../../index.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
import Dialogue from './dialogue';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { get } from 'react-hook-form'

export default function ViewForm(props){
    const formId  = useParams()['formId'];
    console.log(formId);
    const navigate = useNavigate();

    const [form, setForm] = useState({});
    const [questionnaires, setQuestionnaires] = useState([]);

    console.log(form);

    useEffect(() => {
        const getAllForms = async() =>{
            try{
                const response = await axios.get("/api/v1/form/get/id/" + formId)
                console.log([response.data.data]);
                setForm(response.data.data);
                setQuestionnaires(response.data.data.questionnaires)
            }
            catch(error){
                console.log(error);
            }
        }
        getAllForms();
    }, [formId]);

    console.log(form);
    console.log(questionnaires);

    const handleCancelForm = () => {
        navigate(-1);
    }

    
    return(
        <>
            <Navbar />

            <Container className='formPage'>
                <Row className='formDetailsRow'>
                    <Col className='formName'>
                        {form['description']}
                    </Col>

                    <Col className='formDeets'>
                        <div>
                            {form['formCode']}
                        </div>
                        <div>
                            {form['effectiveDate']}
                        </div>
                    </Col>
                </Row>

                <form>
                    {Object.values(questionnaires).map((questionnaire) => {
                        console.log(questionnaire)
                        const fields = questionnaire.fields; 
                        return (
                            <>
                            <Row className='formRow'>
                                <div className='displayquestionnairename'>
                                    {questionnaire.name}
                                </div>
                            </Row>

                            {fields.map((field)=>{
                                const fieldType = field.type; 
                                console.log(fieldType);
                                const fieldOptions = field.options;
                                console.log(fieldOptions);
                                if (fieldType === 'text' || fieldType === 'Text Field'){
                                    
                                    return(
                                        <fieldset>
                                            <Row className='radioQuestion'>
                                                    {field.name}
                                            </Row>
                                            <Row className='radioFormInput'>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            required
                                                            id={field.id}
                                                            name={field.name}
                                                            type={fieldType}
                                                            value={field.value}
                                                            disabled={true}
                                                        />
                                                    </FormControl>
                                            </Row>
                                        </fieldset>
                                    )
                                }

                                else if (fieldType === 'select' || fieldType === 'Select'){
                                    return (
                                        <fieldset>
                                            <Row className='radioQuestion'>
                                                {field.name}
                                            </Row>
                                            <Row className='radioFormInput'>
                                                    <FormGroup>
                                                        
                                                        <div>
                                                            <select required id={field.name} className='selectclass' name={field.name} >
                                                            {fieldOptions.map((selection, idx) =>{
                                                                return (
                                                                <option key={idx} value={selection}>
                                                                    {selection}
                                                                </option>
                                                                )
                                                            })}
                                                            </select>
                                                        </div>
                                                    </FormGroup>
                                            </Row>
                                        </fieldset>
                                    )
                                }

                                else if (fieldType === 'subheader' || fieldType === 'Sub Header'){
                                    return(
                                        <>
                                            <Row className='formRow'>
                                                <div className='displaySubheader'>
                                                    {field.name}
                                                </div>
                                            </Row>
                                        </>
                                    )
                                }

                                else if (fieldType == 'subtext' || fieldType === 'Subtext'){
                                    return(
                                        <>
                                            <Row className='formRow'>
                                                <div className='subtext'>
                                                    {field.name}
                                                </div>
                                            </Row>
                                        </>
                                    )
                                }

                                else if (fieldType == 'header' || fieldType === 'Header'){
                                    return (
                                        <>
                                            <Row className='formRow'>
                                                <div className='headertext'>
                                                    {field.name}
                                                </div>
                                            </Row>
                                        </>
                                    )
                                }

                                else if (fieldType === 'radio' || fieldType === 'Radio'){
                                    return(
                                        <fieldset>
                                            <Row className='radioQuestion'>
                                                {field.name}
                                            </Row>
                                            <Row className='radioFormInput'>
                                                    <RadioGroup
                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                        name={field.name}
                                                        disabled={true}
                                                    >
                                                        {fieldOptions.map(option =>{
                                                            return(
                                                                <FormControlLabel value={option} control={<Radio />} label={option} />
                                                            )
                                                        })}
                                                    </RadioGroup>
                                            </Row>
                                        </fieldset>
                                    )
                                }

                                else if (fieldType === 'checkbox' || fieldType === 'Checkbox'){
                                    return(
                                        <fieldset>
                                            <Row className='radioQuestion'>
                                                {field.name}
                                            </Row>
                                            <Row className='radioFormInput'>
                                                <Col xs={12} md={5} className='formInput'>
                                                    <FormGroup>
                                                    {Object.keys(fieldOptions).map((option) => {
                                                        const val = fieldOptions[option];
                                                        return(
                                                            <div>
                                                                <FormControlLabel disabled={true} control={<Checkbox checked={false} />} type='checkbox' id={val} name={field.name} required value = {val} label = {val}/>
                                                            </div>
                                                        )
                                                    })}
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </fieldset>
                                    )
                                }
                            })
                        }
                        </>)
                    })}
                </form>

                <div className='buttonFormRow'>
                    <button onClick={handleCancelForm} className='cancelFormButton'>
                        Cancel
                    </button>
                </div>

            </Container>
        </>
    )

}