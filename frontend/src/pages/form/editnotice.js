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
import CircularProgress from '@mui/material/CircularProgress';
import DisplayNotice from './displayNotice'
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NewQuestionnaire from './newquestionnaire';
import Alert from '@mui/material/Alert';

const options = ['Header', 'Sub Header', 'Subtext', 'Text Field'];

export default function EditNotice() {
    const formId = useParams().formId;
    const [formData, setFormData] = useState([]);
    const [form, setForm] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [initialQuestionnaire, setInitialQuestionnaire] = useState([]);

    const [formName, setFormName] = useState("");
    const [formCode, setFormCode] = useState("");
    const [inputList, setInputList] = useState([]);
    const [details, setDetails] = useState([]);
    const [open, setOpen] = useState(false);
    const [counter, setCounter] = useState();
    const [formNameError, setFormNameError] = useState(null);
    const [formCodeError, setFormCodeError] = useState(null);
    const [dateError, setDateError] = useState(null);
    const [selectedValue, setSelectedValue] = useState(options[1]);
    const [effectiveDate, setEffectiveDate] = useState("");
    const [initialFields, setInitialFields] = useState([]);
    const navigate = useNavigate();
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrormessage] = useState();

    const handleClose = (value) => {
        if (value != 'Cancel'){
            console.log(initialFields.length + details.length)
            setCounter(initialFields.length + details.length + 1);
            setOpen(false);
            setSelectedValue(value);
            const newFields = [...initialFields,...details]
            if (newFields.length > 0) {
                const lastitem = newFields[newFields.length - 1];
                const len = lastitem.id;
                const data = {
                    type: value,
                    id:len +1,
                    name: '',
                    options: []
                }
                setInputList([...inputList, data]);
                setDetails([...details, data]);
            }
            else{
                const data = {
                    type: value,
                    id:1,
                    name: '',
                    options: []
                }
                setInputList([...inputList, data]);
                setDetails([...details, data]);
            }
        }
        else{
            setOpen(false);
        }
        
    };
    useEffect(() => {
        setTimeout(() => {

        
        const getAllForms = async() =>{
            try{
                const response = await axios.get("/api/v1/form/get/id/" + formId)
                console.log(response.data.data)
                setForm(response.data.data);
                setFormName(response.data.data.description);
                setFormCode(response.data.data.formCode);
                setEffectiveDate(response.data.data.effectiveDate);
                setInitialQuestionnaire(response.data.data.questionnaires);
                console.log(response.data.data.questionnaires[0])
                setInitialFields(response.data.data.questionnaires[0].fields);
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
        setIsLoading(false);
        }, 800);
    }, [formId]);

    const handleRemoveInputField = id => {
        const newInputs = inputList.map((item, i) => {
            const idx = item.id;
            if (id === idx){
                return "";
            }
            else{
                return item;
            }
        });
        setInputList(newInputs);
        // search for the index of the item with the id to splice it out
        const index = details.findIndex(item => item.id === id);
        if (index >= 0) {
            const newData = [...details];
            newData.splice(index, 1);
            setDetails(newData);
        }

        if (newInputs.length === 0) {
            setInputList([]);
          }
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleTextChange = (e, id)=>{
        const data = {
            name : e.target.value,
            type: 'text',
            id:id
        }
        const newDetails = details.map((item, index)=>{
            const idx = item.id;
            if (id === idx){
                return data
            }
            else{
                return item
            }
        });
        setDetails(newDetails);
    }

    const handleSubTextChange = (e, id)=>{
        const data = {
            name : e.target.value,
            type: 'subtext',
            id:id
        }
        const newDetails = details.map((item, index)=>{
            const idx = item.id;
            if (idx === id){
                return data
            }
            else{
                return item
            }
        });
        setDetails(newDetails);
    }
  

    const handleSubheaderChange = (e, id)=>{
        const data = {
            name : e.target.value,
            type: 'subheader',
            id:id
        }
        const newDetails = details.map((item, index)=>{
            const idx = item.id;
            if (idx === id){
                return data
            }
            else{
                return item
            }
        });
        setDetails(newDetails);
    }

    const handleHeaderChange = (e, id)=>{
        const data = {
            name : e.target.value,
            type: 'header',
            id:id
        }
        const newDetails = details.map((item, index)=>{
            const idx = item.id;
            if (idx === id){
                return data
            }
            else{
                return item
            }
        });
        setDetails(newDetails);
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


    const validateFields = (details) => {
        console.log(details);
       
        let count = 0;
        details.map((detail,i) => {
            if (detail.name != null && detail.name != ''){
                count = count + 1;
            }
        })

        if(count == details.length){
            return true;
        }
        else{
            setErrormessage('Error! Some fields are missing.')
            setOpenError(true);
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});   
        }
    }

    const handleUpdateForm = () => {
        const isFields = validateFields([...initialFields,...details]);
        if (isFields) {
            handleSubmitForm();
            console.log(submitdata);
        }
    }

    const handleSubmitForm = async() => {
        // console.log("DOM DOM DO THIS");
        console.log(submitdata)
        try {
            const response = await axios.post('/api/v1/form/reviseFormById/' + formId, submitdata);
            console.log(response);
            if (response.data.status == 201) {
                navigate('../react/allforms')
                // alert('Form template added successfully')
                localStorage.setItem('message', 'Notice template added successfully')
            }
        } catch (error) {
            console.log(error);

        }
    }

    const handleCancelForm = () => {
        navigate(-1);
    }

    const handleRemoveIniInputField = id => {
        // const newInputs = initialFields.map((item, i) => {
        //     const idx = item.id;
        //     if (id === idx){
        //         return "";
        //     }
        //     else{
        //         return item;
        //     }
        // });
        // setInitialFields(newInputs);
        // search for the index of the item with the id to splice it out
        // const index = details.findIndex(item => item.id === id);
        // if (index >= 0) {
        //     const newData = [...details];
        //     newData.splice(index, 1);
        //     setDetails(newData);
        // }

        // if (newInputs.length === 0) {
        //     setInputList([]);
        //   }
        const newInputs = [...initialFields];
        newInputs.map((item, i) => {
            if (item.id == id){
                newInputs.splice(i,1);
            }
        })
        setInitialFields(newInputs);
    };
    
    const handleIniTextChange = (e, id)=>{
        const data = {
            name : e.target.value,
            type: 'text',
            id:id,
            value: null,
            option: null
        }
        const newDetails = initialFields.map((item, index)=>{
            const idx = item.id;
            if (id === idx){
                return data
            }
            else{
                return item
            }
        });
        setInitialFields(newDetails);
    }

    const handleIniSubTextChange = (e, id)=>{
        const data = {
            name : e.target.value,
            type: 'subtext',
            id:id,
            value: null,
            option: null
        }
        const newDetails = initialFields.map((item, index)=>{
            const idx = item.id;
            if (idx === id){
                return data
            }
            else{
                return item
            }
        });
        setInitialFields(newDetails);
    }
  

    const handleIniSubheaderChange = (e, id)=>{
        const data = {
            name : e.target.value,
            type: 'subheader',
            id:id,
            value: null,
            option: null
        }
        const newDetails = initialFields.map((item, index)=>{
            const idx = item.id;
            if (idx === id){
                return data
            }
            else{
                return item
            }
        });
        setInitialFields(newDetails);
    }

    const handleIniHeaderChange = (e, id)=>{
        const data = {
            name : e.target.value,
            type: 'header',
            id:id,
            value: null,
            option: null
        }
        const newDetails = initialFields.map((item, index)=>{
            const idx = item.id;
            if (idx === id){
                return data
            }
            else{
                return item
            }
        });
        setInitialFields(newDetails);
    }


    console.log(initialFields)

    const submitdata = {
        description: formName,
        formCode: formCode,
        formStatus: 'readonly',
        effectiveDate: effectiveDate,
        questionnaires: [{
            fields: [...initialFields,...details],
            name: 'Read Only Notice',
            roleRequired:'readonly'
        }],
        revisionNo: form.revisionNo + 1

    }

    const renderInitialInputField = (it, i) =>{
        const type = it.type;
        const name = it.name;
        const opt = it.options;
        const id = it.id;
        if(type === 'header'){
            
            return(
                <div key ={id}>
                    <div className='radioOption' >
                        <TextField name='text' defaultValue={name} placeholder='Header' sx={{width: '100%'}} className='headertext' onChange={(e)=>handleIniHeaderChange(e, id)}/>
                    </div>
                    <button className='deleteInputButton' onClick={()=>handleRemoveIniInputField(id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Header
                    </button>
                </div>
            )
        }

        else if (type === 'subheader'){
            return(
                <div key ={id}>
                    <div className='radioOption' key={id}>
                        <TextField name='text' defaultValue={name} placeholder='Subheader' sx={{width: '100%'}}  onChange={(e)=>handleIniSubheaderChange(e, id)}/>
                    </div>
                    <button className='deleteInputButton' onClick={()=>handleRemoveIniInputField(id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Subheader
                    </button>
                </div>
            )
        }

        else if (type === 'subtext'){
            return(
                <div key ={id}>
                    <div className='radioOption' key={id}>
                        <TextField name='text' defaultValue={name} placeholder='Subtext' sx={{width: '100%'}} className='subtext' onChange={(e)=>handleIniSubTextChange(e, id)}/>
                    </div>
                    <button className='deleteInputButton' onClick={()=>handleRemoveIniInputField(id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Subtext
                    </button>
                </div>
            )
        }

        else if (type === 'text'){
            return(
                <div key ={id}>
                    <>
                        <div className='newFormQuestion' key={id}>
                            <div>
                                <TextField multiline rows={5} defaultValue={name} name='text' placeholder='Text' sx={{width: '100%', height: '20%'}} onChange={(e)=>handleIniTextChange(e, id)}/>
                            </div>
                        </div>
                    </>
                    <button className='deleteInputButton' onClick={()=>handleRemoveIniInputField(id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Text Field
                    </button>
                </div>
            )
        }

        else if (type === 'Cancel'){
            return (<></>);
        }

        else if (type === ""){
            return(<></>)
        }
    }

    const renderInputField = (it, i) =>{
        const type = it.type;
        const name = it.name;
        const opt = it.options;
        const id = it.id;
        if(type === 'Header'){
            
            return(
                <>
                    <div className='radioOption'>
                        <TextField name='text' placeholder='Header' sx={{width: '100%'}} className='headertext' onChange={(e)=>handleHeaderChange(e, id)}/>
                    </div>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Header
                    </button>
                </>
            )
        }

        else if (type === 'Sub Header'){
            return(
                <>
                    <div className='radioOption'>
                        <TextField name='text' placeholder='Subheader' sx={{width: '100%'}}  onChange={(e)=>handleSubheaderChange(e, id)}/>
                    </div>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Subheader
                    </button>
                </>
            )
        }

        else if (type === 'Subtext'){
            return(
                <>
                    <div className='radioOption'>
                        <TextField name='text' placeholder='Subtext' sx={{width: '100%'}} className='subtext' onChange={(e)=>handleSubTextChange(e, id)}/>
                    </div>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Subtext
                    </button>
                </>
            )
        }

        else if (type === 'Text Field'){
            return(
                <>
                    <>
                        <div className='newFormQuestion'>
                            <div>
                                <TextField multiline rows={5} name='text' placeholder='Text' sx={{width: '100%', height: '20%'}} onChange={(e)=>handleTextChange(e, id)}/>
                            </div>
                        </div>
                    </>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Text Field
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
    }
    console.log(initialFields)

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
                        {errorMessage} 
                        </Alert>
                    </Collapse>
                </Box>

            <div className='newFormContent'>
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
                                        disabled={true}
                                        onChange={handleFormName}
                                        type='text'
                                        sx={{width: '100%'}}
                                        value={formName}
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
                                        disabled={true}
                                        onChange={handleFormCode}
                                        type='text'
                                        sx={{width: '100%'}}
                                        value={formCode}
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
                                        value={effectiveDate}
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
                    {/* to display existing form stuff*/} 
                    <div>
                        <div className='noticecontent'>
                            {initialFields.map((field, i) => {
                               
                                // const fields = item.fields;
                                // const ind = item.id;
                                return (
                                    <div>
                                        <>
                                            {renderInitialInputField(field, i)}
                                        </>
                                    </div>
                                ); 
                                    
                            })}
                        </div>
                            
                    </div>
                        {/* <div> */}
                            <div className='noticecontent'>
                                {inputList.map((item, i)=>{
                                    console.log(item);
                                    return(
                                        <div>
                                            {renderInputField(item, i)}
                                        </div>
                                    )
                                })}
                            </div>
                        {/* </div> */}

                        <button onClick={handleClickOpen} className='dialogueButton'>
                            <AddIcon/> Add Field
                        </button>

                        <Dialogue 
                            id='notice'
                            selectedValue={selectedValue}
                            open={open}
                            onClose={handleClose}
                        />
                    
                </div>
            

                <div className="buttonFormRow">
                    <button onClick={handleCancelForm} className='cancelFormButton'>
                        Cancel
                    </button>

                    <button onClick={handleUpdateForm} className='createFormButton anyButton'>
                        Update Notice
                    </button>
                </div>
            </div>
        </>
    )
}