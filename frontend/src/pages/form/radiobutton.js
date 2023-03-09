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

export default function RadioButton(){
    const [newFormList, setNewFormList] = useState({});

    // NEED HELP DOM DOMDOMDODMODMDOMDOMD TO SAVE ALL THE QUESTIONS AND WHAT NOT THAT HAVE BEEN ADDED
    const handleInputChange = (e, i) => {
        const { name, value } = e.target;
        let updatedValue = {'type': name, 'question': value};

        // const list = [...newFormList];
        // list[value] = name;
        setNewFormList({
            ...newFormList, updatedValue
        });

        // setValues({ ...values, nickName: 'new Value' })
    };
    console.log(newFormList);
    /* THIS IS TO ADD A VALUE INTO RADIOLIST, WHICH MEANS ON CLICK ON ADD BUTTON, A NEW RADIO OPTION IS ADDED */
    const [radioList, setRadioList] = useState([]);
    const addRadioOption = () => {
        setRadioList([...radioList, 'add']);
    }

    const handleRemoveRadioOption = index => {
        const list = [...radioList];
        list.splice(index, 1);
        setRadioList(list);
    };

    const renderRadioOption = (i)=>{
        return (
            <>
                <TextField name='radioOption' className='newFormInput' placeholder='Option' sx={{width: '70%'}} onChange={e => handleInputChange(e)}/>
                
                <DeleteIcon onClick={()=>handleRemoveRadioOption(i)} sx={{fontSize: 30, marginLeft:5, marginTop: 2}}/>
                
            </>
        )
    }
    /* END OF THE RADIO ADDING PORTION, INCLUDING THE RENDERRADIOOPTION */

    return(
        <>
            <div className='newFormQuestion'>
                <div>
                    <TextField name='text' className='newFormInput' placeholder='Question' sx={{width: '100%'}} onChange={e => handleInputChange(e)}/>
                    
                </div>
                <div>
                    {radioList.map((item, i)=>{
                            return(
                                <>
                                    {renderRadioOption(i)}
                                </>
                            )
                    })}
                </div>
                <div>   
                    <button onClick={addRadioOption} className='addRadio'>
                        <AddIcon/> Add Option
                    </button>
                </div>
            </div>
            
        </>
    )
}