import React from 'react'
import axios from '../../api/axios'
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
    const [pwdError, setPwdError] = useState(null);
    const [cfmPwdError, setCfmPwdError] = useState(null);
    const [storePwd, setStorePwd] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const [faxError, setFaxError] = useState(null);

    const validatePwd = (pwd, pwd2) => {
        if (pwd.length >= 8){
            if (pwd === pwd2){
                return true;
            }
            else{
                setPwdError('Passwords do not match')
                setCfmPwdError('Passwords do not match')
            }
        }
        else{
            setPwdError('Passwords need to be at least 8 characters long')
            setCfmPwdError('Passwords  need to be at least 8 characters long')
        }
    }

    const[values, setValues] = useState({
        accountType : 'Vendor',
    });

    const handleChange = (e) => {
        const {name, value} = e.target; 
        if (name === 'countries'){
            setValues({
                ...values, 
                [name]: value.split(',')
            })
        }
        else{
            setValues({
                ...values, 
                [name]: value
            })
        }
    }

    const handlePassword = (e) =>{
        setStorePwd(e.target.value);
    }

    const validateEmail = (email) => {
        if(/\S+@\S+\.\S+/.test(email)){
            return true;
        }
        else{
            setEmailError('Email is not valid');
        }
    }

    const validatePhone = (phone) => {
        if (phone[0] === '8' || phone[0] === '9') {
            if (phone.length === 8){
                if (/^[0-9]+$/.test(phone)){
                    return true;
                }
            }
        }
        else{
            setPhoneError("Please enter a valid phone number")
        }
    }

    const validateFax = (phone) => {
        if (phone.length >= 8){
            if (/^[0-9]+$/.test(phone)){
                return true;
            }
        }
        
        else{
            setFaxError("Please enter a valid fax number")
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values);
        setPhoneError(null);
        setFaxError(null);
        setPwdError(null);
        setEmailError(null);
        setCfmPwdError(null);
        const isPwdValid = validatePwd(values.password, storePwd);
        const isEmail = validateEmail(values.emailAddress);
        const isPhone = validatePhone(values.phoneNumber);
        const isFax = validateFax(values.faxNumber);
        
        if (isPwdValid && isEmail && isPhone && isFax) {
            addVendor();            
        }
    }

    const addVendor = async() => {
        console.log(values);
        
        try {
            const response = await axios.post('/api/v1/vendor/createVendor', values);
            console.log(response.data);
            if (response.data.status == 201) {
                navigate('../react/admin/homepage')
                alert('Vendor added successfully')
            }
        }
        catch (error){
            console.log(error);
        }
    }
    
    // console.log(values);

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
                                <TextField required name='name' className='inputtext' type='text' onChange={handleChange}  />
                            </Col>
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Company Name:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='company' className='inputtext' type='text' onChange={handleChange} error={emailError !== null} />
                            </Col>
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Email Address:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='emailAddress' className='inputtext' type='text' onChange={handleChange} error={emailError !== null} />
                            </Col>
                            {emailError && <div className='errorMsg' >{emailError}</div>}
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Password:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='password' className='inputtext' type='text' onChange={handleChange} error={pwdError !== null} />
                            </Col>
                            {pwdError && <div className='errorMsg' >{pwdError}</div>}
                        </Row>
                        
                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Confirm Password:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='cfmPassword' className='inputtext' type='text' onChange={handlePassword} error={cfmPwdError !== null} />
                            </Col>
                            {cfmPwdError && <div className='errorMsg'>{cfmPwdError}</div>}
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Phone Number:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='phoneNumber' className='inputtext' type='text' onChange={handleChange} error={phoneError !== null} />
                            </Col>
                            {phoneError && <div className='errorMsg' >{phoneError}</div>}
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Fax Number:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='faxNumber' className='inputtext' type='text' onChange={handleChange} error={faxError !== null} />
                            </Col>
                            {faxError && <div className='errorMsg' >{faxError}</div>}
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Countries:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='countries' className='inputtext' type='text' onChange={handleChange}/>
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