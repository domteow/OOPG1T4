import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate, useParams } from 'react-router-dom'
import '../../index.css'
import logo from '../../assets/quantum.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../navbar'

export default function Viewvendor(){
    const vendorId = useParams().vendorId; 
    const navigate = useNavigate();
    console.log(vendorId);

    // from backend get all the stuff we need to display.. idek what.......... fuck
    const vendorDetails = {
        'name': 'Kelv',
        'allForms': {'form1': {'status':'Read only', 'id': 1}, 'form2': {'status':'read only', 'id': 2}},
        'incompleteForms': {'form3': {'status':'Incomplete', 'action': 'incomplete', 'id' :3}, 'form4': {'status':'Incomplete', 'action': 'continue draft', 'id':4}},
        'completedForms': {'form5':{'status':'complete', 'id':5}, 'form6':{'status': 'complete', 'id': 6, 'submission': 289}}
    }
    const vendorName = vendorDetails['name'];
    const allForms = vendorDetails['allForms'];
    const incompleteForms = vendorDetails['incompleteForms'];
    const completedForms = vendorDetails['completedForms'];

    const back = () =>{
        navigate('/react/allvendors');
    }

    return(
        <>
            <Navbar />

            <div className='back'>
                <button className='backButton' onClick={back}>
                    Back to All Vendors
                </button>
            </div>

            <div className='formContent'>
                <div className='vendorName'>
                    {vendorName}
                </div>

                <button className='assignForm'>
                    + Assign Form
                </button>

                {/* for all forms that are read only */}
            <div className='subDivider'>
              All Forms
            </div>

            {Object.keys(allForms).map((formName, index)=>{
              return(
                <Container className = 'homepageFormDisplay' key={formName}>
                  <Row className='displayRow' > 
                    <Col xs={12} md={8} className='homepageFormDetails'>
                      <div className='homepageFormName'>
                        {formName}
                      </div>
                      <div className='homepageFormStatus'>
                      Status: {allForms[formName]['status']}
                      </div>
                    </Col>
                    <Col xs={6} md={4} xl={2}>
                        <button className='formButton' size="lg" style={{backgroundColor: '#AF0505', color: '#FFEDED', fontStyle:'none'}}>
                            Delete
                        </button>
                    </Col>
                  </Row>
                </Container>
                
              )
            })}

            {/* for all forms that are incomplete  */}
            <div className='subDivider'>
              Incomplete Forms
            </div>

            {Object.keys(incompleteForms).map((formName, index)=>{
              return(
                <Container className = 'homepageFormDisplay' key={formName}>
                  <Row className='displayRow' > 
                    <Col xs={12} md={8} className='homepageFormDetails'>
                      <div className='homepageFormName'>
                        {formName}
                      </div>
                      <div className='homepageFormStatus'>
                      Status: {incompleteForms[formName]['status']}
                      </div>
                    </Col>
                    <Col xs={6} md={4} xl={2}>
                        <button className='formButton' size="lg" style={{backgroundColor: '#AF0505', color: '#FFEDED', fontStyle:'none'}}>
                            Delete
                        </button>
                    </Col>
                  </Row>
                </Container>
                
              )
            })}

            {/* for all forms that are completed */}
            <div className='subDivider'>
              Completed Forms
            </div>

            {Object.keys(completedForms).map((formName, index)=>{
              return(
                <Container className = 'homepageFormDisplay' key={formName}>
                  <Row className='displayRow' > 
                    <Col xs={12} md={8} className='homepageFormDetails'>
                      <div className='homepageFormName'>
                        {formName}
                      </div>
                      <div className='homepageFormStatus'>
                      Status: {completedForms[formName]['status']}
                      </div>
                    </Col>
                    <Col xs={6} md={2} xl={2}>
                      <button className='formButton' size="lg" style={{backgroundColor: '#46AF05', color: '#edfffe', fontStyle:'none'}}>
                        View Submission
                      </button>
                    </Col>
                    <Col xs={6} md={2} xl={2}>
                        <button className='formButton' size="lg" style={{backgroundColor: '#AF0505', color: '#FFEDED', fontStyle:'none'}}>
                        Delete
                        </button>
                    </Col>
                  </Row>
                </Container>
              )
            })}
            </div>
        </>
    )

}