// to display an existing questionnaire 
import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../../index.css'
import axios from '../../api/axios'
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
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';

const options = ['Text Field', 'Radio Button', 'Checkbox', 'Dropdown'];

export default function Questionnaire(props){
    // props is the id of the questionnaire
    const questionnaireId = props.id; ;
    const [fields, setFields] = useState([]);
    const [questionnaire, setQuestionnaire] = useState({});

    const getQuestionnaire = async() => {
        try{
            const response = await axios.get("/api/v1/questionnaire/getQuestionnaireByID/" + questionnaireId)
            setQuestionnaire(response.data.data)
            const allFields = response.data.data['fields'];
            setFields(allFields);          
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getQuestionnaire();
    }, []);

    const assigned = questionnaire['roleRequired'];

    return(
        <div className='questionnaireContent'>
            <div className='questionnaireName'>
                {questionnaire['name']}
            </div>

            <div className='questionnaireId'>
                {questionnaire['id']}
            </div>

            <FormControl fullWidth>
                <Container>
                    {fields.map((field) => {
                        const inputType = field.type; 
                        const question = field.name;
                        const options = field.options;

                        if (inputType === 'text'){
                            return(
                                <>
                                    <Row>
                                        <div className='questionnaireQuestion'>
                                            {question}
                                        </div>
                                    </Row>
                                    <Row>                                    
                                        <div>
                                            <TextField
                                                required
                                                disabled
                                                sx={{width:'100%'}}
                                            />
                                        </div>
                                    </Row>
                                </>
                            )
                        }

                        else if (inputType === 'radio'){
                            return(
                                <>
                                    <Row>
                                        <div className='questionnaireQuestion'>
                                            {question}
                                        </div>
                                    </Row>
                                    <Row>
                                        {options.map((option)=>{
                                            return(
                                                <FormControlLabel value={option} control={<Radio />} label={option}  disabled={true}/>
                                            )
                                        })}
                                    </Row>
                                </>
                            )
                        }

                        else if (inputType === 'checkbox'){
                            return(
                                <>
                                    <Row>
                                        <div className='questionnaireQuestion'>
                                            {question}
                                        </div>
                                    </Row>
                                    <Row>
                                        {options.map((option)=>{
                                            return(
                                                <TextField value={option} label={option}  disabled={true}/>
                                            )
                                        })}
                                    </Row>
                                </>
                            )
                        }

                        else if (inputType === 'select'){
                            return(
                                <>
                                    <Row>
                                        <div className='questionnaireQuestion'>
                                            {question}
                                        </div>
                                    </Row>
                                    <Row>
                                        {options.map((option)=>{
                                            return(
                                                <FormControlLabel value={option} control={<Checkbox />} label={option}  disabled={true}/>
                                            )
                                        })}
                                    </Row>
                                </>
                            )
                        }

                        else if (inputType === 'subheader'){
                            return(
                                <>
                                    <Row>
                                        <div className='questionnaireQuestion'>
                                            {question}
                                        </div>
                                    </Row>
                                </>
                            )
                        }

                    })}
                    
                    <Row>
                        <Col md={1}>
                            Assignment:
                        </Col>
                        <Col>
                            <NativeSelect
                                defaultValue={assigned}
                                disabled
                                inputProps={{
                                    id: 'uncontrolled-native',
                                  }}>
                                
                                <option value='admin'>Admin</option>
                                <option value='vendor'>Vendor</option>
                            </NativeSelect>
                        </Col>
                    </Row>
                </Container>
            </FormControl>   
        </div>
    )
}