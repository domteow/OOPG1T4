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
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NewQuestionnaire from './newquestionnaire';
import Alert from '@mui/material/Alert';



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
    const [openError, setOpenError] = useState(false);
    const [errormessage, setErrormessage] = useState(null);

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
        else if (value != 'Cancel'){
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

    const validateQuestionnaire = (questionnaire) => {
        const question = questionnaire[questionnaire.length - 1];
        const rolereq = question.roleRequired;
        if (rolereq == 'Approver'){
            return true;
        }
        else{
            setErrormessage('Error! Form should end with a questionnaire for Approver.');
            setOpenError(true);
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});  
        }
    }

    const submitForm = {
        description: formName, 
        formCode: formCode,
        effectiveDate: effectiveDate,
        questionnaires : formData,
        revisionNo: 1,
        formStatus: 'published'
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

    const validateFields = (questionnaires) => {
        console.log(questionnaires);
        let count = 0;
        
        questionnaires.map((questionnaire,i) => {
            if (questionnaire.name != '' && questionnaire.name != null){
                let qcount = 0;
                const fields = questionnaire.fields;
                console.log(questionnaire);
                fields.map((field,i)=>{
                    if (field.type == 'radio' || field.type == 'checkbox' || field.type == 'select'){
                        if (field.name != '' && field.name != null){
                            const opts = field.options;
                            let optcount  = 0;
                            opts.map((options) => {
                                if (options.length > 0 && options != null){
                                    // count = count + 1;
                                    // qcount = qcount + 1;
                                    optcount = optcount + 1;
                                }
                            })
                            if (optcount == opts.length){
                                qcount = qcount + 1;
                            }
                        }
                    }
                    else{
                        console.log(field.name);
                        console.log(field.name != null && field.name!='')
                        if (field.name != null && field.name != ''){
                            // count = count + 1;
                            qcount = qcount + 1;
                        }
                    }
                })
                console.log(qcount);
                console.log(fields.length);
                if (qcount == fields.length){
                    count = count +1;
                }
            }
        })

        console.log(count);
        console.log(questionnaires.length);

        if(count == questionnaires.length){
            return true;
        }
        else{
            setErrormessage('Error! Some fields are missing.')
            setOpenError(true);
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});   
        }
    }

    const handleCreateForm = () => {
        setFormNameError(null);
        setFormCodeError(null);
        setDateError(null);
        const isQuestionnaire = validateQuestionnaire(formData);
        const isFormName = validateFormName(formName);
        const isFormCode = validateFormCode(formCode);
        const isFields = validateFields(formData);
        // const isDate = validateDate(effectiveDate);
        console.log(isFields);
        
        if (isFormName && isFormCode && isQuestionnaire && isFields){
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
            setErrormessage('Error! Form with form code already exists.')
            setOpenError(true);
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});         
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

            <Box sx={{ width: '100%' }}>
                    <Collapse in={openError}>
                        <Alert
                        severity="error"
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpenError(false);
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        >
                            {errormessage}
                        </Alert>
                    </Collapse>
                </Box>

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