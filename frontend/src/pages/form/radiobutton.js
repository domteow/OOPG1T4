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

const RadioButton = ({allDetails}) => {
    const [radioQuestion, setRadioQuestion] = useState('');
    const [radioOptions, setRadioOptions] = useState([]);
    const [prevOption, setPrevOption] = useState([]);
    const [prevQuestion, setPrevQuestion] = useState('');      


    const handleQuestionChange = (e) => {
        setRadioQuestion(e.target.value);
    };
    
    const handleOptionChange = (e, index) => {
        const updatedOptions = [...radioOptions];
        updatedOptions[index] = e.target.value;
        setRadioOptions(updatedOptions);
    };

    const handleAddOption = () => {
        setRadioOptions([...radioOptions, ""]);
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = [...radioOptions];
        updatedOptions.splice(index, 1);
        setRadioOptions(updatedOptions);
    };

    const data = {
        question: radioQuestion,
        options: radioOptions,
        type: 'radio'
    }

    useEffect(()=>{
        if (prevQuestion !== radioQuestion){
            setPrevQuestion(radioQuestion);
            allDetails(data);
        }
        if(prevOption!== radioOptions){
            setPrevOption(radioOptions);
            allDetails(data);
        }
    })
   

    return(
        <>
            <div className='newFormInput'>
                <TextField value={radioQuestion} sx={{width: '100%'}} onChange={handleQuestionChange} placeholder="Question"/>

                {radioOptions.map((option, index) => (
                    <div key={index} className="radioOption">
                    
                        <TextField value={option} sx={{width: '70%'}} onChange={(e) => handleOptionChange(e, index)} placeholder="Option"/>
                        <DeleteIcon onClick={() => handleRemoveOption(index)}/>
                    </div>
                ))}

                <button onClick={handleAddOption} className="addRadio">
                    <AddIcon/>Add Option
                </button>

            </div>
            
        </>
    )
}

export default RadioButton;