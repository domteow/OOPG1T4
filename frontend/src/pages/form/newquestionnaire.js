import React from 'react'
import { useState, useEffect, createContext, useContext } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../../index.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Dialogue from './dialogue';
import TextInput from './textfield';
import RadioButton from './radiobutton';
import Checkbox from './checkbox';
import Select from './select';
import NativeSelect from '@mui/material/NativeSelect';
import Subheader from './subheader';

const options = ['Header', 'Sub Header', 'Subtext', 'Text Field', 'Radio Button', 'Checkbox', 'Select'];

const NewQuestionnaire = ({formDetails, id, value}) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[1]);
    const [questionnaireName, setQuestionnaireName] = useState("");
    const [assigned, setAssigned] = useState("Admin");
    const [inputList, setInputList] = useState([]);
    const [details, setDetails] = useState([]);
    const [prevFields, setPreviousFields] = useState({});
    const [prevAssign, setPreviousAssign] = useState("");
    const [prevName, setPreviousName] = useState("");

    const handleSelectChange = (e) => { 
        setAssigned(e.target.value);
    }

    const handleQuestionnaireTitleChange = (e) =>{
        setQuestionnaireName(e.target.value);
    }

    const handleRemoveInputField = (item, i) => {
        const newInput = [...inputList];
        newInput.splice(i, 1);
        setInputList(newInput);
    }

    console.log(inputList);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        const data = {
            name: '',
            type: value, 
            options: [],
            other: false
        }
        setInputList([...inputList, data]);
    }

    const handleTextChange = (e, i) => {
        const data = {
            name: e.target.value,
            type: 'text',
            options: []
        }
        const inpList = inputList.map((input, index) => {
            if (index == i){
                return data;
            }
            else{
                return input;
            }
        })
        setInputList(inpList);
    }

    const handleSubheaderChange = (e, i) => {
        const data = {
            name: e.target.value,
            type: 'subheader',
            options: []
        }
        const inpList = inputList.map((input, index) => {
            if (index == i){
                return data;
            }
            else{
                return input;
            }
        })
        setInputList(inpList);
    }

    const allDetails = (data, index) => {
        console.log(data)
        const newDetails = inputList.map((item, i) => {
            if (i == index){
                return data;
            }
            else{
                return item;
            }
        })
        setInputList(newDetails);
    }

    console.log(inputList);

    const renderInputField = (item, i) => {
        const type = item.type;
        const name = item.name;
        const options = item.options;
        if (type == 'Text Field' || type =='text'){
            return(
                <>
                    <>
                        <div className='newFormQuestion'>
                            <div>
                                <TextField name='text' placeholder = 'Question' sx={{width:'100%'}} value={name} onChange={(e) => handleTextChange(e, i)}/>
                            </div>
                            <div>
                            <TextField name='answer' placeholder='Answer' sx={{width: '100%'}} disabled={true}/>
                            </div>
                        </div>
                    </>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(item, i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Text Field
                    </button>
                </>
            )
        }
        else if (type == 'Radio Button' || type == 'radio'){
            const type = item.type;
            const name = item.name;
            const options = item.options;
            const other = item.other;
            console.log(item);
            console.log(name);
            console.log(options);
            return(
                <>
                    <RadioButton id={i} allDetails={allDetails} value={name} options={options} other={other} edit={false}/>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(item, i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Radio
                    </button>
                </>
            )
        }

        else if (type == 'Sub Header' || type == 'subheader'){
            return(
                <>
                    <>
                        <div className='newFormQuestion'>
                            <div>
                                <TextField name='text' placeholder = 'Question' sx={{width:'100%'}} value={name} onChange={(e) => handleSubheaderChange(e, i)}/>
                            </div>
                        </div>
                    </>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(item, i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Text Field
                    </button>
                </>
            )
        }
    }

    return(
        <>
            <div className='questionnaireContent'>
                <div>
                    <div className = 'formQuestion'>
                        Questionnaire Name:
                    </div>

                    <div  xs={12} md={10} className='formInput'>
                        <TextField
                            required
                            id="formName"
                            name="formName"
                            type='text'
                            sx={{width: '100%'}}
                            onChange={handleQuestionnaireTitleChange}
                        />
                    </div>
                </div>

                {inputList.map((item, i) => {
                    return(
                        <div key={item}>
                            {renderInputField(item, i)}
                        </div>
                    )
                })}

                <Container>
                    <Row>
                        <Col md={1}>
                            Assignment:
                        </Col>
                        <Col>
                            <NativeSelect
                                onChange={handleSelectChange}
                                inputProps={{
                                    id: 'uncontrolled-native',
                                    name:'Assigned',
                                }}>
                                
                                <option value='Admin'>Admin</option>
                                <option value='Approver'>Approver</option>
                                <option value='Vendor'>Vendor</option>
                            </NativeSelect>
                        </Col>
                    </Row>
                </Container>


                <button onClick={handleClickOpen} className='addFieldButton'>
                    <AddIcon/> Add 
                </button>

                <Dialogue 
                    id= 'newQuestionnaire'
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                />

            </div>
        </>
    )
}

export default NewQuestionnaire;