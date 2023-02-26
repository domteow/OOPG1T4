import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import './index.css'
import logo from './assets/quantum.jpg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavbarVendor from './navbarvendor'

export default function Homepage(props) {
    const [selectForm, setselectForm] = useState("")

    // function for when button is clicked
    const viewForm = ({target}) => {
      const targetFormId = target.id;
      setselectForm(targetFormId);    
    }

    const allForms = {'form1': {'status':'Incomplete', 'id': 1}, 'form2': {'status':'Incomplete', 'id': 2}}
    const incompleteForms = {'form3': {'status':'Incomplete', 'action': 'incomplete', 'id' :3}, 'form4': {'status':'Incomplete', 'action': 'continue draft', 'id':4}}
    const completedForms = {'form5':{'status':'Incomplete', 'id':5}, 'form6':{'status': 'complete', 'id': 6}}
    
    
    
    const navigate = useNavigate();
    const goToForm = (formId) =>{
      navigate("/form/" + formId)
      };
    

  return (
    // top nav bar 
    
    
    <>
      <NavbarVendor />

      <div className='welcomeMsg'>
        Welcome Dom
      </div>


      {Object.keys(allForms).map((formName, index)=>{
        return(
          
            <button onClick={() => goToForm(12)}>
              hi 
            </button>
            
        )
      })}
      

      {/* for all forms that are read only */}
      <div className='subDivider'>
        All Forms
      </div>

      {Object.keys(allForms).map((formName, index)=>{
        return(
          <Container className = 'homepageFormDisplay' key={formName}>
            <Row className='homepageFormRow' > 
              <Col xs={12} md={8}>
                <div className='homepageFormName'>
                  {formName}
                </div>
                <div className='homepageFormStatus'>
                {allForms[formName]['status']}
                </div>
              </Col>
              <Col >
                <button className='formButton' size="lg" style={{backgroundColor: '#7f7f7f'}}>
                  <Link to={{pathname:'./form.js', state: {formId:allForms[formName]['id']}}} style={{color: '#edfffe', fontStyle:'none'}}>
                  View Form
                  </Link>
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
              <Col xs={12} md={8}>
                <div className='homepageFormName'>
                  {formName}
                </div>
                <div className='homepageFormStatus'>
                {incompleteForms[formName]['status']}
                </div>
              </Col>
              <Col >
                <button className='formButton' size="lg" style={{backgroundColor: '#066FB0'}}>
                  <Link to={{pathname:'./form.js', formId:incompleteForms[formName]['id']}} style={{color: '#edfffe', fontStyle:'none'}}>
                      {incompleteForms[formName]['action']}
                  </Link>
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
              <Col xs={12} md={8}>
                <div className='homepageFormName'>
                  {formName}
                </div>
                <div className='homepageFormStatus'>
                {completedForms[formName]['status']}
                </div>
              </Col>
              <Col >
                <button className='formButton' size="lg" style={{backgroundColor: '#46AF05'}}>
                  <Link to={{pathname:'./form.js', formId:completedForms[formName]['id']}} style={{color: '#edfffe', fontStyle:'none'}}>
                      View Submission
                  </Link>
                </button>
              </Col>
            </Row>
          </Container>
          
        )
      })}


    </>
  )
}
