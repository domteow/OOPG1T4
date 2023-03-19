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
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import axios from '../api/axios'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    const [incompleteForms, setIncompleteForms] = useState([]);
    const [completedForms, setCompletedForms] = useState([]);
    const [readOnlyForms, setReadOnlyForms] = useState([]);
    const [approvedForms, setApprovedForms] = useState([]);

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
            setCompletedForms(prevCompletedForms => ([...prevCompletedForms, form]))
            console.log(completedForms)
          }
          else if(form['status'] === 'incomplete'){
            setIncompleteForms(prevIncompleteForms => ([...prevIncompleteForms, form]))
            console.log(incompleteForms)
          }
          else if(form['status'] === 'readonly'){
            setReadOnlyForms(prevReadOnlyForms => ([...prevReadOnlyForms, form]))
            console.log(readOnlyForms)
          }
          else if (form['status'] === 'approved'){
            setApprovedForms(prevApprovedForms => ([...prevApprovedForms, form]))
            console.log(readOnlyForms)
          }
        });
        
      } catch (error) {

      }
    }
    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = (panel) => (event, isExpanded) =>{
      setExpanded(isExpanded? panel : false);
    }
    console.log(incompleteForms);

      return (
        <> 
          <Navbar />

          <div className='mainContent'>
            <div className='welcomeMsg'>
              Welcome {username}!
            </div>

            <div className='formHeader'>
              Approved
            </div>

            <Container className = 'homepageFormDisplay'>
              {approvedForms.map((form, index)=>{
                return(
                    <Row className='displayRow'  key={form}> 
                      <Col xs={12} md={8} className='homepageFormDetails'>
                        <div className='homepageFormName'>
                          {form.description}
                        </div>
                        <div className='homepageFormStatus'>
                        Status: {form.status}
                        </div>
                      </Col>
                      <Col xs={6} md={4} xl={2}>
                        <button className='formButton' size="lg" style={{backgroundColor: '#7f7f7f', color: '#edfffe', fontStyle:'none'}} onClick={() => goToForm(form.id)}>
                          View Form
                        </button>
                      </Col>
                    </Row>                
                )
              })}
            </Container>
            

            {/* for all forms that are read only */}
            <div className='formHeader'>
              Notices
            </div>

            <Container className = 'homepageFormDisplay'>
              {readOnlyForms.map((form, index)=>{
                return(
                    <Row className='displayRow'  key={form}> 
                      <Col xs={12} md={8} className='homepageFormDetails'>
                        <div className='homepageFormName'>
                          {form.description}
                        </div>
                        <div className='homepageFormStatus'>
                        Status: {form.status}
                        </div>
                      </Col>
                      <Col xs={6} md={4} xl={2}>
                        <button className='formButton' size="lg" style={{backgroundColor: '#7f7f7f', color: '#edfffe', fontStyle:'none'}} onClick={() => goToForm(form.id)}>
                          View Form
                        </button>
                      </Col>
                    </Row>                
                )
              })}
            </Container>

            {/* for all forms that are incomplete  */}
            <div className='formHeader'>
              Incompleted Forms
            </div>

            <div className='accordion'>
              <Accordion className='vendorAccord' expanded={expanded === 'admin'} onChange={handleAccordionChange('admin')}>
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls = 'admin-content'
                  id='admin-header'>
                    <div sx={{flexShrink: 0 }} className='accordTitle'>
                      Admin Action
                    </div>
                </AccordionSummary>

                <AccordionDetails>
                  <Container >
                  {incompleteForms.map((form, i) => {
                    console.log(form);
                    const assignedTo = form.pendingUserInput;
                    if (assignedTo === 'Admin'){
                      return (
                        <Row className='formRow' key={form}>
                          <Col xs={12} md={8} className='homepageFormDetails'>
                            <div className='homepageFormName'>
                              {form.description}
                            </div>
                            <div className='homepageFormStatus'>
                              Status: {form.status}
                            </div>
                          </Col>
                          <Col xs={6} md={4} xl={2}>
                            <button className='formButton' size="lg" style={{backgroundColor: '#7f7f7f', color: '#edfffe', fontStyle:'none'}} onClick={() => goToForm(form.id)}>
                              View Form
                            </button>
                          </Col>
                        </Row>
                      )
                    }
                  })}
                  </Container>
                </AccordionDetails>
              </Accordion>
              <Accordion className='vendorAccord' expanded={expanded === 'vendor'} onChange={handleAccordionChange('vendor')}>
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls = 'admin-content'
                  id='admin-header'>
                    <div sx={{flexShrink: 0 }} className='accordTitle'>
                      Vendor Action
                    </div>
                </AccordionSummary>

                <AccordionDetails>
                  <Container >
                  {incompleteForms.map((form, i) => {
                    console.log(form);
                    const assignedTo = form.pendingUserInput;
                    if (assignedTo === 'Vendor'){
                      console.log('hi')
                      console.log(form.description);
                      return (
                        <Row className='formRow' key={form}>
                          <Col xs={12} md={8} className='homepageFormDetails'>
                            <div className='homepageFormName'>
                              {form.description}
                            </div>
                            <div className='homepageFormStatus'>
                              Status: {form.status}
                            </div>
                          </Col>
                          <Col xs={6} md={4} xl={2}>
                            <button className='formButton' size="lg" style={{backgroundColor: '#7f7f7f', color: '#edfffe', fontStyle:'none'}} onClick={() => goToForm(form.id)}>
                              View Form
                            </button>
                          </Col>
                        </Row>
                      )
                    }
                  })}
                  </Container>
                </AccordionDetails>
              </Accordion>
            </div>

            {/* for all forms that are completed */}
            <div className='formHeader'>
              Completed Forms
            </div>

            <Container className = 'homepageFormDisplay'>
              {completedForms.map((form, index)=>{
                return(
                    <Row className='displayRow' key={form}> 
                      <Col xs={12} md={8} className='homepageFormDetails'>
                        <div className='homepageFormName'>
                          {form.description}
                        </div>
                        <div className='homepageFormStatus'>
                        Status: {form.status} 
                        </div>
                      </Col>
                      <Col xs={6} md={4} xl={2}>
                        <button className='formButton' size="lg" style={{backgroundColor: '#46AF05', color: '#edfffe', fontStyle:'none'}} onClick={() => goToForm(completedForms.id)}>
                          View Submission
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
// }
