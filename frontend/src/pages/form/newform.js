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
    const [count, setCount] = useState(0);
    const [formNameError, setFormNameError] = useState(null);
    const [formCodeError, setFormCodeError] = useState(null);
    const [dateError, setDateError] = useState(null);

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

                const data = {
                    id: id,
                    type: 'questionnaire'
                }
                if (name === value){
                    setInputList([...inputList, data]);
                    setFormData([...formData, questionnaire]);
                }
            })
        }
        else{
            setCount((prev) => prev+1)
            const data = {
                count: count,
                type: 'New Questionnaire'
            }
            setInputList([...inputList, data])
            setFormData([...formData, data]);
        }
    };
    /* END OF ONCLICK INPUT THING TO ADD INPUTFIELD */

    //  ON CLICK, DELETE THE INPUT FIELD
    const handleRemoveInputField = index => {
        const newData = [...formData];
        newData.splice(index, 1);
        setFormData(newData);

        formData.map((item, i) => {
            if (item.count == index){
                const newDat = [...formData];
                newDat.splice(i, 1);
                setFormData(newDat);
            }
        })

        inputList.map((item, i) => {
            if (item.count == index){
                const newInp = [...inputList];
                newInp.splice(i, 1);
                setInputList(newInp);
            }
        })


        // const newDat = inputList.map((item, i) => {
        //     if (item.count === index){
        //         return "";
        //     }
        //     else{
        //         return item;
        //     }
        // }); 
        // setInputList(newDat);
    };

    const handleRemoveQuestionnaireInput = (id) => {
        console.log(id);

        formData.map((item, i) => {
            console.log(item.id);
                console.log(id)
                console.log(item.id == id)
            if (item.id == id){
                
                const newDat = [...formData];
                newDat.splice(i, 1);
                setFormData(newDat);
            }
        })

        inputList.map((item, i) => {
            console.log(item.id);
            console.log(id)
            console.log(item.id == id)
            if (item.id == id){
                const newInp = [...inputList];
                newInp.splice(i, 1);
                setInputList(newInp);
            }
        })
    }

    console.log(formData);

    const formDetails = (data, index) => {
        console.log(data);
        // const newFormDetails = [...formData];
        // newFormDetails.map((item, i) => {
        //     console.log(item);
        //     console.log(item.count);
        //     console.log(data.count);
        //     console.log(item.count == data.count);
        //     if (item.count == data.count){
        //         return data;
        //     }
        //     else{
        //         return item;
        //     }
        // })
        const newFormDetails = formData.map((item, i) => {
            console.log(data.count);
            console.log(item);
            const ctr = item.count;
            if (data.count === ctr){
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

    console.log(submitForm)
    const validateFormName = (formName) => {
        const parts = formName.replace(/ /g, '');
        if (parts.length >0){
            return true;
        }
        else{
            setFormNameError('Please enter a form name');
        }
    }

    const validateFormCode = (formCode) => {
        const parts = formCode.replace(/ /g, '');
        if (parts.length >0) {
            return true;
        }
        else{
            setFormCodeError("Please enter a form code")
        }
    }

    // const validateDate = (date) => {
    //     const days = ['01', 1, '03', 3, '05', 5, '07', 7, '08', 8, 10, 12]
    //     const parts = date.split('-');
    //     const year = parts[0];
    //     const month = parts[1];
    //     const day = parts[2];
    //     console.log(parts);
    //     if (year > 2014 && year < 3000){
    //         if (month == '02' || month == 2){
    //             if (day >0 && day < 30){
    //                 return true;
    //             }
    //         }
    //         else if (days.includes(month) >= 0){
    //             if (day > 0 && day < 32){
    //                 return true;
    //             }
    //         }
    //         else if (days.includes(month) == -1 ){
    //             if (day > 0 && day < 31){
    //                 return true;
    //             }
    //         }
    //     }
    //     else{
    //         setDateError("Please enter a valid date");
    //     }
    // }

    const handleCreateForm = () => {
        setFormNameError(null);
        setFormCodeError(null);
        setDateError(null);

        const isFormName = validateFormName(formName);
        const isFormCode = validateFormCode(formCode);
        // const isDate = validateDate(effectiveDate);
        
        if (isFormName && isFormCode){
            handleSubmitNewForm();
        }
    }

    
    console.log('FORM TO SUBMIT')
    console.log(submitForm)
    const handleSubmitNewForm = async() => {

        try {
            const response = await axios.post('/api/v1/form/createForm', submitForm);
            console.log(response);
            if (response.data.status == 201) {
                localStorage.setItem('message', 'Form template added successfully')
                navigate('../react/allforms')
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
        console.log(item);
        const type = item.type;
        console.log(item.id);
        const id = item.id;
        if(type === 'New Questionnaire'){
            return(
                <>
                    <CreateQuestionnaire formDetails={formDetails} id={item.count} value={formData[i]}/>
                    <button className='deleteQuestionnaireButton' onClick={()=>handleRemoveInputField(item.count)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Questionnaire
                    </button>
                </>
            )

        }

        else if (type === 'Cancel'){
            return (<></>);
        }

        else if (type === ""){
            return(<></>)
        }

        else{
            // to display an existing questionnaire 
            return (
                <>
                    <Questionnaire id={id}/>
                    <button className='deleteQuestionnaireButton' onClick={()=>handleRemoveQuestionnaireInput(id)}>
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
                                        error={formNameError !== null} 
                                    />
                                </Col>
                                {formNameError && <div className='errorMsg' >{formNameError}</div>}
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
                                        error={formCodeError !== null} 
                                    />
                                </Col>
                                {formCodeError && <div className='errorMsg' >{formCodeError}</div>}
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
                                        error={dateError !== null} 
                                    />
                                </Col>
                                {dateError && <div className='errorMsg' >{dateError}</div>}
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