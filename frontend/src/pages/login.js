import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../index.css'
import logo from '../assets/quantum.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = () =>{
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
    const users = [
        { 
            username: "dom", 
            password: "dom" 
        }, 
        {
            username: 'rhys',
            password: 'rhys',
        }
    ];
    const handleSubmit = (e) => {
        e.preventDefault()
        const account = users.find((user) => user.username === username);
        if (account && account.password === password) {
            setauthenticated(true)
            localStorage.setItem("authenticated", true);
            localStorage.setItem('username', username);
            setUser(account.username);
            navigate('/react/homepage');
        }
    };
    return (
        <>
            <Container className='formBody'>
                <Row>
                    <Col className='loginLogoPortion'>
                        <img className='formLogo' src={logo}/>
                    </Col>
                    <Col className='formPortion'>
                        <form onSubmit={handleSubmit} className='formPortion'>
                            <div className='formInputLabel'>
                                Username: 
                            </div>
                            <input className='formInputField' type ='text' name='Username' value={username} onChange={(e)=> setUsername(e.target.value)} />
                            <div className='formInputLabel'>
                                Password: 
                            </div>
                            <input className='formInputField' type ='password' name='Password' onChange={(e)=> setPassword(e.target.value)} />
                            <div>
                                <input className='submitButton' type="submit" value="Login" />
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </>
    )
};



export default Login;