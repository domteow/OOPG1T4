import React from 'react'
import { useState, useEffect } from 'react'
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
import CreateQuestionnaire from './createquestionnaire';
import DisplayQuestionnaire from './displayquestionnaire';
import RadioButton from './radiobutton';
import Select from './select';

export default function Newform(){
    const formId  = useParams()['formId'];
    console.log(formId);
    const [formName, setFormName] = useState("");
    const [formCode, setFormCode] = useState("");
    const [effectiveDate, setEffectiveDate] = useState("");
    const [form, setForm] = useState({});
    const [questionnaires, setQuestionnaires] = useState([]);
    const [newForm, setNewForm] = useState([]);

    const handleFormName = (e) => {
        setFormName(e.target.value);
    }

    const handleFormCode = (e) => {
        setFormCode(e.target.value);
    }

    const handleEffectiveDate = (e) => {
        setEffectiveDate(e.target.value);
    }

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

    const formDetails = (data, index) => {
        const newFormDetails = questionnaires.map((item, i) => {
            if (index === i){
                return data;
            }

            else{
                return item;
            }
        });
    }

    return(
        <>
            <Navbar />
            
            <div>
                <div className = 'standardInputForm'>
                    <FormControl fullWidth>
                        <Container>
                            <Row>
                                <Col xs={6} md={2} xl={2} className='formQuestion'>
                                    Form Name:
                                </Col>
                                <Col  xs={12} md={10} className='formInput'>
                                    <TextField
                                        required
                                        id="formName"
                                        name="formName"
                                        onChange={handleFormName}
                                        type='text'
                                        sx={{width: '100%'}}
                                        value={form.description}
                                    />
                                </Col>
                            </Row>

                            <Row className="newFormRow" >
                                <Col xs={6} md={2} xl={2} className='formQuestion'>
                                    Form Code:
                                </Col>
                                <Col  xs={12} md={6} xl = {6} className='formInput'>
                                    <TextField
                                        required
                                        id="formCode"
                                        name="formCode"
                                        onChange={handleFormCode}
                                        type='text'
                                        value = {form.formCode}
                                        sx={{width: '100%'}}
                                    />
                                </Col>
                                <Col xs={6} md={2} xl={2} className='formQuestion'>
                                    Effective Date:
                                </Col>
                                <Col  xs={6} md={2} xl = {2} className='formInput'>
                                    <TextField
                                        required
                                        id="effectiveDate"
                                        name="effectiveDate"
                                        value = {form.effectiveDate}
                                        onChange={handleEffectiveDate}
                                        type='date'
                                        sx={{width: '100%'}}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </FormControl>
                    {questionnaires.map((questionnaire, index) =>{
                        return(
                            <DisplayQuestionnaire value={questionnaire} id={index} formDetails={formDetails} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}