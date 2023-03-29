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

export default function FormEdit(){
    const formId = useParams().formId;
    const options = ['New Questionnaire'];
    const [questionnaireList, setQuestionnaireList] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({});
    const [formName, setFormName] = useState('');
    const [formCode, setFormCode] = useState('');
    const [effectiveDate, setEffectiveDate] = useState('');
    const [initialQuestionnaire, setInitialQuestionnaire] = useState([]);
    const [countIni, setCountIni] = useState(0)
    const [selectedValue, setSelectedValue] = useState(options[1]);
    const navigate = useNavigate();
    const [inputList, setInputList] = useState([]);
    const [formData, setFormData] = useState([]);
    const [count, setCount] = useState(0);
    const [prevQ, setPrevQ] = useState([]);
    

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

    const handleClickOpen = () => {
        setOpen(true);
    };

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
            setCount((prev) => prev+1)
            const data = {
                count: count,
            }
            setInputList([...inputList, value])
            setFormData([...formData, data]);
        }
    }

    useEffect(() => {
        const getAllForms = async() =>{
            try{
                const response = await axios.get("/api/v1/form/get/id/" + formId)
                setForm(response.data.data);
                setFormName(response.data.data.description);
                setFormCode(response.data.data.formCode);
                setEffectiveDate(response.data.data.effectiveDate);
                setInitialQuestionnaire(response.data.data.questionnaires);
                // response.data.data.questionnaires.map((item, i) => {
                //     console.log(countIni)
                //     const newD = {...item, countIni:countIni}
                //     setInitialQuestionnaire((prev) => [...prev, newD]);
                // })
                // setCountIni(prev => prev + 1);
            }
            catch(error){
                console.log(error);
            }
        }
        getAllForms();
    }, [formId]);

    const initialDetails = (data, index) => {
        console.log(data);
        const newdata = initialQuestionnaire.map((item, i) => {
            if (item.id == data.id){
                return data; 
            }
            else{
                return item 
            }
        })
        setInitialQuestionnaire(newdata);
    }

    const handleRemoveInitialQuest = (index) => {
        initialQuestionnaire.map((item, i) =>{
            if (item.id == index){
                const newdat = [...initialQuestionnaire];
                newdat.splice(i, 1);
                setInitialQuestionnaire(newdat);
                console.log(item);
            }
        })
        
    }
    console.log(initialQuestionnaire);
    console.log(formData);

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
    console.log(formData);

    const handleFormName = (e) => {
        setFormName(e.target.value);
    }

    const handleEffectiveDate = (e) => {
        setEffectiveDate(e.target.value);
    }

    const handleFormCode = (e) => {
        setFormCode(e.target.value);
    }

    const formDetails = (data, index) => {
        console.log(data);
        const newFormDetails = formData.map((item, i) => {
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

    console.log([...initialQuestionnaire, ...formData]);
    const submitdata = {
        description: formName,
        formCode: formCode,
        effectiveDate: effectiveDate,
        questionnaires: [...initialQuestionnaire, ...formData],
        formStatus: "published",
        revisionNo: form.revisionNo + 1
    }
    console.log(submitdata)
    const handleUpdateForm = async() => {
        // console.log("DOM DOM DO THIS");

        try {
            const response = await axios.post('/api/v1/form/reviseFormById/' + formId, submitdata);
            console.log(response);
            if (response.data.status == 201) {
                navigate('../react/allforms')
                alert('Form template added successfully')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelForm = () => {
        navigate(-1);
    }
 
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
                    <Questionnaire id={count}/>
                    <button className='deleteQuestionnaireButton' onClick={()=>handleRemoveInputField(count)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Questionnaire
                    </button>
                </>
            )
            
        }
    
    }

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

                        
                
                        {initialQuestionnaire.map((item, i) => {
                            console.log(item)
                            
                            const ind = item.id;
                            return(
                                <>
                                    <DisplayQuestionnaire value={item} key={ind} initialDetails={initialDetails}/>
                                    <button className='deleteQuestionnairebutt' onClick={()=>handleRemoveInitialQuest(ind)}>
                                        <DeleteIcon sx={{fontSize: 30}}/> Delete Questionnaire
                                    </button>
                                    
                                </>
                            )                            
                        })}
                    </div>

                    <div>
                        {inputList.map((item, i) => {
                        
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