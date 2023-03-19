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

export default function Homepage() {
    // navigate to forms page with formId
    const navigate = useNavigate();
    const goToForm = (formId) =>{
      navigate("/react/viewform/" + formId)
    };

    // forms from backend
    const backendDomain = process.env.REACT_APP_backendDomain;
    

    
    // to authenticate the homepage 
    const [authenticated, setAuthenticated] = useState(null);
    const [userid, setUserid] = useState('');
    const [username, setUsername] = useState('');
    const [allForms, setAllForms] = useState([]);
    const [incompleteForms, setIncompleteForms] = useState({});
    const [completedForms, setCompletedForms] = useState({});
    const [readOnlyForms, setReadOnlyForms] = useState({});
    const [role, setRole] = useState(localStorage.getItem('role'));

    // use effect to check the user, get the data and return 
    useEffect (() =>{
      const loggedInUser = localStorage.getItem('authenticated');
      if (loggedInUser){
        setAuthenticated(loggedInUser);
        console.log(loggedInUser);
      } else {
        navigate("/react/login/");
      }
    }, []); 

    useEffect(() => {
      const userid = localStorage.getItem('userid');
      const username = localStorage.getItem('username');
      setUserid(userid);
      setUsername(username);
  

  
      if (authenticated) {
        getFormData(userid);
      }
    }, [authenticated]);

    
    const getFormData = async (userid) => {
      try {
        const response = await axios.get("/api/v1/formResponse/getFormsByVendorId/" + userid)
        console.log(response.data.data)
        // store in state
        setAllForms(response.data.data)
        // store locally for the stuff below
        const allforms = response.data.data
        allforms.forEach(form => {
          console.log(form)
          if(form['status'] === 'completed'){
            setCompletedForms(prevCompletedForms => ({...prevCompletedForms, form}))
            console.log(completedForms)
          }
          else if(form['status'] === 'incomplete'){
            setIncompleteForms(prevIncompleteForms => ({...prevIncompleteForms, form}))
            console.log(incompleteForms)
          }
          else if(form['status'] === 'readonly'){
            setReadOnlyForms(prevReadOnlyForms => ({...prevReadOnlyForms, form}))
            console.log(readOnlyForms)
          }
        });
        
      } catch (error) {

      }
    }

      return (
        <> 
          <Navbar />

          <div className='mainContent'>
            <div className='welcomeMsg'>
              Welcome {username}!
            </div>

            {/* for all forms that are read only */}
            <div className='subDivider'>
              Notices
            </div>

            {Object.keys(readOnlyForms).map((formName, index)=>{
              return(
                <Container className = 'homepageFormDisplay' key={formName}>
                  <Row className='displayRow' > 
                    <Col xs={12} md={8} className='homepageFormDetails'>
                      <div className='homepageFormName'>
                        {formName}
                      </div>
                      <div className='homepageFormStatus'>
                      Status: {readOnlyForms[formName]['status']}
                      </div>
                    </Col>
                    <Col xs={6} md={4} xl={2}>
                      <button className='formButton' size="lg" style={{backgroundColor: '#7f7f7f', color: '#edfffe', fontStyle:'none'}} onClick={() => goToForm(readOnlyForms[formName]['id'])}>
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
              if(incompleteForms[formName]['pendingUserInput'] == role) {
    
              return(
                <Container className = 'homepageFormDisplay' key={formName}>
                  <Row className='displayRow' > 
                    <Col xs={12} md={8} className='homepageFormDetails'>
                      <div className='homepageFormName'>
                        {incompleteForms[formName]['description']}
                      </div>
                      <div className='homepageFormStatus'>
                      Status: {incompleteForms[formName]['status']}
                      </div>
                    </Col>
                    <Col xs={6} md={4} xl={2}>
                      <button className='formButton' size="lg" style={{backgroundColor: '#066FB0', color: '#edfffe', fontStyle:'none'}} onClick={() => goToForm(incompleteForms[formName]['id'])}>
                        {/* {incompleteForms[formName]['action']} */} 
                        Continue Form

                      </button>
                    </Col>
                  </Row>
                </Container>
                
              )
            }})}

            {/* for all forms that are completed */}
            <div className='subDivider'>
              Completed Forms
            </div>

            {Object.keys(completedForms).map((formName, index)=>{

              if(incompleteForms[formName]['pendingUserInput'] == role) {

              return(
                <Container className = 'homepageFormDisplay' key={formName}>
                  <Row className='displayRow' > 
                    <Col xs={12} md={8} className='homepageFormDetails'>
                      <div className='homepageFormName'>
                        {completedForms[formName]['description']}
                      </div>
                      <div className='homepageFormStatus'>
                      Status: {completedForms[formName]['formStatus']} on {completedForms[formName]['effectiveDate']}
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
            }})}
          </div>
        </>
      )
    }
// }
