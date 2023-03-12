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



export default function Dialogue(props){
    const options = ['New Questionnaire'];
    // FROM BACKEND GET THE EXISTING QUESTIONNAIRES and add into options 
    const questionnaireList = [
        {
            'name' : 'Questionnaire 1',
            'id': 'q1' 
        },
        {
            'name' : 'Questionnaire 2',
            'id': 'q2'
        },
        {
            'name' : 'Questionnaire 3',
            'id': 'q3' 
        },
        {
            'name' : 'Questionnaire 4',
            'id': 'q4' 
        }
    ];

    questionnaireList.map((questionnaire) =>{
        const questionnaireName = questionnaire['name'];
        if (options.indexOf(questionnaireName) === -1){
            options.push(questionnaireName);
        }
    })

    const {onClose, selectedValue, open} = props;

    const handleClose = () =>{
        onClose(selectedValue);
    }

    const handleListItemClick = (value) =>{
        onClose(value);
    }

    return(
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>
                + Add
            </DialogTitle>
            <List className='allOptions'>
                
                {options.map((option)=>(
                    <ListItem disableGutters>
                        <ListItemButton onClick={()=> handleListItemClick(option)} key={option}>
                            <ListItemText primary={option} />
                        </ListItemButton>
                    </ListItem>           
                ))}
            </List>
        </Dialog>
    )
}

Dialogue.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};
  