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
    

    // RETRIEVE ALL USERS FROM API
    const getAllUsers = async() => {
        try {
            const response = await axios.get("/api/v1/user/getAllUsers")
            
            console.log([response.data.data]);
            return response.data.data;
            
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const users = await getAllUsers();
        console.log(users);
        
        const account = Object.values(users).find((user) => user.name.toLowerCase() === username);
        
        if (account && account.password === password) {
            
            setauthenticated(true)
            localStorage.setItem("authenticated", true);
            localStorage.setItem('username', username);
            setUser(account.name);
            const role = account.accountType.toLowerCase();
            localStorage.setItem("role", role);
            if (role == 'vendor'){
                navigate('/react/vendor/homepage');
            }
            else if (role == 'admin'){
                navigate('/react/admin/homepage');
            }
        }
        else {
            alert("Incorrect username or password")
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
                                    label="Username"
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