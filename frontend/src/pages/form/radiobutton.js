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
        const { name, value, type } = e.target;
        let updatedValue;
        if (type === 'radio'){

            updatedValue = {'type': "radio-" + i, 'question': value};

        }
        else if (type === 'text') {
            updatedValue = {'type': name, 'question': value};
        }

        // const list = [...newFormList];
        // list[value] = name;
        setNewFormList(prevState => ({
            ...prevState, 
            [i]: updatedValue
        }));

        // setValues({ ...values, nickName: 'new Value' })
    };
    console.log(newFormList);
    /* THIS IS TO ADD A VALUE INTO RADIOLIST, WHICH MEANS ON CLICK ON ADD BUTTON, A NEW RADIO OPTION IS ADDED */
    const [radioList, setRadioList] = useState([]);
    const addRadioOption = () => {
        setRadioList([...radioList, radioList.length]); // use length to specify the index of the radio option
    }

    const handleRemoveRadioOption = index => {
        const list = [...radioList];
        list.splice(index, 1);
        setRadioList(list);
    };

    const renderRadioOption = (i)=>{
        return (
            <>
                <TextField name='radioOption' className='newFormInput' placeholder='Option' sx={{width: '70%'}} onChange={e => handleInputChange(e, i)}/>
                
                <DeleteIcon onClick={()=>handleRemoveRadioOption(i)} sx={{fontSize: 30, marginLeft:5, marginTop: 2}}/>
                
            </>
        )
    }
    /* END OF THE RADIO ADDING PORTION, INCLUDING THE RENDERRADIOOPTION */

    // hi rhys.............
    // CREATE A FUNCTION TO RENDER THE TEXT FIELD CAUSE I NOT SURE HOW ELSE TO
    // PASS IN THE INDEX SO THAT IT LOOKS LIKE THE TEXTFIELD IN NEWFORM.JS
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