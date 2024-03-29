import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../api/axios'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../index.css'
import logo from '../assets/quantum.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import loginLogo from '../assets/loginLogo.png';
import TextField from '@mui/material/TextField';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Login = () =>{
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
    const [showPwd, setShowPwd] = useState(false);
    const [open, setOpen] = React.useState(false);

    const togglePwd = () => {
        setShowPwd(!showPwd);
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        const loginDetails = {
            "emailAddress": username,
            "password": password
        }
        try {
            const response = await axios.post("/api/v1/user/login", loginDetails)
            const userID = response.data.data.id;
            const Name = response.data.data.name;
            const role = response.data.data.accountType;
            const statusCode = response.data.status;
            const email = response.data.data.emailAddress;
            console.log(response.data.data);
            if (statusCode == 200) {
            
                setauthenticated(true)
                localStorage.setItem("authenticated", true);
                localStorage.setItem('userid', userID);
                console.log(userID);
                localStorage.setItem('username', Name);
                console.log(role);
                localStorage.setItem('email', email)
                setUser(Name);
                localStorage.setItem("role", role);
                if (role == 'Vendor'){
                    navigate('/react/vendor/homepage');
                }
                else if (role == 'Admin'){
                    navigate('/react/admin/homepage');
                }
                else if (role == 'Approver'){
                    navigate('/react/approver/homepage');
                }
            }
            else {
                alert("Incorrect username or password")
            }
        } catch (error) {
            console.log(error)
            setOpen(true)
        }
        
    };
    return(
        <div className='loginBody'>
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
                        Error! Incorrect email or password. 
                        </Alert>
                    </Collapse>
                </Box>
            <Container >
                
                <Row>
                    <Col className='ehhe'>
                        <div className='loginwelcomeText'>
                            Welcome!
                        </div>
                        <div className='loginwelcomeSubText'>
                            Enter your email and password to login.
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col classame='formPortion' xl={7}>
                        <form onSubmit={handleSubmit} className='formPortion'>
                            <div className='loginInput'>
                                <TextField
                                    onChange={(e)=> setUsername(e.target.value)}
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    className='loginInputField'
                                />
                            </div>
                            <div className='loginInput'>
                                <TextField
                                    onChange={(e)=> setPassword(e.target.value)}
                                    required
                                    id="outlined-password-input"
                                    label="Password"
                                    type={showPwd ? "text" : "password"}
                                    autoComplete="current-password"
                                    className='loginInputField'
                                />
                                <span>
                                    <VisibilityOffIcon onClick={togglePwd} sx={{fontSize:'25px', marginLeft:'2%', marginTop:'2%'}}/>
                                </span>
                            </div>

                            <div className='loginInput'>
                                <input className='submitButton' type="submit" value="Login" />
                            </div>
                        </form>
                    </Col>
                
                    <Col className='logoPart' xl={5}>
                        <div className='cover'/>
                    </Col>
                </Row>


            </Container>
        </div>
    )
};



export default Login;