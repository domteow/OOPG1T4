import React from 'react'
import axios from '../../api/axios'
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
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';


export default function Viewvendor(){
    const vendorId = useParams().vendorId; 
    const navigate = useNavigate();
    const [incompleteForms, setIncompleteForms] = useState([]);
    const [completedForms, setCompletedForms] = useState([]);
    const [readOnlyForms, setReadOnlyForms] = useState([]);
    const [approvedForms, setApprovedForms] = useState([]);
    const [allForms, setAllForms] = useState([]);
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);

    const getVendor = async() =>{
      
      try{
        const response = await axios.get("/api/v1/vendor/getVendor/" + vendorId)
        // console.log(response.data.data);
        setName(response.data.data.name);
      }
      catch (error){
        console.log(error);
      }
    }

    const getFormData = async () => {
      setApprovedForms([])
      setCompletedForms([])
      setIncompleteForms([])
      setReadOnlyForms([])
      setAllForms([])
      try {
        const response = await axios.get("/api/v1/formResponse/getFormsByVendorId/" + vendorId)
        
        // store in state
        setAllForms(response.data.data)
        // store locally for the stuff below
        
        const allforms = response.data.data
        console.log(allforms);
        allforms.forEach(form => {
          console.log(form)
          if(form.status === 'completed'){
            setCompletedForms(prevCompletedForms => ([...prevCompletedForms, form]))
           
          }
          else if(form.status === 'incomplete'){
            setIncompleteForms(prevIncompleteForms => ([...prevIncompleteForms, form]))
          
          }
          else if(form.status === 'readonly'){
            setReadOnlyForms(prevReadOnlyForms => ([...prevReadOnlyForms, form]))
           
          }
          else if (form.status === 'approved'){
            setApprovedForms(prevApprovedForms => ([...prevApprovedForms, form]))
          
          }
        });
        
      } catch (error) {

      }
    }

    useEffect(() => {
      getFormData();
      getVendor();
    }, []);

    // console.log(readOnlyForms);
     console.log(incompleteForms);
    // console.log(incompleteForms);

    const [rejId, setRejId] =useState('');

    const handleClickOpen = (formId) => {
      setOpen(true);
      setRejId(formId);
    };
  
    const handleClose = () => {
      setOpen(false);
      setRejId(null);
    };

    const [openDelete, setOpenDelete] = useState(false)
    const [delId, setDelId] = useState('')

    const openDel = (formId) => {
      setOpenDelete(true);
      setDelId(formId);      
    }

    const handleCloseDel = () => {
      setOpenDelete(false);
      setDelId('');
    }

  

    const back = () =>{
        navigate('/react/admin/homepage');
    }

    const goToForm = (formId) =>{
      navigate("/react/viewform/" + formId + "/" + vendorId)
    };

    // for accordion 
    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = (panel) => (event, isExpanded) =>{
      setExpanded(isExpanded? panel : false);
    }

    const assignform = () => {
      navigate("/react/assignform/" + vendorId);
    }

    
    const deleteForm = async() => {
      setOpenDelete(false);
      console.log(delId);
      try{
        const response = await axios.delete(
          "/api/v1/formResponse/deleteFormFromVendor/" + delId
        );
        console.log(response.data);
        getFormData();
      }
      catch (error) {
        console.error(error);
      }
    }

    const [rejectMsg, setRejectMsg] = useState('')
    const handleRejection = (e) => {
      setRejectMsg(e.target.value);
    }

    console.log(rejectMsg);

    const handleReject = async() => {
      console.log(rejId);
      console.log(rejectMsg);
      handleClose();
      try{
        const response = await axios.put("/api/v1/formResponse/rejectFormResponse/" + rejId, rejectMsg)
        getFormData();
      }
      catch (error){
        console.log(error);
      }
    }
    

    const handleDetails = () =>{
      navigate('/react/vendordetails/' + vendorId );
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
                  {name}
                  <span className='vendorDeets' onClick={handleDetails}>
                    <InfoIcon sx={{paddingBottom:'1%', fontSize:'40px'}}/>Vendor Details
                  </span>
              </div>

              <div className='assignFormButtRow'>
                <button className='assignForm' onClick={assignform}>
                    + Assign Form
                </button>
              </div>

            <div className='formHeader'>
              Approved
            </div>

            <Container className = 'homepageFormDisplay'>
              {approvedForms.map((form, index)=>{
                return(
                  <Row className='displayRow'  key={form}> 
                    <Col xs={12} md={7} className='homepageFormDetails'>
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
                    <Col xs={6} md={1} xl={1} className='companyHeader' >
                      <DeleteIcon onClick={() => openDel(form.id)} />
                    </Col>
                  </Row>                
                ) 
              })}
            </Container>

              {/* for all forms that are read only */}
              <div className='formHeader'>
                Notices
              </div>

              <Container className='displayAllForms'>
                {readOnlyForms.map((form, index) => {
                  return(
                  <Row className='formRow'>
                    <Col xs={12} md={7} className='homepageFormDetails'>
                      <div className='homepageFormName'>
                        {form.description}
                      </div>
                      <div className='homepageFormStatus'>
                        Status: {form.status}
                      </div>
                    </Col>
                    <Col xs={6} md={2} xl={2}>
                      <button className='formButton' size="lg" style={{backgroundColor: '#7f7f7f', color: '#edfffe', fontStyle:'none'}} onClick={() => goToForm(form.id)}>
                        View Form
                      </button>
                    </Col>
                    <Col xs={6} md={2} xl={2}>
                      <button className='formButton' size="lg" style={{backgroundColor: '#7f7f7f', color: '#edfffe', fontStyle:'none'}} onClick={() => handleClickOpen(form.id)}>
                        Reject Form
                      </button>
                    </Col>
                    <Col xs={6} md={1} xl={1} className='companyHeader' >
                      <DeleteIcon onClick={() => openDel(form.id)} />
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
                      {incompleteForms.map((form, i) => {
                        const formStatus = form.pendingUserInput;
                        if (formStatus === 'Admin'){
                          return (
                            <Row className='formRow'>
                              <Col xs={12} md={7} className='homepageFormDetails'>
                                <div className='homepageFormName'>
                                  {form.description}
                                </div>
                                <div className='homepageFormStatus'>
                                  Status: {form.status}
                                </div>
                              </Col>
                              <Col xs={6} md={2} xl={2}>
                                <button className='formButton' size="lg" style={{backgroundColor: '#7f7f7f', color: '#edfffe', fontStyle:'none'}} onClick={() => goToForm(form.id)}>
                                  View Form
                                </button>
                              </Col>
                              <Col xs={6} md={2} xl={2}>
                                <button className='formButton' size="lg" style={{backgroundColor: '#7f7f7f', color: '#edfffe', fontStyle:'none'}} onClick={() => handleClickOpen(form.id)}>
                                  Reject Form
                                </button>
                              </Col>
                              <Col xs={6} md={1} xl={1} className='companyHeader' >
                                <DeleteIcon onClick={() => openDel(form.id)} />
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
                      {incompleteForms.map((form, i) => {
                        const formStatus = form.pendingUserInput;
                        if (formStatus === 'Vendor'){
                          return (
                            <Row className='formRow'>
                              <Col xs={12} md={7} className='homepageFormDetails'>
                                <div className='homepageFormName'>
                                  {form.description}
                                </div>
                                <div className='homepageFormStatus'>
                                  Status: {form.status}
                                </div>
                              </Col>
                              <Col xs={6} md={2} xl={2}>
                                <button className='formButton' size="lg" style={{backgroundColor: '#7f7f7f', color: '#edfffe', fontStyle:'none'}} onClick={() => goToForm(form.id)}>
                                  View Form
                                </button>
                              </Col>
                              <Col xs={6} md={2} xl={2}>
                                <button className='formButton' size="lg" style={{backgroundColor: '#7f7f7f', color: '#edfffe', fontStyle:'none'}} onClick={() => handleClickOpen(form.id)}>
                                  Reject Form
                                </button>
                              </Col>
                              <Col xs={6} md={1} xl={1} className='companyHeader' >
                                <DeleteIcon onClick={() => openDel(form.id)}  />
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
                        <Col xs={6} md={1} xl={1} className='companyHeader' >
                          <DeleteIcon onClick={() => openDel(form.id)} />
                        </Col>
                      </Row>
                  )
                })}
              </Container>
          </div>

        <Dialog open={open} onClose={handleClose} fullWidth='90%'>
          <DialogTitle>Reject</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the reason(s) for rejection.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Reason(s) for rejection"
              type="text"
              fullWidth
              variant="standard"
              onChange = {handleRejection}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleReject}>Reject</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDelete} onClose={handleCloseDel} fullWidth='90%'>
          <DialogTitle>Delete Form</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Confirm deletion of form for vendor? 
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseDel}>Cancel</Button>
            <Button onClick={deleteForm} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        </>
    )
}