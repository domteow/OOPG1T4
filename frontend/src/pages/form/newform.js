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
import AddIcon from '@mui/icons-material/Add';
import Dialogue from './dialogue';
import CreateQuestionnaire from './createquestionnaire';
import Questionnaire from './questionnaire';
import RadioButton from './radiobutton';
import Select from './select';



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

    // TO SAVE ALL THE QUESTIONS AND WHAT NOT THAT HAVE BEEN ADDED
    const handleInputChange = (e, i) => {
        const { name, value } = e.target;
        let updatedValue = {'type': name, 'question': value};

        setNewFormList(prevState => ({
            ...prevState, 
            [i]: updatedValue
        }));

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
        if(item === 'New Questionnaire'){
            return(
                <>
                    <CreateQuestionnaire />
                    <button className='deleteQuestionnaireButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Questionnaire
                    </button>
                </>
            )
        }

        else if (item === 'Cancel'){
            return (<></>);
        }

        else{
            // to display an existing questionnaire 
            return (
                <>
                    <Questionnaire id={item} />
                    <button className='deleteQuestionnaireButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Questionnaire
                    </button>
                </>
            )
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
                            id='newForm'
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