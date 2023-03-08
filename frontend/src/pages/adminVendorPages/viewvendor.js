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
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Viewvendor(){
    const vendorId = useParams().vendorId; 
    const navigate = useNavigate();
    console.log(vendorId);

    // from backend get all the stuff we need to display.. idek what.......... fuck
    const vendorDetails = {
        'name': 'Kelv',
        'allForms': {'form1': {'status':'Read only', 'id': 1}, 'form2': {'status':'read only', 'id': 2}},
        'incompleteForms': {'form3': {'status':'vendor', 'action': 'incomplete', 'id' :3}, 'form4': {'status':'admin', 'action': 'continue draft', 'id':4}},
        'completedForms': {'form5':{'status':'complete', 'id':5}, 'form6':{'status': 'complete', 'id': 6, 'submission': 289}}
    }
    const vendorName = vendorDetails['name'];
    const allForms = vendorDetails['allForms'];
    const incompleteForms = vendorDetails['incompleteForms'];
    const completedForms = vendorDetails['completedForms'];

    const back = () =>{
        navigate(-1);
    }

    const goToForm = (formId) =>{
      navigate("/react/viewform/" + formId)
    };

    // for accordion 
    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = (panel) => (event, isExpanded) =>{
      setExpanded(isExpanded? panel : false);
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
                <div className='formHeader'>
                  Awaiting Approval
                </div>

                <Container className='displayAllForms'>
                  {Object.keys(allForms).map((formName, index) => {
                    return(
                    <Row className='formRow'>
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
                    )
                  })}
                </Container>

                {/* for all forms that are incomplete */}
                <div className='formHeader'>
                  Incompleted Forms
                </div>
                <div className='accordion'>
                  {/* for admin vaction */}
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
                        {Object.keys(incompleteForms).map((formName, i) => {
                          const formStatus = incompleteForms[formName]['status'];
                          if (formStatus === 'admin'){
                            return (
                              <Row className='formRow'>
                                <Col xs={12} md={8} className='homepageFormDetails'>
                                  <div className='homepageFormName'>
                                    {formName}
                                  </div>
                                  <div className='homepageFormStatus'>
                                    Status: {formStatus}
                                  </div>
                                </Col>
                                <Col xs={6} md={4} xl={2}>
                                  <button className='formButton' size="lg" style={{backgroundColor: '#7f7f7f', color: '#edfffe', fontStyle:'none'}} onClick={() => goToForm(allForms[formName]['id'])}>
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
                  
                  {/* for vendor action */}
                  <Accordion className='vendorAccord' expanded={expanded === 'vendor'} onChange={handleAccordionChange('vendor')}>
                    <AccordionSummary 
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls = 'vendor-content'
                      id='vendor-header'>
                        <div sx={{flexShrink: 0 }} className='accordTitle'>
                          Vendor Action
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Container >
                        {Object.keys(incompleteForms).map((formName, i) => {
                          const formStatus = incompleteForms[formName]['status'];
                          if (formStatus === 'vendor'){
                            return (
                              <Row className='formRow'>
                                <Col xs={12} md={8} className='homepageFormDetails'>
                                  <div className='homepageFormName'>
                                    {formName}
                                  </div>
                                  <div className='homepageFormStatus'>
                                    Status: {formStatus}
                                  </div>
                                </Col>
                                <Col xs={6} md={4} xl={2}>
                                  <button className='formButton' size="lg" style={{backgroundColor: '#7f7f7f', color: '#edfffe', fontStyle:'none'}} onClick={() => goToForm(allForms[formName]['id'])}>
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

            
            </div>
        </>
    )

}