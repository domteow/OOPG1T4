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

export default function DisplayNotice(){
    const formId = useParams().formId;
    const [form, setForm] = useState({});
    const [questionnaire, setQuestionnaire] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getAllForms = async() =>{
            try{
                const response = await axios.get("/api/v1/form/get/id/" + formId)
                console.log([response.data.data]);
                setForm(response.data.data);
                setQuestionnaire(response.data.data.questionnaires)
                
            }
            catch(error){
                console.log(error);
            }
        }
        getAllForms();
    }, []); 

    const handleCancelForm = () => {
        navigate(-1);
    }

    console.log(questionnaire);

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

                {questionnaire.map((questionnaire) => {
                    const fields = questionnaire.fields;
                    console.log(fields);
                    return(
                        fields.map((field) => {
                            console.log(field);
                            const type = field.type;
                            const name = field.name;
                            console.log(type);
                            console.log(name); 
                            if (type == 'header'){
                                console.log("IT CONSOLE HEADER")
                                return(
                                    <>
                                        <Row className='formRow'>
                                            <div className='headertext'>
                                                {name}
                                            </div>
                                        </Row>
                                    </>
                                )
                            }

                            else if (type == 'subheader'){
                                return(
                                    <>
                                        <Row className='formRow'>
                                            <div className='displaySubheader'>
                                            {name}
                                            </div>
                                        </Row>
                                    </>
                                )
                            }

                            else if (type == 'subtext'){
                                return(
                                    <>
                                        <Row className='formRow'>
                                            <div className='subtext'>
                                                {name}
                                            </div>
                                        </Row>
                                    </>
                                )
                            }

                            else if (type == 'text'){
                                return(
                                    <>
                                        <Row className='formRow'>
                                            <div className='textnotice'>
                                                {name}
                                            </div>
                                        </Row>
                                    </>
                                )
                            }

                        })
                    )
                })}

                <div className='buttonFormRow'>
                    <button onClick={handleCancelForm} className='cancelFormButton'>
                        Cancel
                    </button>
                </div>
            </Container>
        </>
    )
    
}