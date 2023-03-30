import React from 'react'
import axios from '../api/axios'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate, useParams } from 'react-router-dom'
import '../index.css'
import logo from '../assets/quantum.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../navbar'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { set } from 'react-hook-form'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';


export default function Account(){
    const userId = useParams().userId;
    // const currName = localStorage.getItem('username');
    // const currEmail = localStorage.getItem('email');
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [newPwd, setNewPwd] = useState();
    const [cfmPwd, setCfmPwd] = useState();
    const [currPwd, setCurrPwd] = useState();
    const [emailError, setEmailError] = useState(null);
    const [currPwdError, setCurrPwdError] = useState(null);
    const [newPwdError, setNewPwdError] = useState(null);
    const [cfmPwdError, setCfmPwdError] = useState(null);
    const [disabledDetails, setDisabledDetails] = useState(true);
    const [disabledPwd, setDisabledPwd] = useState(true);
    const [user, setUser] = useState({});
    const [currName, setCurrName]= useState('');
    const [currEmail, setCurrEmail] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState({})
    const [open, setOpen] = React.useState(false);
    const [openMsg, setOpenMsg] = useState(false);
    const navigate = useNavigate();

    const getUserDetails = async() => {
        try{
            const response = await axios.get('/api/v1/user/getUserById/' + userId);
            setCurrName(response.data.data.name);
            setName(response.data.data.name);
            setCurrEmail(response.data.data.emailAddress);
            setEmail(response.data.data.emailAddress);
            setUser(response.data.data);
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, [])
    

    const onNameChange = (e) => {
        setName(e.target.value);
        if (e.target.value == currName && email == currEmail){
            setDisabledDetails(true);
        }
        else{
            setDisabledDetails(false);
        }
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value == currEmail && name == currName){
            setDisabledDetails(true);
        }
        else{
            setDisabledDetails(false);
        }
    }

    const onPwdChange = (e) => {
        setCurrPwd(e.target.value);
        if (e.target.value =='' && newPwd == null && cfmPwd == null ){
            setDisabledPwd(true);
        }
        else{
            setDisabledPwd(false);
        }
    }
    console.log(currPwd == null);

    const onNewPwdChange = (e) => {
        setNewPwd(e.target.value);
        if (e.target.value =='' && currPwd == null && cfmPwd == null ){
            setDisabledPwd(true);
        }
        else{
            setDisabledPwd(false);
        }
    }

    const onCfmPwd = (e) => {
        setCfmPwd(e.target.value);
        if (e.target.value =='' && currPwd == null && newPwd == null ){
            setDisabledPwd(true);
        }
        else{
            setDisabledPwd(false);
        }
    }

    const detailsData = {
        name: name,
        emailAddress: email, 
        id: parseInt(userId)
    }
    console.log(detailsData);

    const pwdData = {
        id: parseInt(userId),
        oldPassword: currPwd,
        newPassword: newPwd
    }

    const onHandleDetails = () => {
        console.log(email);
        console.log(validateEmail(email));
        const isEmail = validateEmail(email);
        const isName = (name.length >0);
        if (isEmail && isName) {
            console.log(detailsData);
            changeDetails();
        }
    }

    const onHandlePassword = () => {
        if (currPwd.length <8){
            setCurrPwdError('Password too short')
            setOpen(true);
        }
        else{
            const checkPwd = validatePwd(newPwd, cfmPwd);
            if (checkPwd){
                changePassword();
            }
            else{
                setOpen(true);
            }
        }
    }

    const validateEmail = (email) => {
        if(/\S+@\S+\.\S+/.test(email)){
            return true;
        }
        else{
            setEmailError('Email is not valid');
            setOpen(true);
        }
    }

    const validatePwd = (pwd, pwd2) => {
        if (pwd.length >= 8){
            if (pwd === pwd2){
                return true;
            }
            else{
                setNewPwdError('Passwords do not match')
                setCfmPwdError('Passwords do not match')
            }
        }
        else{
            setNewPwdError('Passwords need to be at least 8 characters long')
            setCfmPwdError('Passwords  need to be at least 8 characters long')
        }
    }

    const handleCloseDel = () => {
        navigate('/react/login');
      }

    const changeDetails = async() =>{
        try{
            const response = await axios.put('/api/v1/user/editUserDetails', pwdData);

            if (response.data.status == 200){
                console.log('hi');
                // setOpen(true);
                setOpenMsg(true);
                setDisabledDetails(true);
            }
        }

        catch (error){
            console.log(error);
            setOpen(true);
        }
    }

    const changePassword = async() =>{
        try{
            const response = await axios.put('/api/v1/user/changePassword', pwdData);

            if (response.data.status == 200){
                // setOpen(true);
                setOpenMsg(true);
                setDisabledDetails(true);
            }
        }

        catch (error){
            console.log(error);
            setOpen(true);
        }
    }

    const navLogin = () => {
        localStorage.clear('username');
        localStorage.setItem("authenticated", false);
        localStorage.clear('role');
        navigate ('/react/login')
    }




    return(
        <>
            <Navbar />

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
                        Error! Please try again. 
                        </Alert>
                    </Collapse>
                </Box>

            <div className='mainContent'>
                <div className='welcomeMsg'>
                    Account
                </div>
                <Container className='editDetailsContainer'>
                    <Row>
                        <Col md={5}>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='editDetialsHeader'>
                                            Edit Details
                                        </div>
                                    </Col>
                                </Row>
                                {Object.keys(user).map((fields, i) => {
                                    if (fields == 'name'){
                                        return(
                                            <Row>
                                                <Col>
                                                    <div className='editDetialsName'>
                                                        Name
                                                    </div>
                                                    <div className='editDetialsInput'>
                                                        <TextField required name='name' sx={{width:'100%'}} onChange={onNameChange} defaultValue={user.name} className='accountInput' placeholder="Name" type='text'/> 
                                                    </div>
                                                </Col>
                                            </Row>
                                            
                                        )
                                    }

                                    else if (fields =='emailAddress'){
                                        return(
                                            <Row>
                                                <Col>
                                                    <div className='editDetialsName'>
                                                        Email
                                                    </div>
                                                    <div className='editDetialsInput'>
                                                        <TextField required name='emailAddress' sx={{width:'100%'}} onChange={onEmailChange} defaultValue={user.emailAddress} className='accountInput' placeholder="Email Address" type='text'  error={emailError !== null}/> 
                                                        {emailError && <div className='errorMsg' >{emailError}</div>}
                                                    </div>
                                                </Col>
                                            </Row>
                                        )
                                    }
                                })}
                        
                                <div className='editDetailsButtonRow'>
                                    <button className='editDetailsButton' onClick={onHandleDetails} disabled={disabledDetails}>
                                        Save Details
                                    </button>
                                </div>
                            </Container> 
                        </Col>

                        <Col md={2}></Col>

                        <Col md={5}>
                            <Row>
                                <Col>
                                    <div className='editDetialsHeader'>
                                        Change Password
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='editDetialsName'>
                                        Current Password
                                    </div>
                                    <div className='editDetialsInput'>
                                        <TextField required name='password' sx={{width:'100%'}} className='accountInput' onChange={onPwdChange} placeholder="Current Password" type='text' error={currPwdError !== null} />
                                        {currPwdError && <div className='errorMsg' >{currPwdError}</div>}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='editDetialsName'>
                                        New Password
                                    </div>
                                    <div className='editDetialsInput'>
                                        <TextField required name='newPassword' sx={{width:'100%'}} className='accountInput' onChange={onNewPwdChange} placeholder="Current Password" type='text' error={newPwdError !== null} />
                                        {newPwdError && <div className='errorMsg' >{newPwdError}</div>}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='editDetialsName'>
                                        Confirm New Password
                                    </div>
                                    <div className='editDetialsInput'>
                                        <TextField required name='cfmPassword' sx={{width:'100%'}} className='accountInput' onChange={onCfmPwd} placeholder="Confirm New Password" type='text' error={cfmPwdError !== null} />
                                        {cfmPwdError && <div className='errorMsg' >{cfmPwdError}</div>}
                                    </div>
                                </Col>
                            </Row>
                            <div className='editDetailsButtonRow'>
                                <button className='editDetailsButton' disabled={disabledPwd} onClick={onHandlePassword}>
                                    Save Password
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Dialog open={openMsg} onClose={handleCloseDel} fullWidth='90%'>
                <DialogTitle>Update success!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please login to your account again.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={navLogin} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )

}

