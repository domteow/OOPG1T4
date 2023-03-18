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
    const [details, setDetails] = useState([]);
    


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
        
    }

    const handleSubTextChange = (e, i)=>{
        
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

    const renderInputField = (item, i) =>{
        const itemType = item.type;
        const itemName = item.name;
        const itemOptions = item.options;
        console.log(item);

        if(itemType === 'text'){
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
                    <RadioButton id={i} allDetails={allDetails} value={itemName} options = {itemOptions}/>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Radio
                    </button>
                </>
            )
        }
        else if(itemType === 'checkbox'){
            return(
                <>
                    <Checkbox id={i} allDetails={allDetails} value={itemName} options = {itemOptions}/>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Checkbox
                    </button>
                </>
            )
        }
        else if(itemType === 'select'){
            return(
                <>
                    <Select id={i} allDetails={allDetails} value={itemName} options = {itemOptions}/>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Select
                    </button>
                </>
            )
        }
        else if (itemType === 'subheader'){
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

            </div>



            <button onClick={handleClickOpen} className='addFieldButton'>
                <AddIcon/> Add 
            </button>

            <Dialogue 
                id= 'newQuestionnaire'
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </>
    )



}



export default DisplayQuestionnaire;

