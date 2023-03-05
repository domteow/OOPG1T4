import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import './index.css'
import logo from './assets/quantum.jpg'
import logo2 from './assets/logo.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Navbar(){
  const userRole = {
    'dom' : 'vendor', 
    'rhys' : 'admin'
  }
  const user = localStorage.getItem('username');
  const role = userRole[user];

  // navigations 
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/react/homepage');
  };
 
  const navigateLogout = () =>{
    localStorage.setItem('username', '');
    localStorage.setItem("authenticated", false);
    navigate ('/react/login')
  }
  
  if (role == 'vendor'){
    return(
        <header className='navbar'>
          <div className="navBar_logo">
            <img src={logo2}/>
          </div>
          <div className="navbar__item" onClick={navigateHome}>Home</div>
          <div className='navbar__item' onClick={navigateLogout}>Logout</div>     
        </header>
    )
  }
  else if (role == 'admin'){
    return(
      <header className='navbar'>
        <div className="navBar_logo">
          <img src={logo2}/>
        </div>
        <div className="navbar__item" onClick={navigateHome}>Home</div>
        <div className="navbar__item">Vendors</div>
        <div className="navbar__item">Forms</div>
        <div className='navbar__item' onClick={navigateLogout}>Logout</div>     
      </header>
    )
  }
}