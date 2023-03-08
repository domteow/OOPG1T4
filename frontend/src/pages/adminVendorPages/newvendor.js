import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../../index.css'
import logo from '../../assets/quantum.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../navbar'
import TextField from '@mui/material/TextField';



export default function NewVendor(){
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        name:{
            error: false,
            errorMessage: 'You must enter a name'
        }, 
        company:{
            error: false,
            errorMessage: 'You must enter a company'
        },
        email:{
            error: false,
            errorMessage: 'You must enter an email address'
        },
        password:{
            error: false,
            errorMessage: 'You must enter a password'
        },
        cfmPassword:{
            error: false,
            errorMessage: 'Passwords do not match'
        }
    })

    const initialValues ={
        vendorName: '',
        vendorEmail: '',
        vendorCompany: '',
        vendorPwd: '', 
        vendorCfmPwd: '', 
        error: false,
    }
    const [values, setValues] = useState(initialValues);

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

    const handleSubmit = (e) =>{
        e.preventDefault();

        const formFields = Object.keys(values);
        let newFormValues = {...values};

        for (let index = 0; index<formFields.length; index++){
            const currentField = formFields[index];
            const currentValue = values[currentField];
            
            
        }

        setFormValues(newFormValues)

    }

    

    // to save the vendor 
    const addVendor = () => {
        console.log(values);
        alert(JSON.stringify(values));
    }
    console.log(values);

    const cancel = () =>{
        navigate(-1);
    }

    return(
        <>
            <Navbar />

            <div className='newVendorContent'>
                <div className='subDividerForm'>
                    New Vendor
                </div>
                <form onSubmit={handleSubmit}>
                    <fieldset className='newVendorForm'>
                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Name:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <input name='vendorName' className='inputtext' type='text' onChange={handleChange} />
                            </Col>
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Company:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <input name='vendorCompany' className='inputtext' type='text' onChange={handleChange} />
                            </Col>
                        </Row>
                        
                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Email:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <input name='vendorEmail' className='inputtext' type='email' onChange={handleChange} />
                            </Col>
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Password:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <input name='vendorPwd' className='inputtext' type='text' onChange={handleChange} />
                            </Col>
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Confirm Password:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <input name='vendorCfmPwd'className='inputtext' type='text' onChange={handleChange} />
                            </Col>
                        </Row>
                    </fieldset>
                    <Row className='formRow'>
                        <Col>
                            <button className='cancelButton' onClick={cancel}>Cancel</button>
                        </Col>
                        <Col>
                            <button className='cfmVendorButton' type='submit'>Add Vendor</button>
                        </Col>
                    </Row>
                </form>
            </div>
        </>
    )
}