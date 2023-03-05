import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../index.css'
import logo from '../assets/quantum.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../navbar'

import axios from '../api/axios'

export default function Homepage(props) {
    const [selectForm, setselectForm] = useState("")

    // navigate to forms page with formId
    const navigate = useNavigate();
    const goToForm = (formId) =>{
      navigate("/react/form/" + formId)
    };

    // forms from backend
    const backendDomain = process.env.REACT_APP_backendDomain;
    const usersInfos = {
      'dom' : {
        'allForms': {'form1': {'status':'Read only', 'id': 1}, 'form2': {'status':'read only', 'id': 2}},
        'incompleteForms': {'form3': {'status':'Incomplete', 'action': 'incomplete', 'id' :3}, 'form4': {'status':'Incomplete', 'action': 'continue draft', 'id':4}},
        'completedForms': {'form5':{'status':'complete', 'id':5}, 'form6':{'status': 'complete', 'id': 6}}
      }, 
      'rhys': {
        'allForms': {'form7': {'status':'Read only', 'id': 7}, 'form8': {'status':'read only', 'id': 8}},
        'incompleteForms': {'form9': {'status':'Incomplete', 'action': 'incomplete', 'id' :9}, 'form10': {'status':'Incomplete', 'action': 'continue draft', 'id':10}, 'form11': {'status':'Incomplete', 'action': 'continue draft', 'id':11}},
        'completedForms': {'form12':{'status':'complete', 'id':12}}
      }
    }

    // to authenticate the homepage 
    const [authenticated, setAuthenticated] = useState(null);

    // use effect to check the user, get the data and return 
    useEffect (() =>{
      const loggedInUser = localStorage.getItem('authenticated');
      if (loggedInUser){
        setAuthenticated(loggedInUser);
        console.log(loggedInUser);
      }
    }, []); 

    if (!authenticated){
      // not logged in, i never check if this works hehe.... 
      return <navigate replace to='/react/login' />;
    }
    else{
      // to get the current username (should be id in the actual thing, using name for now)
      const user = localStorage.getItem('username');
      const allForms = usersInfos[user]['allForms'];
      const incompleteForms = usersInfos[user]['incompleteForms'];
      const completedForms = usersInfos[user]['completedForms'];

      return (
        <> 
          <Navbar />

          <div className='mainContent'>
            <div className='welcomeMsg'>
              Welcome {user}!
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
}
