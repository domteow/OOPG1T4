import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../../index.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../api/axios'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';


export default function Allforms(){
    // get all forms from backend
    const [forms, setForms] = useState([])
    const getAllForms = async() =>{
        try{
            const response = await axios.get("/api/v1/form/get")
            // console.log([response.data.data]);
            setForms(response.data.data);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getAllForms();
    }, []);
    
    // navigate 
    const navigate = useNavigate();

    // create new form navigation 
    const goToNewForm = () =>{
        navigate('/react/newform');
    }

    const goToForm = (id) => {
        navigate('/react/allforms/viewform/' + id);
    }

    const editForm = (id) => {
        navigate('/react/allforms/editform/' + id);
    }

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

    const deleteForm = async() => {
        
        console.log(delId)
        try{
            const response = await axios.delete("/api/v1/form/delete/" + delId)
            console.log(response.data);
            setOpenDelete(false);
            getAllForms();
        }
        catch(error){
            console.log(error);
        }
    }


    const message = localStorage.getItem('message');
    console.log(message);



    return(
        <>
            <Navbar />

            <div className='allFormContent'>
                <div className='welcomeAdmin'>
                    Forms
                </div>

                <div className='buttonFormRow'>
                    <button className='newFormButton' onClick={() => goToNewForm()}>
                        Create New Form
                    </button>
                </div>

                <div className='allFormsContainer'>
                    <Container>
                        <Row className='formHeaderRow'>
                            <Col xs={12} md={3}>
                                Name
                            </Col>
                            <Col xs={12} md={2}>
                                Form Code
                            </Col>
                            <Col xs={12} md={1} className='headerCenter'>
                                Date 
                            </Col>
                            <Col xs={12} md={1} className='headerCenter'>
                                Id
                            </Col>
                            <Col xs={12} md={2} className='headerCenter'>
                                View
                            </Col>
                            <Col xs={12} md={2} className='headerCenter'>
                                Edit
                            </Col>
                            <Col xs={12} md={1}>
                                
                            </Col>
                        </Row>

                        {forms.map((form)=>{
                            const formId = form.id;
                            return(
                                <Row className='formDataRow'>
                                    <Col xs={12} md={3}>
                                        {form.description}
                                    </Col>
                                    <Col xs={12} md={2}>
                                        {form.formCode}
                                    </Col>
                                    <Col xs={12} md={1} className='headerCenter'>
                                        {form.effectiveDate}
                                    </Col>
                                    <Col xs={12} md={1} className='headerCenter'>
                                        {form.id}
                                    </Col>
                                    <Col xs={12} md={2} className='headerCenter'>
                                        <button className='viewForm' onClick={() => goToForm(formId)}>
                                            View Form
                                        </button>
                                    </Col>
                                    <Col xs={12} md={2} className='headerCenter'>
                                        <button className='editForm' onClick={() => editForm(formId)}>
                                            Edit Form
                                        </button>
                                    </Col>
                                    <Col xs={12} md={1} className='headerCenter'>
                                        <DeleteIcon onClick={() => openDel(form.id)} />
                                    </Col>
                                </Row>
                            )
                        })}


                    </Container>
                </div>
            </div>

            <Dialog open={openDelete} onClose={handleCloseDel} fullWidth='90%'>
                <DialogTitle>Delete Form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirm deletion of form? 
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