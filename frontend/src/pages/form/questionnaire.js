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
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

const options = ['Text Field', 'Radio Button', 'Checkbox', 'Dropdown'];

export default function Questionnaire(props){
    // props is the id of the questionnaire
    const questionnaireId = props.id; 
    console.log(questionnaireId);
    // use questionnaireId to get the questionnaire from backend 
    // dummy data here 
    const questionnaire = {
        'questionnaireNo' : '389273', 
        'questionnaireName' : 'intro questions',
        'questions':{
            'Name:' : 'text',
            'Age:' : 'text', 
            'Gender:' : ['radio', 'male', 'female'],
            'idk bro:' : ['checkbox', 'cbox1', 'cbox2']
        }
    }
    return(
        <div className='questionnaireContent'>
            <div className='questionnaireName'>
                {questionnaire['questionnaireName']}
            </div>

            <FormControl fullWidth>
                <Container>
                    {Object.keys(questionnaire['questions']).map((key, index)=>{
                        const inputType = questionnaire['questions'][key];
                        if (inputType == 'text'){
                            return(
                                <>
                                    <Row>
                                        <div className='questionnaireQuestion'>
                                            {key}
                                        </div>
                                    </Row>
                                    <Row>                                    
                                        <div>
                                            <TextField
                                                required
                                                disabled
                                            />
                                        </div>
                                    </Row>
                                </>
                            )
                        }
                        else if (inputType[0] == 'radio'){
                            const multiOptions = inputType.slice();
                            multiOptions.splice(0,1);
                            return(
                                <>
                                    <Row>
                                        <div className='questionnaireQuestion'>
                                            {key}
                                        </div>
                                    </Row>
                                    <Row>
                                        {multiOptions.map((option)=>{
                                            return(
                                                <FormControlLabel value={option} control={<Radio />} label={option} />
                                            )
                                        })}
                                    </Row>
                                </>
                            )
                        }
                    })}
                </Container>
            </FormControl>
            
        </div>
    )

}