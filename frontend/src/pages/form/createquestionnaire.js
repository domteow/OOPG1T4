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
import Dialogue from './dialogue';
import TextInput from './textfield';

const options = ['Text Field', 'Radio Button', 'Checkbox', 'Dropdown'];

export default function CreateQuestionnaire(){
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[1]);
    const [inputList, setInputList] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        setInputList([...inputList, value]);
    };

    const renderInputField = (item) =>{
        if(item === 'Text Field'){
            return(<TextInput/>)
        }
        else if(item === 'Radio Button'){
            return(<div>hi3</div>)
        }
        else if(item === 'Checkbox'){
            return(<div>hi4</div>)
        }
        else if(item === 'Dropdown'){
            return(<div>hi5</div>)
        }
    }

    return(
        <>
            <div className='questionnaireContent'>
                <div>
                    {inputList.map((item, i)=>{
                        return(
                            <div>
                                {renderInputField(item)}
                            </div>
                        )
                    })}
                </div>
                <button onClick={handleClickOpen} className='dialogueButton'>
                    <AddIcon/> Add 
                </button>

                <Dialogue 
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                />
            </div>
        </>
    )
}