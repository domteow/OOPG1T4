import React from 'react'
import axios from '../../api/axios'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Route, Routes, BrowserRouter, useLocation, useParams, useNavigate } from 'react-router-dom'
import logo from '../../assets/quantum.png'
import '../../index.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../navbar'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import CircularProgress from '@mui/material/CircularProgress';
import { get } from 'react-hook-form'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ApproveForm() {
    const formids  = useParams()['formId'];    
    const [formID, setFormID] = useState(formids);
    const [questionnaires, setQuestionnaires] = useState({});
    const [formToSend, setFormToSend] = useState({}); 
    const [form, setForm] = useState({});
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [formStatus, setFormStatus] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [revisionNo, setRevisionNo] = useState('');
    const [questionnaireIds, setQuestionnaireIds] = useState([]);
    const [upTo, setUpTo] = useState();
    const navigate = useNavigate();
    const [qnInds, setQnInds] = useState([]);
    const [load, setLoad] = useState(true);
    const [open, setOpen] = React.useState(false);

    // TODO: add POST request to backend to update form response

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const getData = async() => {
                const response = await axios.get("/api/v1/formResponse/getFormByFormResponseID/" + formID);
                setForm(response.data.data)
                    const localform = response.data.data;
                    setQuestionnaires(localform.questionnaires);
                    setFormStatus(localform.status);
                    setRevisionNo(localform.revisionNo);
                    setUpTo(localform.upTo);
                    setLoading(false);
            };
            getData();
        }, 800);
    }, [formID]);

    if (isLoading) {
        return (
            <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            }}> <CircularProgress /> Form loading in progress... {console.log("loading state")}</div>
        );
    }

    const handleChange = (qnIndex, dIndex) => (e) => {
        const value = e.target.value;
        setQuestionnaires((prevState) => {
            const updatedQuestionnaires = { ...prevState };
            updatedQuestionnaires[qnIndex]['fields'][dIndex]['value'] = value;
            return updatedQuestionnaires;
    })};

    const handleCheckboxChange = (qnIndex, dIndex) => (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        setQuestionnaires((prevState) => {
            const updatedQuestionnaires = { ...prevState };
            const fields = updatedQuestionnaires[qnIndex]['fields'];

            if (isChecked){
                if(fields[dIndex]['value'] === null){
                    fields[dIndex]['value'] = [value];
                } else {
                fields[dIndex]['value'].push(value);
                }
            } else{
                fields[dIndex]['value'] = fields[dIndex]['value'].filter((item) => item !== value);
            }

            return updatedQuestionnaires;
        })

        
    }

    const handleSelectChange = (qnIndex, dIndex) => (e) => {
        const value = e.target.value;
        setQuestionnaires((prevState) => {
            const updatedQuestionnaires = { ...prevState };
            updatedQuestionnaires[qnIndex]['fields'][dIndex]['value'] = value;
            return updatedQuestionnaires
        })
    }

    const isFormValid = (questionnaires) => {
        let count = 0;
        console.log(questionnaires);
        Object.keys(questionnaires).map((key, i) => {
            if (i < upTo){
                const questionnaire = questionnaires[key];
                const fields = questionnaire.fields; 

                fields.map((field, i) => {
                    const val = field.value;
                    if (field.type != 'subheader' && field.type != 'header' && field.type != 'subtext'){
                        if (val == null){
                            count = count + 1;
                        }
                    }
                })
            }
        })
        if (count == 0) {
            return true;
        }

        else{
            return false;
        }
    }

    console.log(questionnaires)
    const handleSubmit = () => {
        const canSubmit = isFormValid(questionnaires);
        console.log(canSubmit);
        if (canSubmit){
            submit();
        }

        else{
            setOpen(true);   
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});         
        }
    }

    // to submit the form 
    const submit = async() => {
        console.log(questionnaires)
        console.log(revisionNo)
        const updatedRevisionNo = revisionNo + 1;
        setRevisionNo(updatedRevisionNo);
        console.log(updatedRevisionNo)
        
        const updatedFormToSend = ({ ...form, "revisionNo": updatedRevisionNo, "questionnaires": Object.values(questionnaires) })

          try {
            const response = await axios.put("/api/v1/formResponse/updateFormResponse/" + formID, updatedFormToSend)
            console.log(response);
            if(response.data.status >= 200) {
                localStorage.getItem('role')
                localStorage.setItem('message', 'Form completed!')
                if (role === 'Vendor'){
                    navigate('/react/vendor/homepage')
                }
                else if (role === 'Admin'){
                    navigate('/react/admin/homepage')
                }
                else if (role === 'Approver'){
                    navigate('/react/approver/homepage')
                }
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }
    const submitDraft = async() => {
        console.log(questionnaires)
        console.log(revisionNo)
        const updatedRevisionNo = revisionNo + 1;
        setRevisionNo(updatedRevisionNo);
        console.log(updatedRevisionNo)
        
        const updatedFormToSend = ({ ...form, "revisionNo": updatedRevisionNo, "questionnaires": Object.values(questionnaires) })

        try {
        const response = await axios.put("/api/v1/formResponse/saveFormResponseAsDraft/" + formID, updatedFormToSend)
        console.log(response);
        console.log(response.status)
        if(response.data.status >= 200) {
            localStorage.setItem('message', 'Form response saved successfully');
            localStorage.getItem('role')
            
            if (role === 'Vendor'){
                navigate('/react/vendor/homepage')
            }
            else if (role === 'Admin'){
                navigate('/react/admin/homepage')
            }
            else if (role === 'Approver'){
                navigate('/react/approver/homepage')
            }
        }
            
        } catch (error) {
            console.log(error)
        }
    }
  
    const cancel = () =>{
        localStorage.getItem('role')
        navigate(-1);
    }

        return (
            <>
                <Navbar />

                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                        <Alert
                        severity="error"
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        >
                        Please complete the necessary fields!
                        </Alert>
                    </Collapse>
                </Box>

                <Container className='formPage'>
                    <Row className='formDetailsRow'>
                        <Col className='formName'>
                            {form['description']}
                        </Col>

                        <Col className='formDeets'>
                            <div>
                                {form['formCode']}
                            </div>
                            <div>
                                {form['effectiveDate']}
                            </div>
                        </Col>
                    </Row>

                    <form>
                        {
                        Object.values(questionnaires).map((question, qnIndex)=>{
                            // compare the questionnaire index qnIndex to the upTo number upTo
                            // questionnaire index must be < upTo number 

                            const roleRequired = question.roleRequired;
                            // console.log(roleRequired);
                            // console.log(question);
                            // console.log(upTo);
                            // console.log(role);
                            var disabled = true;

                            // check those that could be edited then 
                            if (qnIndex < upTo){
                                disabled = false;

                                if (form.pendingUserInput != role || formStatus == 'readonly' || formStatus == 'completed' || roleRequired != role || question.complete){
                                    disabled = true;
                                }

                            }
                            
                            return(
                                <>
                                    {Object.values(question['fields']).map((detail, dIndex)=>{
                                    
                                        const inputType = detail['type'];

                                        if (inputType == 'text'){
                                            // for input type string, number, text all 
                                            return(
                                                <fieldset>
                                                    <Row className='formRow'>
                                                        <Col xs={6} md={2} xl={2} className='formQuestion'>
                                                            {detail.name}
                                                        </Col>
                                                        <Col xs={12} md={10} className='formInput'> 
                                                            <FormControl fullWidth>
                                                                <TextField
                                                                    required
                                                                    label="Required"
                                                                    id={detail.id}
                                                                    name={detail.name}
                                                                    onChange={handleChange(qnIndex, dIndex)}
                                                                    type={inputType}
                                                                    value={detail.value}
                                                                    disabled={disabled}
                                                                />
                                                            </FormControl>
                                                        </Col>
                                                    </Row>
                                                </fieldset>
                                            )
                                        }
                                        else if (inputType == 'subheader'){
                                            return(
                                                <div className='displaySubheader'>
                                                    {detail.name}
                                                </div>
                                            )
                                        }
                                        else if (inputType == 'subtext'){
                                            return(
                                                <div className='subtext'>
                                                    {detail.name}
                                                </div>
                                            )
                                        }
                                        else if (inputType == 'header'){
                                            return (
                                                <div className='headertext'>
                                                    {detail.name}
                                                </div>
                                            )
                                        }
                                        else{
                                            const typeMultiSelect = inputType;
                                            
                                            if (typeMultiSelect == 'radio'){
                                                // for input type radio 
                                                return (
                                                    <fieldset>
                                                        <Row className='formRow'>
                                                            <Col xs={6} md={2} xl={2} className='formQuestion'>
                                                            {detail.name}
                                                            </Col>
                                                            <Col xs={12} md={10} className='formInput'>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                                    name={detail.name}
                                                                    onChange={handleChange(qnIndex, dIndex)}
                                                                    required
                                                                    
                                                                >
                                                                    {detail['options'].map(option =>{
                                                                        //console.log(detail['options'][0])
                                                                        return(
                                                                            <FormControlLabel disabled={disabled} required value={option} control={<Radio checked={option === detail['value']}/>} label={option} />
                                                                            )
                                                                    })}
                                                                </RadioGroup>
                                                                
                                                                
                                                            </Col>
                                                        </Row>
                                                    </fieldset>
                                                )
                                            }
                                            else if (typeMultiSelect == 'checkbox') {
                                                // for input type checkbox 
                                                return (
                                                    <fieldset>
                                                        <Row className='formRow'>
                                                            <Col xs={6} md={2} xl={2} className='formQuestion'>
                                                            {detail.name}
                                                            </Col>
                                                            <Col xs={12} md={10} className='formInput'>
                                                                <FormGroup>
                                                                {detail['options'].map(option =>{
                                                                    const isChecked = detail['value'].includes(option);
                                                                    return(
                                                                        <div>
                                                                            <FormControlLabel disabled={disabled} control={<Checkbox checked={isChecked} />} type={typeMultiSelect} id={option} name={detail.name} required value = {option} onChange={handleCheckboxChange(qnIndex, dIndex)} label = {option}/>
                                                                            {/* <input type={typeMultiSelect} id={option} name={question} value = {option} onChange={handleChange}/>  */}
                                                                        </div>
                                                                    )
                                                                })}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </fieldset>
                                                )
                                            }
                                            else if (typeMultiSelect == 'select') {
                                                // for input type select
                                                return (
                                                    <fieldset>
                                                        <Row className='formRow'>
                                                            <Col xs={6} md={2} xl={2} className='formQuestion'>
                                                            {detail.name}
                                                            </Col>
                                                            <Col xs={12} md={10} className='formInput'>
                                                                <FormGroup>
                                                                
                                                                    
                                                                        <div>
                                                                            <select required id={detail.name} name={detail.name} disabled={disabled} value = {questionnaires[qnIndex]['fields'][dIndex]['value']} onChange={handleSelectChange(qnIndex, dIndex)}>
                                                                            {detail['options'].map((selection, idx) => (
                                                                                <option key={idx} value={selection} selected={selection === questionnaires[qnIndex]['fields'][dIndex]['value']}>
                                                                                    {selection}
                                                                                </option>
                                                                                ))}

                                                                            </select>
                                                                            {/* <input type={typeMultiSelect} id={option} name={question} value = {option} onChange={handleChange}/>  */}
                                                                        </div>
                                                                    
                                                                
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </fieldset>
                                                )
                                            }
                                        }
                                    })}
                                </>
                            )
                        })}
                    </form>
                </Container>

                <div className="buttonFormRow">
                    <span className='formCancelRow'>
                        <button className='cancelButt' onClick={cancel}>Cancel</button>                           
                    </span>

                    <span className='formSubmitRow'>
                        <button className='saveDraft' onClick={submitDraft}>Save Draft</button>
                        <button className='submitButt' onClick={handleSubmit}>Approve Form</button>
                    </span>

                </div>
            </>
        )
    }


  
    

















