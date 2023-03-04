import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Route, Routes, BrowserRouter, useLocation, useParams } from 'react-router-dom'
import logo from '../assets/quantum.jpg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavbarVendor from '../navbarvendor'


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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (e.target.type == 'checkbox'){
            setValues({
                ...values,
                [name]: [...value],
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

    return (
        <>
            <NavbarVendor />

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
                            return(
                                <fieldset>
                                    <Row className='formRow'>
                                        <Col xs={6} md={4} xl={2} className='formQuestion'>
                                            {question}
                                        </Col>
                                        <Col xs={12} md={8} className='formInput'>
                                            <input name={question} className='inputtext' type={inputType} id={question} onChange={handleChange} />
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
                                return (
                                    <fieldset>
                                        <Row className='formRow'>
                                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                                {question}
                                            </Col>
                                            <Col xs={12} md={8} className='formInput'>
                                                {multiOptions.map(option =>{
                                                    return(
                                                        <div>
                                                            <input type={typeMultiSelect} id={option} name={question} value = {option} onChange={handleChange}/> 
                                                            <span className='formOptionText'>{option}</span>
                                                        </div>
                                                    )
                                                })}
                                            </Col>
                                        </Row>
                                    </fieldset>
                                )
                            }
                            else{
                                return (
                                    <fieldset>
                                        <Row className='formRow'>
                                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                                {question}
                                            </Col>
                                            <Col xs={12} md={8} className='formInput'>
                                                {multiOptions.map(option =>{
                                                    return(
                                                        <div>
                                                            <input type={typeMultiSelect} id={option} name={question} value = {option} onChange={handleChange}/> 
                                                            <span className='formOptionText'>{option}</span>
                                                        </div>
                                                    )
                                                })}
                                            </Col>
                                        </Row>
                                    </fieldset>
                                )
                            }
                        }
                    }
                    )}
                    <Row className='formRow'>
                        <Col>
                            <button className='submitButt' onClick={submit}>Submit</button>
                        </Col>
                    </Row>
                    {/* <button type="reset" onClick={reset}>Reset</button> */}
                </form>

            </Container>
        </>)
}