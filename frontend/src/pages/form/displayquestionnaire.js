import React from 'react'
import { useState, useEffect, createContext, useContext } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../../index.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Dialogue from './dialogue';
import TextInput from './textfield';
import RadioButton from './radiobutton';
import Checkbox from './checkbox';
import Select from './select';
import NativeSelect from '@mui/material/NativeSelect';
import Subheader from './subheader';

const options = ['Sub Header', 'Text Field', 'Radio Button', 'Checkbox', 'Select'];

const DisplayQuestionnaire = ({formDetails, id, value}) => {
    const fields = value.fields; 
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[1]);
    const [inputList, setInputList] = useState(fields);
    const [questionnaireName, setQuestionnaireName] = useState(value.name);
    const [details, setDetails] = useState(fields);
    const assign = value.roleRequired.toLowerCase();
    const [assigned, setAssigned] = useState(assign);
    const [prevFields, setPreviousFields] = useState(fields);
    const [prevAssign, setPreviousAssign] = useState(assign);
    const [prevName, setPreviousName] = useState(value.name);

    /* DIALOGUE STUFF */
    // this is for opening the dialogue
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    // this is for closing the dialogue
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        setInputList([...inputList, value]);
        setDetails([...details, value]);
    };
    /* END OF DIALOGUE STUFF */

    const handleRemoveInputField = index => {
        const newInputs = inputList.map((item, i) => {
            if (i === index){
                return "";
            }
            else{
                return item;
            }
        });
        setInputList(newInputs);
    };

    const handleQuestionnaireTitleChange = (e) => {
        setQuestionnaireName(e.target.value);
    }

    const handleTextChange = (e, i)=>{
        const data = {
            question : e.target.value,
            type: 'text'
        }
        const newDetails = details.map((item, index)=>{
            if (index === i){
                return data
            }
            else{
                return item
            }
        });
        setDetails(newDetails);
    }

    const handleSubTextChange = (e, i)=>{
        const data = {
            question : e.target.value,
            type: 'subheader'
        }
        const newDetails = details.map((item, index)=>{
            if (index === i){
                return data
            }
            else{
                return item
            }
        });
        setDetails(newDetails);        
    }

    const handleSelectChange = (e) => { 
        setAssigned(e.target.value);
    }

    const allDetails = (data, index) => {
        console.log(data);
        const newDetails = details.map((item, i)=>{
            if (i === index){
                return data
            }
            else{
                return item
            }
        });
        setDetails(newDetails);
    }

    console.log("RHYS TANNNN")
    console.log(details)

    const newData = {
        name: questionnaireName,
        roleRequired: assigned,
        fields: details
    }
    console.log(newData);

    useEffect(() => {
        if (details !== prevFields){
            setPreviousFields(details);
            formDetails(newData, id);
        }
        if (assigned !== prevAssign){
            setPreviousAssign(assigned);
            formDetails(newData, id);
        }
        if (questionnaireName !== prevName){
            setPreviousName(questionnaireName);
            formDetails(newData, id);
        }
    })





    const renderInputField = (item, i) =>{
        const itemType = item.type;
        const itemName = item.name;
        const itemOptions = item.options;

        if(itemType === 'text' || item === 'Text Field'){
            return(
                <>
                    <>
                        <div className='newFormQuestion'>
                            <div>
                                <TextField name='text' placeholder='Question' sx={{width: '100%'}} defaultValue={itemName} onChange={(e)=>handleTextChange(e, i)}/>
                            </div>
                            <div>
                                <TextField name='answer' placeholder='Answer' sx={{width: '100%'}} disabled={true}/>
                            </div>
                        </div>
                    </>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Text Field
                    </button>
                </>
            )
        }
        else if(itemType === 'radio'){
            return(
                <>
                    <RadioButton id={i} allDetails={allDetails} value={itemName} options = {itemOptions} other={item.others} edit={true}/>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Radio
                    </button>
                </>
            )
        }
        else if(itemType === 'checkbox'){
            return(
                <>
                    <Checkbox id={i} allDetails={allDetails} value={itemName} options = {itemOptions} other={item.others} edit={true} />
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Checkbox
                    </button>
                </>
            )
        }
        else if(itemType === 'select'){
            return(
                <>
                    <Select id={i} allDetails={allDetails} value={itemName} options = {itemOptions} edit = {true} />
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Select
                    </button>
                </>
            )
        }
        else if (itemType === 'subheader' || item === 'Sub Header'){
            return(
                <>
                    <div className='radioOption'>
                        <TextField name='text' placeholder='Subheader' sx={{width: '100%'}} defaultValue={itemName}  onChange={(e)=>handleSubTextChange(e, i)}/>
                    </div>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Subheader
                    </button>
                </>
            )
        }
        else if(item === 'Radio Button'){
            return(
                <>
                    <RadioButton id={i} allDetails={allDetails} value={''} options={[]} other={false} edit={false}/>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Radio
                    </button>
                </>
            )
        }
        else if(item === 'Checkbox'){
            return(
                <>
                    <Checkbox id={i} allDetails={allDetails} value={''} options={[]} other={false} edit={false} />
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Checkbox
                    </button>
                </>
            )
        }
        else if(item === 'Select'){
            return(
                <>
                    <Select id={i} allDetails={allDetails} value={''} options={[]} edit={false} />
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Select
                    </button>
                </>
            )
        }
    }

    return(
        <>
            <div className='questionnaireContent'>
                <div>
                    <div className='formQuestion'>
                        Questionnaire Name:
                    </div>
                    {/* title of questionnaire */}
                    <div  xs={12} md={10} className='formInput'>
                        <TextField
                            required
                            id="formName"
                            name="formName"
                            type='text'
                            sx={{width: '100%'}}
                            defaultValue={value.name}
                            onChange={handleQuestionnaireTitleChange}
                        />
                    </div>
                </div>

                {inputList.map((item, i) =>{
                    return(
                        <div key={i}>
                            {renderInputField(item, i)}
                        </div>
                    )
                })}

                <Container>
                    <Row>
                        <Col md={1}>
                            Assignment:
                        </Col>
                        <Col>
                            <NativeSelect
                                defaultValue={assigned}
                                onChange={handleSelectChange}
                                inputProps={{
                                    id: 'uncontrolled-native',
                                    name:'Assigned',
                                }}>
                                
                                <option value='admin' >Admin</option>
                                <option value='approver' >Approver</option>
                                <option value='vendor' >Vendor</option>
                            </NativeSelect>
                        </Col>
                    </Row>
                </Container>

                <button onClick={handleClickOpen} className='addFieldButton'>
                    <AddIcon/> Add 
                </button>

                <Dialogue 
                    id= 'newQuestionnaire'
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                />

            </div>
        </>
    )
}



export default DisplayQuestionnaire;

