import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom'
import './index.css'
import logo from './assets/quantum.jpg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function NavbarVendor(){
    return(
        <header className='navbar'>
          <div className="navBar_logo">
            <img src={logo}/>
          </div>
          <div className='navbar__item'>Logout</div>     
        </header>
    )
}