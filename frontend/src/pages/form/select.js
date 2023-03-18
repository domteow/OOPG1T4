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

const Select = ({allDetails, id}) => {
    const [selectQuestion, setSelectQuestion] = useState('');
    const [selectOptions, setSelectOptions] = useState([]);
    const [prevOption, setPrevOption] = useState([]);
    const [prevQuestion, setPrevQuestion] = useState(''); 

    const handleQuestionChange = (e) => {
        setSelectQuestion(e.target.value);
    };

    const handleOptionChange = (e, index) => {
        const updatedOptions = [...selectOptions];
        updatedOptions[index] = e.target.value;        
        setSelectOptions(updatedOptions);
    }

    const handleAddOption = () => {
        setSelectOptions([...selectOptions, ""]);
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = [...selectOptions];
        updatedOptions.splice(index, 1);
        setSelectOptions(updatedOptions);
    };

    console.log(selectQuestion);
    console.log(selectOptions);

    const data = {
        name: selectQuestion,
        options: selectOptions,
        type: 'select'
    }

    useEffect(()=>{
        if (prevQuestion !== selectQuestion){
            setPrevQuestion(selectQuestion);
            allDetails(data, id);
        }
        if(prevOption!== selectOptions){
            setPrevOption(selectOptions);
            allDetails(data, id);
        }
    })

    return(
        <>
            <div className='newFormInput'>
                <TextField className='newFormInput' value={selectQuestion} sx={{width: '100%'}} onChange={handleQuestionChange} placeholder="Select Question"/>
                
                {selectOptions.map((option, index)=>(
                    <div key={index} className="selectOption">
                        <TextField className='newFormInput' value={option} placeholder='Select Option' sx={{width: '70%'}} onChange={e => handleOptionChange(e, index)}/>
                        <DeleteIcon onClick={() => handleRemoveOption(index)}/>
                    </div>
                ))}
                
                <button onClick={handleAddOption} className='addSelect'>
                    <AddIcon/> Add Option
                </button>
            
            </div>
            
        </>
    )
}

export default Select;