import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../../index.css'
import logo from '../../assets/quantum.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../navbar'

export default function Allvendors(){
    // for backend to get list of all vendors from database
    const allVendors = {
        'kelvin' : {
            'id': '123',
            'company': 'jien'
        }, 
        'bruno' : {
            'id': '456',
            'company': 'br.no'
        },
        'dom':{
            'id': '789',
            'company': 'dominicteow'
        }
    }

    const navigate = useNavigate();
    const addNewVendor = () =>{
        navigate('/react/newvendor');
    }

    const viewVendor = (vendorId) =>{
        navigate("/react/viewvendor/" + vendorId);
    }

    return(
        <>
            <Navbar />

            <div className='mainContent'>
                <div className='subDivider'>
                    Vendors
                </div>

                {/* button to add a new vendor */}
                <button className='addVendorButton' onClick={addNewVendor}>+ New Vendor</button>

                {/* to display all vendors */}
                <Container>
                        {Object.keys(allVendors).map((vendorName, index)=>{
                            const vendorDetails = allVendors[vendorName];
                            const vendorCompany = vendorDetails['company'];
                            const vendorId = vendorDetails['id'];
                            console.log(vendorId);
                            return(
                                <Row className='displayRow'>
                                    <Col xs={12} md={8} className='vendorDetailsCol'>
                                        <div className='vendorName'>
                                            {vendorName}
                                        </div>
                                        <div className='vendorCompany'>
                                            {vendorCompany}
                                        </div>
                                    </Col>
                                    <Col xs={6} md={4} xl={2} className='vendorButtonCol'>
                                        <button className='viewVendorButton' id={vendorId} onClick={() => viewVendor(vendorId)}>
                                            View Vendor
                                        </button>
                                    </Col>
                                </Row>
                            )
                        })}
                </Container>
            </div>
        </>
    )


}