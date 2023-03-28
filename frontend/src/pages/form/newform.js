import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../../api/axios'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../../index.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
import Dialogue from './dialogue';
import CreateQuestionnaire from './createquestionnaire';
import Questionnaire from './questionnaire';
import RadioButton from './radiobutton';
import Select from './select';

import NewQuestionnaire from './newquestionnaire';

export default function Newform(){
    const options = ['New Questionnaire'];
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[1]);
    const [newFormList, setNewFormList] = useState({});
    const [inputList, setInputList] = useState([]);
    const [formData, setFormData] = useState([]);
    const [formName, setFormName] = useState("");
    const [formCode, setFormCode] = useState("");
    const [effectiveDate, setEffectiveDate] = useState("");
    const navigate = useNavigate();
    const [questionnaireList, setQuestionnaireList] = useState([]);

    const getAllQuestionnaires = async() =>{
        try{
            const response = await axios.get("/api/v1/questionnaire/getAllQuestionnaires")
            // console.log([response.data.data]);
            setQuestionnaireList(response.data.data);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getAllQuestionnaires();
    }, []);

    /* THIS IS TO OPEN THE DIALOGUE TO CHOOSE WHAT TO ADD */
    const handleClickOpen = () => {
        setOpen(true);
    };
    /* END OF OPEN DIALOGUE FUNCTION THING */

    /* ONCLICK ON THE INPUT THING, DIALOGUE CLOSES, WHEN CLOSE, IT WILL UPDATE THE INPUTLIST THAT WILL BE USED TO RENDER THE RENDERINPUTFIELD */
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        if (value !== 'New Questionnaire'){
            questionnaireList.map((questionnaire) => {
                const name = questionnaire.name;
                const id = questionnaire.id;
                if (name === value){
                    setInputList([...inputList, id]);
                    setFormData([...formData, questionnaire]);
                }
            })
        }
        else{
            setInputList([...inputList, value])
            setFormData([...formData, ""]);
        }
    };
    /* END OF ONCLICK INPUT THING TO ADD INPUTFIELD */

    //  ON CLICK, DELETE THE INPUT FIELD
    const handleRemoveInputField = index => {
        const newData = [...formData];
        newData.splice(index, 1);
        setFormData(newData);

        const newDat = inputList.map((item, i) => {
            if (i === index){
                return "";
            }
            else{
                return item;
            }
        }); 
        setInputList(newDat);
    };

    const formDetails = (data, index) => {
        const newFormDetails = formData.map((item, i) => {
            if (index === i){
                return data;
            }

            else{
                return item;
            }
        });
        setFormData(newFormDetails);
    }

    const handleFormName = (e) => {
        setFormName(e.target.value);
    }

    const handleFormCode = (e) => {
        setFormCode(e.target.value);
    }

    const handleEffectiveDate = (e) => {
        setEffectiveDate(e.target.value);
    }

    const submitForm = {
        description: formName, 
        formCode: formCode,
        effectiveDate: effectiveDate,
        questionnaires : formData,
        revisionNo: 1
    }

    console.log("LOOK HERE FOR FORM DATA")
    console.log(submitForm)

    // DOM LOOK HERE PLEASE YOU NEED CONNECT THE BACKEND HERE JUST NEED CONNECT AND PASS submitForm TO THE BACKEND TYVM
    const handleCreateForm = async() => {
        console.log("DOM DOM DO THIS");

        try {
            const response = await axios.post('/api/v1/form/createForm', submitForm);
            console.log(response);
            if (response.data.status == 201) {
                localStorage.setItem('message', 'Form template added successfully')
                navigate('../react/allforms')
                // alert('Form template added successfully')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelForm = () => {
        navigate(-1);
    }

    /* THIS IS TO RENDER THE ADDING OF INPUT FIELDS */
    const renderInputField = (item, i) =>{
        if(item === 'New Questionnaire'){
            return(
                <>
                    <CreateQuestionnaire formDetails={formDetails} id={i} value={formData[i]}/>
                    <button className='deleteQuestionnaireButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Questionnaire
                    </button>
                </>
            )
        }

        else if (item === 'Cancel'){
            return (<></>);
        }

        else if (item === ""){
            return(<></>)
        }

        else{
            // to display an existing questionnaire 
            return (
                <>
                    <Questionnaire id={item}/>
                    <button className='deleteQuestionnaireButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Questionnaire
                    </button>
                </>
            )
        }
    }
    /* END OF RENDER OF ADDING OF INPUT FIELDS */

    return(
        <>
            <Navbar />

            <div className='newFormContent'>
                <div className='newformheader'>
                    New Form
                </div>

                <div className = 'standardInputForm'>
                    <FormControl fullWidth>
                        <Container>
                            <Row>
                                <Col xs={6} md={2} xl={2} className='formQuestion'>
                                    Form Name:
                                </Col>
                                <Col  xs={12} md={10} className='formInput'>
                                    <TextField
                                        required
                                        id="formName"
                                        name="formName"
                                        onChange={handleFormName}
                                        type='text'
                                        sx={{width: '100%'}}
                                    />
                                </Col>
                            </Row>

                            <Row className="newFormRow" >
                                <Col xs={6} md={2} xl={2} className='formQuestion'>
                                    Form Code:
                                </Col>
                                <Col  xs={12} md={6} xl = {6} className='formInput'>
                                    <TextField
                                        required
                                        id="formCode"
                                        name="formCode"
                                        onChange={handleFormCode}
                                        type='text'
                                        sx={{width: '100%'}}
                                    />
                                </Col>
                                <Col xs={6} md={2} xl={2} className='formQuestion'>
                                    Effective Date:
                                </Col>
                                <Col  xs={6} md={2} xl = {2} className='formInput'>
                                    <TextField
                                        required
                                        id="effectiveDate"
                                        name="effectiveDate"
                                        onChange={handleEffectiveDate}
                                        type='date'
                                        sx={{width: '100%'}}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </FormControl>
                        <div>
                            {inputList.map((item, i)=>{
                                console.log(item);
                                return(
                                    <div>
                                        {renderInputField(item, i)}
                                    </div>
                                )
                            })}
                        </div>

                        <button onClick={handleClickOpen} className='dialogueButton'>
                            <AddIcon/> Add Questionnaire
                        </button>

                        <Dialogue 
                            id='newForm'
                            selectedValue={selectedValue}
                            open={open}
                            onClose={handleClose}
                        />
                    
                </div>
            </div>

            <div className="buttonFormRow">
                <button onClick={handleCancelForm} className='cancelFormButton'>
                    Cancel
                </button>

                <button onClick={handleCreateForm} disabled={inputList.length === 0} className='createFormButton anyButton'>
                    Create Form
                </button>
            </div>
        </>
    )
}