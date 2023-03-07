import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Route, Routes, BrowserRouter, useLocation, useParams, useNavigate } from 'react-router-dom'
import logo from '../assets/quantum.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../navbar'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';


export default function Formpage(props) {
    // add code to get the form from backend using form id 
    const formID  = useParams();
    const myForm = {
        'formNo' : 143253, 
        'formName' : 'intro questions',
        'questions':{
            'Name:' : 'text',
            'Age:' : 'number', 
            'Gender:' : ['radio', 'male', 'female'],
            'idk bro:' : ['checkbox', 'cbox1', 'cbox2']
        }
    }
    const questions = myForm['questions'];

    // to create useState values
    const initialValues = {};
    for (let key in questions){
        if (questions[key][0] == 'checkbox'){
            console.log(key);
            initialValues[key] = [];
        }
        else{
            initialValues[key] = '';
        }
    }
    console.log(initialValues);
    const [values, setValues] = useState(initialValues);

    // to save use state values 
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (e.target.type == 'checkbox'){
            const isChecked = e.target.checked;
            setValues({
                ...values,
                [name]: isChecked ? [...values[name], value] : values[name].filter((item) => item !== value),
            });
        }
        else{
            setValues({
                ...values,
                [name]: value,
            });
        }
                
    };

    // to submit the form 
    const submit = () => {
        console.log(values);
        alert(JSON.stringify(values));
    }
    console.log(values);

    // to navigate
    const navigate = useNavigate();
    const cancel = () =>{
        navigate(-1);
    }

    return (
        <>
            <Navbar />

            <Container className='formPage'>
                <Row className='formDetailsRow'>
                    <Col className='formName'>
                        {myForm['formName']}
                    </Col>

                    <Col className='formDeets'>
                        <div>
                            {myForm['formNo']}
                        </div>
                        <div>
                            Date
                        </div>
                    </Col>
                </Row>
            

                <form>
                    {Object.keys(questions).map((question, qnIndex)=>{
                        const inputType = questions[question];

                        if (typeof(inputType) == 'string'){
                            // for input type string, number, text all 
                            return(
                                <fieldset>
                                    <Row className='formRow'>
                                        <Col xs={6} md={4} xl={2} className='formQuestion'>
                                            {question}
                                        </Col>
                                        <Col xs={12} md={8} className='formInput'> 
                                            <FormControl fullWidth>
                                                <TextField
                                                    required
                                                    id={question}
                                                    name={question}
                                                    onChange={handleChange}
                                                    type={inputType}
                                                />
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </fieldset>
                            )
                        }
                        else{
                            const typeMultiSelect = inputType[0];
                            const multiOptions = inputType.slice();
                            multiOptions.splice(0,1);

                            if (typeMultiSelect == 'radio'){
                                // for input type radio 
                                return (
                                    <fieldset>
                                        <Row className='formRow'>
                                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                                {question}
                                            </Col>
                                            <Col xs={12} md={8} className='formInput'>
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name={question}
                                                    onChange={handleChange}
                                                >
                                                    {multiOptions.map(option =>{
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
                            else if (typeMultiSelect == 'checkbox') {
                                // for input type checkbox 
                                return (
                                    <fieldset>
                                        <Row className='formRow'>
                                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                                {question}
                                            </Col>
                                            <Col xs={12} md={8} className='formInput'>
                                                <FormGroup>
                                                {multiOptions.map(option =>{
                                                    return(
                                                        <div>
                                                            <FormControlLabel control={<Checkbox />} type={typeMultiSelect} id={option} name={question} value = {option} onChange={handleChange} label = {option}/>
                                                            {/* <input type={typeMultiSelect} id={option} name={question} value = {option} onChange={handleChange}/>  */}
                                                        </div>
                                                    )
                                                })}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </fieldset>
                                )
                            }
                        }
                    }
                    )}
                    <Row className='buttonRow'>
                        <Col className='formCancelRow'>
                            <button className='cancelButt' onClick={cancel}>Cancel</button>                           
                        </Col>
                        <Col className='formSubmitRow'>
                            <button className='saveDraft' onClick={submit}>Save Draft</button>
                            <button className='submitButt' onClick={submit}>Submit</button>
                        </Col>
                    </Row>
                    {/* <button type="reset" onClick={reset}>Reset</button> */}
                </form>
            </Container>
        </>)
}