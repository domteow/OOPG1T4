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
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
import Dialogue from './dialogue';
import CreateQuestionnaire from './createquestionnaire';
import Questionnaire from './questionnaire';
import RadioButton from './radiobutton';
import Select from './select';



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

    // FROM BACKEND GET THE EXISTING QUESTIONNAIRES and add into options 
    const questionnaireList = [
        {
            'name' : 'Questionnaire 1',
            'id': 'q1' 
        },
        {
            'name' : 'Questionnaire 2',
            'id': 'q2'
        },
        {
            'name' : 'Questionnaire 3',
            'id': 'q3' 
        },
        {
            'name' : 'Questionnaire 4',
            'id': 'q4' 
        }
    ];

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
            console.log(value);
            questionnaireList.map((questionnaire) => {
                const name = questionnaire.name;
                const id = questionnaire.id;
                if (name === value){
                    console.log(questionnaire.id);
                    setInputList([...inputList, id]);
                    setFormData([...formData, id]);
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

    console.log(inputList);

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
        questionnaires : formData
    }
    console.log("LOOK HERE FOR FORM DATA")
    console.log(submitForm)

    const handleCreateForm = () => {
        console.log(submitForm);
    }

    const handleCancelForm = () => {
        navigate(-1);
    }

    /* THIS IS TO RENDER THE ADDING OF INPUT FIELDS */
    const renderInputField = (item, i) =>{
        console.log(item);
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
                <div className='welcomeAdmin'>
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

                <button onClick={handleCreateForm} className='createFormButton'>
                    Create Form
                </button>
            </div>
        </>
    )
}