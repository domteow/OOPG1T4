import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../index.css'
import logo from '../assets/quantum.jpg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavbarVendor from '../navbarvendor'

import axios from '../api/axios'

export default function Homepage(props) {
    const [selectForm, setselectForm] = useState("")

    // forms from backend
    const backendDomain = process.env.REACT_APP_backendDomain;

    const allForms = {'form1': {'status':'Read only', 'id': 1}, 'form2': {'status':'read only', 'id': 2}}
    const incompleteForms = {'form3': {'status':'Incomplete', 'action': 'incomplete', 'id' :3}, 'form4': {'status':'Incomplete', 'action': 'continue draft', 'id':4}}
    const completedForms = {'form5':{'status':'complete', 'id':5}, 'form6':{'status': 'complete', 'id': 6}}

    // navigate to forms page with formId
    const navigate = useNavigate();
    const goToForm = (formId) =>{
      navigate("/react/form/" + formId)
    };
    
  return (
    <> 
      <NavbarVendor />

      <div className='mainContent'>
        <div className='welcomeMsg'>
          Welcome Dom
        </div>

        {/* for all forms that are read only */}
        <div className='subDivider'>
          All Forms
        </div>

        {Object.keys(allForms).map((formName, index)=>{
          return(
            <Container className = 'homepageFormDisplay' key={formName}>
              <Row className='homepageFormRow' > 
                <Col xs={12} md={8} className='homepageFormDetails'>
                  <div className='homepageFormName'>
                    {formName}
                  </div>
                  <div className='homepageFormStatus'>
                  Status: {allForms[formName]['status']}
                  </div>
                </Col>
                <Col xs={6} md={4} xl={2}>
                  <button className='formButton' size="lg" style={{backgroundColor: '#7f7f7f', color: '#edfffe', fontStyle:'none'}} onClick={() => goToForm(allForms[formName]['id'])}>
                    View Form
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
              <Row className='homepageFormRow' > 
                <Col xs={12} md={8} className='homepageFormDetails'>
                  <div className='homepageFormName'>
                    {formName}
                  </div>
                  <div className='homepageFormStatus'>
                  Status: {incompleteForms[formName]['status']}
                  </div>
                </Col>
                <Col xs={6} md={4} xl={2}>
                  <button className='formButton' size="lg" style={{backgroundColor: '#066FB0', color: '#edfffe', fontStyle:'none'}} onClick={() => goToForm(incompleteForms[formName]['id'])}>
                    {incompleteForms[formName]['action']}
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
              <Row className='homepageFormRow' > 
                <Col xs={12} md={8} className='homepageFormDetails'>
                  <div className='homepageFormName'>
                    {formName}
                  </div>
                  <div className='homepageFormStatus'>
                  Status: {completedForms[formName]['status']}
                  </div>
                </Col>
                <Col xs={6} md={4} xl={2}>
                  <button className='formButton' size="lg" style={{backgroundColor: '#46AF05', color: '#edfffe', fontStyle:'none'}} onClick={() => goToForm(completedForms[formName]['id'])}>
                    View Submission
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
