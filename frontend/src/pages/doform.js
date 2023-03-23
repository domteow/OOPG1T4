import React from 'react'
import axios from '../api/axios'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Route, Routes, BrowserRouter, useLocation, useParams, useNavigate } from 'react-router-dom'
import logo from '../assets/quantum.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../navbar'
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

export default function DoForm() {
    // const formID = useParams().formId;
    // const vendorId = useParams().vendorId;
    const formID = localStorage.getItem('formId');
    const vendorId = localStorage.getItem('vendorDoFormId');
    const role = localStorage.getItem('role');
    const [formToSend, setFormToSend] = useState({}); 
    const [form, setForm] = useState({});
    const [formStatus, setFormStatus] = useState('');
    const [revisionNo, setRevisionNo] = useState('');
    const [upTo, setUpTo] = useState();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [qnInds, setQnInds] = useState([]);
    const [questionnaires, setQuestionnaires] = useState({});


    // useEffect(() => {
    //     setTimeout(() => {
    //         const getData = async() => { 
    //             console.log('loading hehe')
    //             const response = await axios.get("/api/v1/formResponse/getFormByFormResponseID/"+formID)
    //             setForm(response.data.data);
    //             setQuestionnaires(response.data.data.questionnaires);
    //             //setFormStatus(response.data.data.status);
    //             // setRevisionNo(response.data.data.revisionNo);
    //             // setUpTo(response.data.data.upTo);
    //             setLoading(false);
    //         }

    //         getData();

    //     }, 800)
    // }, []);
    
    // useEffect(() => {
       
    //         const getData = async() => { 
    //             try{
    //             console.log('loading hehe')
    //             const response = await axios.get("/api/v1/formResponse/getFormByFormResponseID/"+formID)
    //             setForm(response.data.data);
    //             setQuestionnaires(response.data.data.questionnaires);
    //             //setFormStatus(response.data.data.status);
    //             // setRevisionNo(response.data.data.revisionNo);
    //             // setUpTo(response.data.data.upTo);
    //             // setLoading(false);
    //             }
    //             catch(error){
    //                 console.log(error);
    //             }
    //         }

    //         getData();

        
    // }, [formID]);

    useEffect(() => {
        const getAllForms = async() =>{
            try{
                const response = await axios.get("/api/v1/formResponse/getFormByFormResponseID/"+formID)
                console.log([response.data.data]);
                setForm(response.data.data);
                setQuestionnaires(response.data.data.questionnaires)
            }
            catch(error){
                console.log(error);
            }
        }
        getAllForms();
    }, [formID]);

    // handle input changes 
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

    // handle save/ submit 
    const handleSubmit = () => {

    }

    const submit = async() => {
        console.log(questionnaires)
        console.log(revisionNo)
        const revisionNum = form.revisionNo;
        const updatedRevisionNo = revisionNum + 1;
        setRevisionNo(updatedRevisionNo);
        console.log(updatedRevisionNo)
        
        const updatedFormToSend = ({ ...form, "revisionNo": updatedRevisionNo, "questionnaires": Object.values(questionnaires) })
        // console.log(updatedFormToSend)

          try {
            const response = await axios.put("/api/v1/formResponse/updateFormResponse/" + formID, updatedFormToSend)
            console.log(response);
            if(response.data.status >= 200) {

                alert("Form submitted successfully");
                localStorage.getItem('role')
                if (role === 'Vendor'){
                    navigate('/react/vendor/homepage')
                }
                else if (role === 'Admin'){
                    navigate('/react/viewvendor/' + vendorId)
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
            if(response.data.status >= 200) {
                alert("Form draft saved successfully");
                localStorage.getItem('role')
                if (role === 'Vendor'){
                    navigate('/react/vendor/homepage')
                }
                else if (role === 'Admin'){
                    navigate('/react/admin/homepage')
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const cancel = () =>{
        localStorage.getItem('role')
    }

    

    // if (isLoading) {
    //     return (
    //         <div style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //         justifyContent: "center",
    //         height: "100vh",
    //         }}> <CircularProgress /> Form loading in progress... {console.log("loading state")}</div>
    //     );
    // }

    const upToIndex = form.upTo;
    
        return (
            <>
                <Navbar />

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
                        {Object.values(questionnaires).map((question, qnIndex)=>{
                            // compare the questionnaire index qnIndex to the upTo number upTo
                            // questionnaire index must be < upTo number 
                            const roleRequired = question.roleRequired;
                            // console.log(roleRequired);
                            // console.log(question);
                            // console.log(upTo);
                            // console.log(role);
                            var disabled = false;
                            if (qnIndex < upToIndex){
                                console.log(qnIndex);
                                // check if questionnaire (question) is completed or read only or if rolerequired is not the person role
                                if (form.status == 'readonly' || form.status == 'completed' || roleRequired != role){
                                    disabled = true;
                                }

                                else if (question.complete === true){
                                   disabled = true;
                                }

                                else if (roleRequired == role && form.status == 'incomplete' && question.complete == false) {
                                    
                                    disabled = false;
                                    setQnInds((prev) => [...prev, qnIndex]);
                                }
                            }
                            else{
                                // if questionnaire index is more than or equal to upTo
                                disabled = true;
                            }
                            
                            return(
                                <>
                                    {Object.values(question['fields']).map((detail, dIndex)=>{
                                    
                                        const inputType = detail['type'];

                                        if (inputType == 'text'){
                                            // console.log(detail)
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
                                        else{
                                            const typeMultiSelect = inputType;
                                            // const multiOptions = inputType.slice();
                                            // multiOptions.splice(0,1);

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
                                                                        console.log(detail['options'][0])
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
                        <button className='submitButt' onClick={handleSubmit}>Submit</button>
                    </span>

                </div>
            </>
            
        )
    
}