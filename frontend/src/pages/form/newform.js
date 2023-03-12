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
import Dialogue from './dialogue';
import CreateQuestionnaire from './createquestionnaire';
import Questionnaire from './questionnaire';
import RadioButton from './radiobutton';



export default function Newform(){
    const options = ['New Questionnaire'];
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[1]);
    const initialValues ={
        formName: ''
    }
    const [values, setValues] = useState(initialValues);
    const [newFormList, setNewFormList] = useState({});
    const [inputList, setInputList] = useState([]);

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

    // THIS IS TO SET/ SAVE THE STANDARD DATA VALUES... 
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (e.target.type == 'checkbox'){
            const isChecked = e.target.checked;
            setValues({
                ...values,
                [name]: isChecked ? [...values[name], value] : values[name].filter((item) => item !== value),
            });
        }
        else{
            setValues({
                ...values,
                [name]: value,
            });
        }
    };

    // NEED HELP DOM DOMDOMDODMODMDOMDOMD TO SAVE ALL THE QUESTIONS AND WHAT NOT THAT HAVE BEEN ADDED
    const handleInputChange = (e, i) => {
        const { name, value } = e.target;
        let updatedValue = {'type': name, 'question': value};

        // const list = [...newFormList];
        // list[value] = name;
        setNewFormList(prevState => ({
            ...prevState, 
            [i]: updatedValue
        }));

        // setValues({ ...values, nickName: 'new Value' })
    };
    console.log(newFormList);

    /* THIS IS TO OPEN THE DIALOGUE TO CHOOSE WHAT TO ADD */
    const handleClickOpen = () => {
        setOpen(true);
    };
    /* END OF OPEN DIALOGUE FUNCTION THING */

    /* ONCLICK ON THE INPUT THING, DIALOGUE CLOSES, WHEN CLOSE, IT WILL UPDATE THE INPUTLIST THAT WILL BE USED TO RENDER THE RENDERINPUTFIELD */
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        if (value !== 'New Questionnaire'){
            console.log(value);
            questionnaireList.map((questionnaire) => {
                const name = questionnaire.name;
                const id = questionnaire.id;
                if (name === value){
                    console.log(questionnaire.id);
                    setInputList([...inputList, id]);
                }
            })
        }
        else{
            setInputList([...inputList, value])
        }
    };
    /* END OF ONCLICK INPUT THING TO ADD INPUTFIELD */

    //  ON CLICK, DELETE THE INPUT FIELD
    const handleRemoveInputField = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    console.log(inputList);
    /* THIS IS TO RENDER THE ADDING OF INPUT FIELDS */
    const renderInputField = (item, i) =>{
        if(item === 'Text Field'){
            return(
                <>
                <div className='newFormQuestion'>
                    <div className='newFormInput'>
                        <TextField name='text' placeholder='Question' sx={{width: '100%'}} onChange={e => handleInputChange(e, i)}/>
                    </div>
                    <div className='newFormInput'>
                        <TextField name='answer' placeholder='Answer' sx={{width: '100%'}} disabled={true}/>
                    </div>
                </div>
                <DeleteIcon onClick={()=>handleRemoveInputField(i)} sx={{fontSize: 30, marginLeft:5, marginTop: 2}}/>
                </>
            )
        }

        else if(item === 'New Questionnaire'){
            return(<CreateQuestionnaire />)
        }

        else if(item === 'Radio Button'){
            return(
                <>
                    <RadioButton />
                    <DeleteIcon onClick={()=>handleRemoveInputField(i)} sx={{fontSize: 30, marginLeft:5, marginTop: 2}}/>
                </>
            )
        }
        else if(item === 'Checkbox'){
            return(<div>hi4</div>)
        }
        else if(item === 'Dropdown'){
            return(<div>hi5</div>)
        }

        else{
            return (<Questionnaire id={item} />)
            // return(<div>hi6</div>)
        }
    }

    /* END OF RENDER OF ADDING OF INPUT FIELDS */

    return(
        <>
            <Navbar />

            <div className='newFormContent'>
                <div className='welcomeAdmin'>
                    New Form
                </div>

                <div className = 'standardInputForm'>
                    <FormControl fullWidth>
                        <Container>
                            <Row>
                                <Col xs={6} md={2} xl={2} className='formQuestion'>
                                    Form Name:
                                </Col>
                                <Col  xs={12} md={10} className='formInput'>
                                    <TextField
                                        required
                                        id="formName"
                                        name="formName"
                                        onChange={handleChange}
                                        type='text'
                                        sx={{width: '100%'}}
                                    />
                                </Col>
                            </Row>
                        </Container>
                        <div>
                            {inputList.map((item, i)=>{
                                console.log(item);
                                return(
                                    <div>
                                        {renderInputField(item, i)}
                                    </div>
                                )
                            })}
                        </div>

                        <button onClick={handleClickOpen} className='dialogueButton'>
                            <AddIcon/> Add Questionnaire
                        </button>

                        <Dialogue 
                            selectedValue={selectedValue}
                            open={open}
                            onClose={handleClose}
                        />
                    </FormControl>
                </div>
            </div>
        </>
    )
}