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
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function AssignForm(){
    const navigate = useNavigate();
    const vendorId = useParams().vendorId;
    console.log(vendorId);
    const [incompleteForms, setIncompleteForms] = useState([]);
    const [completedForms, setCompletedForms] = useState([]);
    const [readOnlyForms, setReadOnlyForms] = useState([]);
    const [approvedForms, setApprovedForms] = useState([]);
    const [assignedForms, setAssignedForms] = useState([]);
    const [allForms, setAllForms] = useState([]);
    const [selectedValue, setSelectedValue] = useState(0);
    const [assignedNames, setAssignedNames] = useState([]);

    const getFormData = async () => {
        try {
            const response = await axios.get("/api/v1/formResponse/getFormsByVendorId/" + vendorId)
            console.log(response.data.data)
            // store in state
            setAssignedForms(response.data.data)
            // store locally for the stuff below
            const assignedForms = response.data.data
            console.log(assignedForms);
            
            assignedForms.map(form => {
                if(form['status'] === 'completed'){
                    if (completedForms.indexOf(form) === -1){
                        setCompletedForms(prevCompletedForms => ([...prevCompletedForms, form]));
                    }
                }
                else if(form['status'] === 'incomplete'){
                    if (incompleteForms.indexOf(form) === -1){
                        setIncompleteForms(prevIncompletedForms => ([...prevIncompletedForms, form]));
                    }
                }
                else if(form['status'] === 'readonly'){
                    if (readOnlyForms.indexOf(form) === -1){
                        setReadOnlyForms(prevForms => ([...prevForms, form]));
                    }
                }
                else if (form['status'] === 'approved'){
                    if (approvedForms.indexOf(form) === -1){
                        setApprovedForms(prevForms => ([...prevForms, form]));
                    }
                }
            });
          
        } 
        catch (error) {
  
        }
    }

    const getAllForms = async() =>{
        try{
            const response = await axios.get("/api/v1/form/get")
            // console.log([response.data.data]);
            setAllForms(response.data.data);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getFormData();
        getAllForms();
    }, []);
    console.log(allForms);
    console.log(assignedForms);


    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    }
    console.log(selectedValue)

    const handleCancelForm = () => {
        navigate(-1);
    }
    const data = {
        vendorId: vendorId,
        formId: selectedValue
    }
    const handleAssign = async() => {
        console.log(vendorId);
        console.log(selectedValue);

        try{
            const response = await axios.get('api/v1/formResponse/assignFormToVendor/' + selectedValue + '/' + vendorId);
            console.log(response.data);
            if (response.data.status == 200) {
                navigate('/react/viewvendor/' + vendorId)
                alert('Form assigned successfully')
            }
        }
        catch(error){
            console.log(error);
        }
    }


    return(
        <>
            <Navbar/>
            <div className='mainContent'>
                <div className='welcomeAdmin'>
                    Assign Form:
                </div>

                <div className='assignedFormsHeader'>
                    Assigned Forms
                </div>
                <Paper
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 1,
                        m: '3%',
                    }}
                    component="ul"
                    >
                    {assignedForms.map((form) => {
                        return (
                        <ListItem key={form.description}>
                            <Chip
                            label={form.description}
                            />
                        </ListItem>
                        );
                    })}
                </Paper>

                <div className='assignedFormsHeader'>
                    Select form to assign
                </div>
                <form>
                <Container>
                    <Row className='formRowHeader'>
                        <Col md={2}>
                        </Col>
                        <Col md={5}>
                            Form Name
                        </Col>
                        <Col md={3}>
                            Form Code
                        </Col>
                        <Col md={2}>
                            Revision Number
                        </Col>
                    </Row>
                    <fieldset>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        onChange={handleChange}
                    >
                        {allForms.map(form => {
                            if (assignedForms.indexOf(form) === -1){
                                return(
                                    <Row className='formRowData'>
                                        <Col md={2}>
                                            
                                            <FormControlLabel value={form.id} control={<Radio />}  />
                                        </Col>
                                        <Col md={5}>
                                            {form.description}
                                        </Col>
                                        <Col md={3}>
                                            {form.formCode}
                                        </Col>
                                        <Col md={2}>
                                            {form.revisionNo}
                                        </Col>
                                    </Row>
                                )
                            }
                        })}
                        </RadioGroup>
                    </fieldset>
                </Container>
                </form>

                <div className='buttonFormRow'>
                    <button onClick={handleCancelForm} className='cancelFormButton'>
                        Cancel
                    </button>

                    <button onClick={handleAssign} className='createFormButton'>
                        Assign Form
                    </button>
                </div>

            
            </div>
        </>
    )

}