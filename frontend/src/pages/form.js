import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Route, Routes, BrowserRouter, useLocation, useParams } from 'react-router-dom'
// import './index.css'
import logo from '../assets/quantum.jpg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Form(props) {
    // const buttonClicked = useLocation()
    // const formId = buttonClicked.state.formId
    // console.log(formId)

    // const {state} = useLocation();
    // const formID = state.formId;
    // console.log(formID);

    const formID  = useParams();
    console.log(formID);

    return (
        <h1>hi fk you </h1>
    )

}