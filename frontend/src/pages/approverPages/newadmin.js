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
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

export default function NewVendor(){
    const navigate = useNavigate();
    const [pwdError, setPwdError] = useState(null);
    const [cfmPwdError, setCfmPwdError] = useState(null);
    const [storePwd, setStorePwd] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const[values, setValues] = useState({
        accountType : 'Admin',
    });
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    const validateName = (name) => {
        if (name.length > 0){
            if (/^[A-Za-z\s]*$/.test(name)){
                console.log('hello')
                return true;
            }        
            else{
                setNameError("Please enter a valid name")
            }
        }
        else{
            setNameError("Please enter a valid name")
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values);
        setPwdError(null);
        setEmailError(null);
        setCfmPwdError(null);
        setNameError(null);
        const isPwdValid = validatePwd(values.password, storePwd);
        const isEmail = validateEmail(values.emailAddress);
        const isName = validateName(values.name);
        
        if (isPwdValid && isEmail && isName) {
            console.log('hello')
            addAdmin();            
        }
    }

    
    const addAdmin = async() => {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/v1/admin/createAdmin', values);
            console.log(response.data);
            setIsLoading(true);
            if (response.data.status == 201) {
                setIsLoading(false);
                localStorage.setItem('message', 'Admin added successfully!')
                navigate('/react/approver/homepage')
            }
        }
        catch (error){
            console.log(error);
            setOpen(true);
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); 
        }
    }

    const cancel = () =>{
        navigate(-1);
    }

    if (isLoading) {
        return (
            <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            }}> <CircularProgress /> Adding admin in progress... {console.log("loading state")}</div>
        );
    }

    return(
        <>
            <Navbar />

            <div className='newVendorContent'>
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                        <Alert
                        severity="error"
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        >
                        Error! Account with email address already exists. 
                        </Alert>
                    </Collapse>
                </Box>
                

                <div className='subDividerForm'>
                    New Admin
                </div>

                <form onSubmit={handleSubmit} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
                    <fieldset className='newVendorForm'>
                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Name:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='name' className='inputtext' placeholder="Name" type='text' onChange={handleChange} error={nameError !== null} />
                            </Col>
                            {nameError && <div className='errorMsg' >{nameError}</div>}
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Email Address:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='emailAddress' className='inputtext' placeholder="Email Address" type='text' onChange={handleChange} error={emailError !== null} />
                            </Col>
                            {emailError && <div className='errorMsg' >{emailError}</div>}
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Password:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='password' className='inputtext' placeholder="Password" type='text' onChange={handleChange} error={pwdError !== null} />
                            </Col>
                            {pwdError && <div className='errorMsg' >{pwdError}</div>}
                        </Row>
                        
                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Confirm Password:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='cfmPassword' className='inputtext' placeholder="Confirm Password" type='text' onChange={handlePassword} error={cfmPwdError !== null} />
                            </Col>
                            {cfmPwdError && <div className='errorMsg'>{cfmPwdError}</div>}
                        </Row>
                                        

                    </fieldset>
                    <Row className='formRow'>
                        <Col>
                            <button className='cancelButton' onClick={cancel}>Cancel</button>
                        </Col>
                        <Col>
                            <button className='cfmVendorButton' type='submit'>Add Admin</button>
                        </Col>
                    </Row>
                </form>
            </div>
        </>
    )
}
