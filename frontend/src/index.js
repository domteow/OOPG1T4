import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import Homepage from './homepage.js';
import Form from './form.js';
// import reportWebVitals from './reportWebVitals';
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import './index.css'
import logo from './assets/quantum.jpg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavbarVendor from './navbarvendor'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route exact path="/form/:formId" element={<Form/>}/>
    </Routes>
      
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
