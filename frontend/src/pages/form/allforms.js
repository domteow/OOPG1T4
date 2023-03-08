import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../../index.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../navbar';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Allforms(){
    // get all forms from backend
    const allforms = [
        {
            name: 'formA', 
            date: '03-08-2023', 
            id: '1'
        },
        {
            name: 'formB', 
            date: '03-04-2023', 
            id: '2'
        },
        {
            name: 'formC', 
            date: '02-04-2022', 
            id: '3'
        },
        {
            name: 'formD', 
            date: '19-11-2022', 
            id: '4'
        },
        {
            name: 'formE', 
            date: '13-02-2022', 
            id: '5'
        }
    ]

    // navigate 
    const navigate = useNavigate();

    // create new form navigation 
    const goToNewForm = () =>{
        navigate('/react/newform');
    }

    return(
        <>
            <Navbar />

            <div className='allFormContent'>
                <div className='welcomeAdmin'>
                    Forms
                </div>

                <div className='buttonFormRow'>
                    <button className='newFormButton' onClick={() => goToNewForm()}>
                        Create New Form
                    </button>
                </div>

                <div className='allFormsContainer'>
                    <Container>
                        <Row className='formHeaderRow'>
                            <Col xs={12} md={4}>
                                Name
                            </Col>
                            <Col xs={12} md={2} className='headerCenter'>
                                Date Created
                            </Col>
                            <Col xs={12} md={1} className='headerCenter'>
                                Id
                            </Col>
                            <Col xs={12} md={2} className='headerCenter'>
                                View
                            </Col>
                            <Col xs={12} md={2} className='headerCenter'>
                                Edit
                            </Col>
                            <Col xs={12} md={1}>
                                
                            </Col>
                        </Row>

                        {allforms.map((form, i)=>{
                            return(
                                <Row className='formDataRow'>
                                    <Col xs={12} md={4}>
                                        {form.name}
                                    </Col>
                                    <Col xs={12} md={2} className='headerCenter'>
                                        {form.date}
                                    </Col>
                                    <Col xs={12} md={1} className='headerCenter'>
                                        {form.id}
                                    </Col>
                                    <Col xs={12} md={2} className='headerCenter'>
                                        <button className='viewForm'>
                                            View Form
                                        </button>
                                    </Col>
                                    <Col xs={12} md={2} className='headerCenter'>
                                        <button className='editForm'>
                                            Edit Form
                                        </button>
                                    </Col>
                                    <Col xs={12} md={1} className='headerCenter'>
                                        <DeleteIcon />
                                    </Col>
                                </Row>
                            )
                        })}


                    </Container>
                </div>

            </div>
        </>
    )
}