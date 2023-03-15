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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { fontSize } from '@mui/system'

export default function Checkbox(){
    const [newFormList, setNewFormList] = useState({});
    const [checkboxQuestion, setCheckboxQuestion] = useState('');
    const [checkboxOptions, setCheckboxOptions] = useState([]);
    const [formData, setFormData] = useState({
        checkboxQuestions: [{ question: "", options: [] }]
      });

    
    const handleQuestionChange = (e) => {
        setCheckboxQuestion(e.target.value);
    };

    const handleOptionChange = (e, index) => {
        const updatedOptions = [...checkboxOptions];
        updatedOptions[index] = e.target.value;
        // checked: updatedOptions[index] ? updatedOptions[index].checked : false
        
        setCheckboxOptions(updatedOptions);
    }

    const handleCheckboxChange = (e, index) => {
        const updatedOptions = [...checkboxOptions];
        updatedOptions[index] = {
            option: updatedOptions[index.option],
            checked: e.target.checked
        };
        setCheckboxOptions(updatedOptions);
    }

    const handleAddOption = () => {
        setCheckboxOptions([...checkboxOptions, ""]);
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = [...checkboxOptions];
        updatedOptions.splice(index, 1);
        setCheckboxOptions(updatedOptions);
    };

    console.log(checkboxQuestion)
    console.log(checkboxOptions)

    



    // /* THIS IS TO ADD A VALUE INTO CHECKLIST, WHICH MEANS ON CLICK ON ADD BUTTON, A NEW CHECKBOX OPTION IS ADDED */
    // const [checkboxList, setCheckboxList] = useState([]);
    // const addCheckboxOption = () => {
    //     setCheckboxList([...checkboxList, checkboxList.length]); // use length to specify the index of the radio option
    // }
    // console.log(checkboxList);
    // const handleRemoveCheckboxOption = index => {
    //     // DOM HELP ME PLEASE I NEED TO LIKE ON CLICK DELETE THE CORRECT OPTION COS IDK WHY IT JUST DELETES THE MOST RECENT OPTION :(         
    //     const list = [...checkboxList];
    //     list.splice(index, 1);
    //     setCheckboxList(list);
    // };
    // console.log(checkboxList);

    // const renderCheckboxOption = (i)=>{
    //     return (
    //         <div className='checkboxOption'>
    //             <TextField name='checkboxOption' className='newFormInput' placeholder='Option' sx={{width: '70%'}} onChange={e => handleInputChange(e, i)}/>
                
    //             <DeleteIcon onClick={()=>handleRemoveCheckboxOption(i)} sx={{fontSize: 30, marginLeft:5, marginTop: 2}}/>
                
    //         </div>
    //     )
    // }

    // const renderTextField = (i)=>{
    //     return (
    //         <>
    //             <TextField name='checkboxQuestion' className='newFormInput' placeholder='Question' sx={{width: '100%'}} onChange={e => handleQuestion(e, i)} key={i}/>
    //         </>
    //     )
    // }

    return(
        <>
            <div>
                <br/>
                <TextField className='newFormInput' value={checkboxQuestion} sx={{width: '100%'}} onChange={handleQuestionChange} />
                <div>
                    {checkboxOptions.map((option, index)=>(
                        <div key={index} className="checkboxOption">
                        <br />
                        <TextField className='newFormInput' value={option} placeholder='Option' sx={{width: '70%'}} onChange={e => handleOptionChange(e, index)}/>
                        <DeleteIcon onClick={() => handleRemoveOption(index)}/>



                        </div>
                        
                        
                        

                    ))}
                </div>
                <div>   
                    <button onClick={handleAddOption} className='addCheckbox'>
                        <AddIcon/> Add Option
                    </button>
                </div>
            </div>
            
        </>
    )
}