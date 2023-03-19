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

const options = ['Sub Header', 'Text Field', 'Radio Button', 'Checkbox', 'Select'];

// export default function CreateQuestionnaire(){
const CreateQuestionnaire = ({formDetails, id, value}) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[1]);
    const [questionnaireName, setQuestionnaireName] = useState("");
    const [assigned, setAssigned] = useState("admin");
    // inputList contains all the input fields that you're adding into the questionnaire 
    const [inputList, setInputList] = useState([]);
    // details contains all the details of the questionnaire ehehehhe
    const [details, setDetails] = useState([]);
    const [prevFields, setPreviousFields] = useState({});
    const [prevAssign, setPreviousAssign] = useState("");
    const [prevName, setPreviousName] = useState("");
    /* DIALOGUE STUFF */
    // this is for opening the dialogue
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    // this is for closing the dialogue
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        setInputList([...inputList, value]);
        setDetails([...details, value]);
    };
    /* END OF DIALOGUE STUFF */

    // this is to delete the input field 
    const handleRemoveInputField = index => {
        // const list = [...inputList];
        // list.splice(index, 1);
        // const qlist = [...details];
        // qlist.splice(index, 1);
        // setDetails(qlist);
        // setInputList(list);

        const newInputs = inputList.map((item, i) => {
            if (i === index){
                return "";
            }
            else{
                return item;
            }
        });
        setInputList(newInputs);
    };


    const allDetails = (data, index) => {
        console.log(data);
        const newDetails = details.map((item, i)=>{
            if (i === index){
                return data
            }
            else{
                return item
            }
        });
        setDetails(newDetails);
    }

    const handleTextChange = (e, i)=>{
        const data = {
            name : e.target.value,
            type: 'text'
        }
        const newDetails = details.map((item, index)=>{
            if (index === i){
                return data
            }
            else{
                return item
            }
        });
        setDetails(newDetails);
    }

    const handleSubTextChange = (e, i)=>{
        const data = {
            name : e.target.value,
            type: 'subheader'
        }
        const newDetails = details.map((item, index)=>{
            if (index === i){
                return data
            }
            else{
                return item
            }
        });
        setDetails(newDetails);
    }

    const handleSelectChange = (e) => { 
        setAssigned(e.target.value);
    }

    const handleQuestionnaireTitleChange = (e) =>{
        setQuestionnaireName(e.target.value);
    }

    console.log("RHYS IS A GENIUS DAMN");
    // console.log(questionnaireName);
    // console.log(assigned);
    // console.log(details);

    const data = { 
        name: questionnaireName, 
        roleRequired: assigned,
        fields: details 
    }
    console.log(data);

    useEffect(() => {
        if (details !== prevFields){
            setPreviousFields(details);
            formDetails(data, id);
        }
        if (assigned !== prevAssign){
            setPreviousAssign(assigned);
            formDetails(data, id);
        }
        if (questionnaireName !== prevName){
            setPreviousName(questionnaireName);
            formDetails(data, id);
        }
    })



    // rendering input fields
    const renderInputField = (item, i) =>{
        if(item === 'Text Field'){
            return(
                <>
                    <>
                        <div className='newFormQuestion'>
                            <div>
                                <TextField name='text' placeholder='Question' sx={{width: '100%'}} onChange={(e)=>handleTextChange(e, i)}/>
                            </div>
                            <div>
                                <TextField name='answer' placeholder='Answer' sx={{width: '100%'}} disabled={true}/>
                            </div>
                        </div>
                    </>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Text Field
                    </button>
                </>
            )
        }
        else if(item === 'Radio Button'){
            return(
                <>
                    <RadioButton id={i} allDetails={allDetails} value={''} options={[]} other={false} edit={false}/>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Radio
                    </button>
                </>
            )
        }
        else if(item === 'Checkbox'){
            return(
                <>
                    <Checkbox id={i} allDetails={allDetails} value={''} options={[]} other={false} edit={false} />
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Checkbox
                    </button>
                </>
            )
        }
        else if(item === 'Select'){
            return(
                <>
                    <Select id={i} allDetails={allDetails} value={''} options={[]} edit={false} />
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Select
                    </button>
                </>
            )
        }
        else if (item === 'Sub Header'){
            return(
                <>
                    <div className='radioOption'>
                        <TextField name='text' placeholder='Subheader' sx={{width: '100%'}}  onChange={(e)=>handleSubTextChange(e, i)}/>
                    </div>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(i)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Subheader
                    </button>
                </>
            )
        }
    }

    return(
        <>
            <div className='questionnaireContent'>
                <div>
                    <div className='formQuestion'>
                        Questionnaire Name:
                    </div>
                    {/* title of questionnaire */}
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
                
                {inputList.map((item, i)=>{
                    return(
                        <div key={i}>
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
                                
                                <option value='admin'>Admin</option>
                                <option value='approver'>Approver</option>
                                <option value='vendor'>Vendor</option>
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

export default CreateQuestionnaire;