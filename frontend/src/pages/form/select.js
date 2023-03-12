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

export default function Select(){
    const [newFormList, setNewFormList] = useState({});

    const handleInputChange = (e, i) => {
        const { name, value, type } = e.target;
        let updatedValue;
        if (type === 'radio'){
            updatedValue = {'type': "radio-" + i, 'question': value};
        }

        else if (type === 'text') {
            updatedValue = {'type': name, 'question': value};
        }

        else if (type === 'checkbox') {
            updatedValue = {'type': "checkbox-" + i, 'question': value};
        }

        else if (type === 'select') {
            updatedValue = {'type': "select-" + i, 'question': value};
        }

        setNewFormList(prevState => ({
            ...prevState, 
            [i]: updatedValue
        }));
    };

    console.log(newFormList);

    /* THIS IS TO ADD A VALUE INTO CHECKLIST, WHICH MEANS ON CLICK ON ADD BUTTON, A NEW CHECKBOX OPTION IS ADDED */
    const [selectList, setSelectList] = useState([]);
    const addSelectOption = () => {
        setSelectList([...selectList, selectList.length]); // use length to specify the index of the radio option
    }

    const handleRemoveSelectOption = index => {
        const list = [...selectList];
        list.splice(index, 1);
        setSelectList(list);
    };

    const renderSelectOption = (i)=>{
        return (
            <div className='selectOption'>
                <TextField name='selectOption' className='newFormInput' placeholder='Option' sx={{width: '70%'}} onChange={e => handleInputChange(e, i)}/>
                
                <DeleteIcon onClick={()=>handleRemoveSelectOption(i)} sx={{fontSize: 30, marginLeft:5, marginTop: 2}}/>
                
            </div>
        )
    }

    const renderTextField = (i)=>{
        return (
            <>
                <TextField name='text' className='newFormInput' placeholder='Question' sx={{width: '100%'}} onChange={e => handleInputChange(e, i)}/>
            </>
        )
    }

    return(
        <>
            <div className='newFormQuestion'>
                {renderTextField(0)}
                <div>
                    {selectList.map((item, i)=>{
                            return(
                                <>
                                    {renderSelectOption(i)}
                                </>
                            )
                    })}
                </div>
                <div>   
                    <button onClick={addSelectOption} className='addSelect'>
                        <AddIcon/> Add Option
                    </button>
                </div>
            </div>
            
        </>
    )
}