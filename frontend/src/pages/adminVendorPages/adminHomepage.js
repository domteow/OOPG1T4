import React from 'react'
import axios from '../../api/axios'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../../index.css'
import logo from '../../assets/quantum.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../navbar'
import DeleteIcon from '@mui/icons-material/Delete';

// this is the main page for admin !!!!!!!!!!!!!
export default function AdminHomepage(){
    // for backend to get list of all vendors from database
    const [allVendors, setAllVendors] = useState({});
    const user = localStorage.getItem('username');
    const getAllVendors = async() => {
        try {
            const response = await axios.get("/api/v1/vendor/getAllVendors")
            
            // console.log([response.data.data]);
            setAllVendors(response.data.data);
            
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        getAllVendors();
    }, []);

    // console.log(allVendors)
    // const allVendors = {
    //     'kelvin' : {
    //         'id': '123',
    //         'company': 'jien'
    //     }, 
    //     'bruno' : {
    //         'id': '456',
    //         'company': 'br.no'
    //     },
    //     'dom':{
    //         'id': '789',
    //         'company': 'dominicteow'
    //     }
    // }

    

    const navigate = useNavigate();
    const addNewVendor = () =>{
        navigate('/react/newvendor');
    }

    const viewVendor = (vendorId) =>{
        navigate("/react/viewvendor/" + vendorId);
    }

    const deleteVendor = (vendorId)=>{
        // add code to delete the vendor 
    }

    return(
        <>
            <Navbar />

            <div className='mainContent'>
                <div className='welcomeAdmin'>
                Welcome {user}!
                </div>


                {/* button to add a new vendor */}
                <div className='addVendorDiv'>
                    <button className='addVendorButton' onClick={addNewVendor}>+ New Vendor</button>
                </div>

                <div className='vendorContainer'>
                    <Container>
                        <Row className='containerHeaders'>
                            <Col xs={12} md={6} >
                                Name
                            </Col>
                            <Col xs={12} md={3} className='companyHeader'>
                                Company
                            </Col>
                            <Col xs={8} md={2} className='companyHeader'>
                                View Vendor
                            </Col>
                            <Col xs={4} md={1} ></Col>
                        </Row>
                    
                        {/* to display all vendors */}

                        {Object.values(allVendors).map((vendorDetails, index)=>{
                            
                            
                            
                            
                            const vendorId = vendorDetails['id'];
                            
                            return(
                                <Row className='vendorDisplayRows'>
                                    <Col xs={12} md={6} className='vendorDetailsCol'>
                                        <div className='vendorDisplayName'>
                                            {vendorDetails.name}
                                        </div>
                                    </Col>
                                    <Col xs={12} md={3}>
                                        <div className='vendorCompany'>
                                            {vendorDetails.company}
                                            
                                        </div>
                                    </Col>
                                    <Col xs={8} md={2}  className='vendorButtonCol'>
                                        <button className='viewVendorButton' id={vendorId} onClick={() => viewVendor(vendorId)}>
                                            View Vendor
                                        </button>
                                    </Col>
                                    <Col xs={4} md={1} className='companyHeader' >
                                        <DeleteIcon onClick={()=>deleteVendor(vendorId)}/>
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