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

const Checkbox = ({allDetails}) => {
    const [checkboxQuestion, setCheckboxQuestion] = useState('');
    const [checkboxOptions, setCheckboxOptions] = useState([]);
    const [prevOption, setPrevOption] = useState([]);
    const [prevQuestion, setPrevQuestion] = useState(''); 

    
    const handleQuestionChange = (e) => {
        setCheckboxQuestion(e.target.value);
    };

    const handleOptionChange = (e, index) => {
        const updatedOptions = [...checkboxOptions];
        updatedOptions[index] = e.target.value;        
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

    const data = {
        question: checkboxQuestion,
        options: checkboxOptions,
        type: 'checkbox'
    }

    useEffect(()=>{
        if (prevQuestion !== checkboxQuestion){
            setPrevQuestion(checkboxQuestion);
            allDetails(data);
        }
        if(prevOption!== checkboxOptions){
            setPrevOption(checkboxOptions);
            allDetails(data);
        }
    })

    return(
        <>
            <div className='newFormInput'>
                <TextField className='newFormInput' value={checkboxQuestion} sx={{width: '100%'}} onChange={handleQuestionChange} placeholder="Question"/>
                
                    {checkboxOptions.map((option, index)=>(
                        <div key={index} className="checkboxOption">
                            <TextField className='newFormInput' value={option} placeholder='Option' sx={{width: '70%'}} onChange={e => handleOptionChange(e, index)}/>
                            <DeleteIcon onClick={() => handleRemoveOption(index)}/>
                        </div>
                    ))}
            
                <button onClick={handleAddOption} className='addCheckbox'>
                    <AddIcon/> Add Option
                </button>
            </div>            
        </>
    )
}

export default Checkbox;