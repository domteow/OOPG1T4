import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../../api/axios'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate, useParams } from 'react-router-dom'
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
import DisplayQuestionnaire from './displayquestionnaire';
import RadioButton from './radiobutton';
import Select from './select';
import Questionnaire from './questionnaire';

export default function Newform(){
    const formId  = useParams()['formId'];
    const options = ['New Questionnaire'];
    console.log(formId);
    const [formName, setFormName] = useState('');
    const [formCode, setFormCode] = useState('');
    const [effectiveDate, setEffectiveDate] = useState('');
    const [form, setForm] = useState({});
    // questionnaires store all the original questionnaires
    const [questionnaires, setQuestionnaires] = useState([]);
    const [newForm, setNewForm] = useState([]);
    const [inputList, setInputList] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[1]);
    // questionnaireList stores all the existing questionnaires that can be added
    const [questionnaireList, setQuestionnaireList] = useState([]);
    // store all new data for questionnaries
    const [edittedData, setEdittedData] = useState([]);
    const navigate = useNavigate();

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
                    setEdittedData([...edittedData, questionnaire]);
                    // setQuestionnaires([...questionnaires, questionnaire]);
                }
            })
        }
        else{
            setInputList([...inputList, value]);
            setEdittedData([...edittedData, '']);
            // setQuestionnaires([...questionnaires, ""]);
        }
    };
    /* END OF ONCLICK INPUT THING TO ADD INPUTFIELD */

    //  ON CLICK, DELETE THE INPUT FIELD
    const handleRemoveInputField = index => {
        // remove data of questionnaire from editted data
        const newData = [...edittedData];
        newData.splice(index, 1);
        setEdittedData(newData);

        // remove from input list
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

    const handleFormName = (e) => {
        setFormName(e.target.value);
    }

    const handleFormCode = (e) => {
        setFormCode(e.target.value);
    }

    const handleEffectiveDate = (e) => {
        setEffectiveDate(e.target.value);
    }

    useEffect(() => {
        const getAllForms = async() =>{
            try{
                const response = await axios.get("/api/v1/form/get/id/" + formId)
                console.log([response.data.data]);
                setForm(response.data.data);
                setQuestionnaires(response.data.data.questionnaires);
                setEdittedData(response.data.data.questionnaires);
                setFormName(response.data.data.description);
                setFormCode(response.data.data.formCode);
                setEffectiveDate(response.data.data.effectiveDate);
            }
            catch(error){
                console.log(error);
            }
        }
        getAllForms();
    }, [formId]);

    // console.log(form);
    console.log(questionnaires);

    const formDetails = (data, index) => {
        // data represents each questionnaire
        console.log(data);
        const newFormDetails = questionnaires.map((item, i) => {
            if (index === i){
                return data;
            }

            else{
                return item;
            }
        });
        setQuestionnaires(newFormDetails);

        const editData = edittedData.map((item, i) => {
            if (index === i){
                return data;
            }

            else{
                return item;
            }
        })
        setEdittedData(editData);
    }


    const submitForm = {
        description: formName, 
        formCode: formCode,
        effectiveDate: effectiveDate,
        questionnaires : edittedData,
        formStatus: "published",
        revisionNo: form.revisionNo+1
    }

    const handleUpdateForm = async() => {
        console.log("DOM DOM DO THIS");

        // try {
        //     const response = await axios.post('/api/v1/form/createForm', submitForm);
        //     console.log(response);
        //     if (response.data.status == 201) {
        //         navigate('../react/allforms')
        //         alert('Form template added successfully')
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const handleCancelForm = () => {
        navigate(-1);
    }

    console.log('rhystan');
    console.log(submitForm);
    console.log('rhystan');
    /* THIS IS TO RENDER THE ADDING OF INPUT FIELDS */
    const renderInputField = (item, i) =>{
        const newIndex = i + questionnaires.length;
        if(item === 'New Questionnaire'){
            return(
                <>
                    <CreateQuestionnaire formDetails={formDetails} id={newIndex} value={questionnaires[i]}/>
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
    console.log(formName);
    console.log(formCode);
    return(
        <>
            <Navbar />
            
            <div>
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
                                        value={formName}
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
                                        value={formCode}
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
                                        value = {effectiveDate}
                                        onChange={handleEffectiveDate}
                                        type='date'
                                        sx={{width: '100%'}}
                                    >
                                        {effectiveDate}
                                    </TextField>
                                </Col>
                            </Row>
                        </Container>
                    </FormControl>
                    {/* to display existing form stuff*/} 
                    <div>
                        {questionnaires.map((questionnaire, index) =>{
                            return(
                                <DisplayQuestionnaire value={questionnaire} id={index} formDetails={formDetails} />
                            )
                        })}
                    </div>

                    {/* this is to display new questionnaires */}
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

                    <div className='buttonFormRow'>
                        <button onClick={handleCancelForm} className='cancelFormButton'>
                            Cancel
                        </button>

                        <button onClick={handleUpdateForm} className='createFormButton'>
                            Update Form
                        </button>
                    </div>


                </div>
            </div>
        </>
    )
}