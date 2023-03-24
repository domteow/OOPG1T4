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
                        return fields.map((field)=>{
                            const fieldType = field.type; 
                            console.log(fieldType);
                            const fieldOptions = field.options;
                            if (fieldType === 'text'){
                                
                                return(
                                    <fieldset>
                                        <Row className='formRow'>
                                            <Col xs={6} md={2} xl={2} className='formQuestion'>
                                                {field.name}
                                            </Col>
                                            <Col xs={12} md={10} className='formInput'> 
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
                                            </Col>
                                        </Row>
                                    </fieldset>
                                )
                            }

                            else if (fieldType === 'select'){
                                return (
                                    <fieldset>
                                        <Row className='formRow'>
                                            <Col xs={6} md={2} xl={2} className='formQuestion'>
                                            {field.name}
                                            </Col>
                                            <Col xs={12} md={10} className='formInput'>
                                                <FormGroup>
                                                    <div>
                                                        <select id={field.name} name={field.name} >
                                                        {fieldOptions.map(selection =>{
                                                            return (
                                                            <option key={selection.value} value={selection.value}>
                                                                {selection.label}
                                                            </option>
                                                            )
                                                        })}
                                                        </select>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </fieldset>
                                )
                            }

                            else if (fieldType === 'subheader'){
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

                            else if (fieldType == 'subtext'){
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

                            else if (fieldType == 'header'){
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

                            else if (fieldType === 'radio'){
                                return(
                                    <fieldset>
                                        <Row className='formRow'>
                                            <Col xs={6} md={2} xl={2} className='formQuestion'>
                                            {field.name}
                                            </Col>
                                            <Col xs={12} md={10} className='formInput'>
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
                                                
                                                
                                            </Col>
                                        </Row>
                                    </fieldset>
                                )
                            }

                            else if (fieldType === 'checkbox'){
                                return(
                                    <fieldset>
                                        <Row className='formRow'>
                                            <Col xs={6} md={2} xl={2} className='formQuestion'>
                                            {field.name}
                                            </Col>
                                            <Col xs={12} md={10} className='formInput'>
                                                <FormGroup>
                                                {fieldOptions.map(option =>{
                                                    return(
                                                        <div>
                                                            <FormControlLabel control={<Checkbox />}  id={option} name={field.name} value = {option} label = {option}/>
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