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

const Login = () =>{
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
    

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
            if (statusCode == 200) {
            
                setauthenticated(true)
                localStorage.setItem("authenticated", true);
                localStorage.setItem('userid', userID);
                localStorage.setItem('username', Name);
    
                setUser(Name);
                localStorage.setItem("role", role);
                if (role == 'Vendor'){
                    navigate('/react/vendor/homepage');
                }
                else if (role == 'Admin'){
                    navigate('/react/admin/homepage');
                }
            }
            else {
                alert("Incorrect username or password")
            }
        } catch (error) {
            console.log(error)
        }
        
    };
    return(
        <div className='loginBody'>
            <Container >
                <Row>
                    <Col>
                        <div className='welcomeText'>
                            Welcome!
                        </div>
                        <div className='welcomeSubText'>
                            Enter your username and password to login.
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
                                    type="password"
                                    autoComplete="current-password"
                                    className='loginInputField'
                                />
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