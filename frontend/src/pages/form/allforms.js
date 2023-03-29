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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';


export default function Allforms(){
    // get all forms from backend
        // snackbar
    const [open, setOpen] = React.useState(false);
    const [forms, setForms] = useState([])
    const [msg, setMsg] = useState();
    const [isActive, setIsActive] = useState({});

    const getAllForms = async() =>{
        try{
            const response = await axios.get("/api/v1/form/get")
            // console.log([response.data.data]);
            setForms(response.data.data);
            const act = {};
            response.data.data.map((form) => {
                const id = form.id;
                const isAct = form.active; 
                act[id] = isAct;
            })
            setIsActive(act);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getAllForms();
        const message = localStorage.getItem('message');
        console.log(message);

        if (message !== 'null' && message !== null){
            setMsg(message);
            displayMessage();      
        }

    }, []);

    console.log(isActive);

    const displayMessage = () => {
        setOpen(true);
        setTimeout(()=>{
            setOpen(false);
            localStorage.setItem('message', null);
        }, 3000)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
        localStorage.setItem('message', null);
        setMsg(null);
    };

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
        // navigate('/react/allforms/editform/' + id);
        navigate('/react/formedit/' + id);
    }

    console.log(forms);

    const handleActive = (formId) => {

        const active = isActive[formId];
        console.log(active);
        setIsActive(prev => ({
            ...prev, 
            [formId]: !active
        }))
        console.log(isActive);
        deleteForm(formId);
    }

    const deleteForm = async(formId) => {
        
        console.log(formId)
        try{
            const response = await axios.put("/api/v1/form/delete/" + formId)
            console.log(response.data);
            setMsg("Form status updated!");
            // setOpen(true);
            displayMessage();
            // getAllForms();
        }
        catch(error){
            console.log(error);
        }
    }

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

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
                            <Col xs={12} md={3} className='headerCenter'>
                                Name
                            </Col>
                            <Col xs={12} md={2} className='headerCenter'>
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
                            <Col xs={12} md={1} className='headerCenter'>
                                Status
                            </Col>
                        </Row>

                        {forms.map((form)=>{
                            const formId = form.id;
                            return(
                                <Row className='formDataRow'>
                                    <Col xs={12} md={3} className='headerCenter'>
                                        {form.description}
                                    </Col>
                                    <Col xs={12} md={2} className='headerCenter'>
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
                                        <Switch
                                            checked = {isActive[formId]}
                                            name = {form}
                                            onChange={() => handleActive(formId)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </Col>
                                </Row>
                            )
                        })}
                    </Container>
                </div>
            </div>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={msg}
                action={action}
            />
        </>
    )
}