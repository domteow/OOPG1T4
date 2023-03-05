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

export default function NewVendor(){
    const navigate = useNavigate();
    const initialValues ={
        vendorName: '',
        vendorEmail: '',
        vendorCompany: '',
    }
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (e.target.type == 'checkbox'){
            const isChecked = e.target.checked;
            setValues({
                ...values,
                [name]: isChecked ? [...values[name], value] : values[name].filter((item) => item !== value),
            });
        }
        else{
            setValues({
                ...values,
                [name]: value,
            });
        }
    };

    // to save the vendor 
    const addVendor = () => {
        console.log(values);
        alert(JSON.stringify(values));
    }
    console.log(values);

    const cancel = () =>{
        navigate('/react/allvendors/');
    }

    return(
        <>
            <Navbar />

            <div className='mainContent'>
                <div className='subDivider'>
                    New Vendor
                </div>
                <form>
                    <fieldset>
                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Name:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <input name='vendorName' className='inputtext' type='text' onChange={handleChange} />
                            </Col>
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Company:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <input name='vendorCompany' className='inputtext' type='email' onChange={handleChange} />
                            </Col>
                        </Row>
                        
                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Email:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <input name='vendorEmail' className='inputtext' type='email' onChange={handleChange} />
                            </Col>
                        </Row>
                    </fieldset>
                    <Row className='formRow'>
                        <Col>
                            <button className='cancelButton' onClick={cancel}>Cancel</button>
                        </Col>
                        <Col>
                            <button className='cfmVendorButton' onClick='/react/allvendors'>Add Vendor</button>
                        </Col>
                    </Row>
                </form>
            </div>
        </>
    )
}