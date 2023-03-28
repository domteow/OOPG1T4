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

const CreateQuestionnaire = ({formDetails, id, value}) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[1]);
    const [questionnaireName, setQuestionnaireName] = useState("");
    const [assigned, setAssigned] = useState("Admin");
    const [inputList, setInputList] = useState([]);
    const [details, setDetails] = useState([]);
    const [prevFields, setPreviousFields] = useState({});
    const [prevAssign, setPreviousAssign] = useState("");
    const [prevName, setPreviousName] = useState("");
    const [counter, setCounter] = useState(0);

    /* DIALOGUE STUFF */
    // this is for opening the dialogue
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    // this is for closing the dialogue

    const handleClose = (value) => {
        setCounter((prev) => prev+1);
        setOpen(false);
        setSelectedValue(value);
        const data = {
            type: value,
            id:counter,
            name: '',
            options: []
        }
        setInputList([...inputList, data]);
        setDetails([...details, data]);
    };
    /* END OF DIALOGUE STUFF */
    console.log(inputList);

    // this is to delete the input field 
    const handleRemoveInputField = index => {
        // const list = [...inputList];
        // list.splice(index, 1);
        // const qlist = [...details];
        // qlist.splice(index, 1);
        // setDetails(qlist);
        // setInputList(list);

        const newInputs = inputList.map((item, i) => {
            const idx = item.id;
            if (index === idx){
                return "";
            }
            else{
                return item;
            }
        });
        setInputList(newInputs);

        // const newDat = [...inputList];
        // newDat.splice(index, 1);
        // setInputList(newDat);

        const newData = [...details];
        newData.splice(index, 1);
        setDetails(newData)

        // const newDetails = details.map((item, i) => {
        //     if (i === index){
        //         return "";
        //     }
        //     else{
        //         return item;
        //     }
        // });
        // setDetails(newDetails);
    };



    console.log(details);

    const allDetails = (data, index) => {
        console.log(inputList);
        console.log(data);
        const newDetails = details.map((item, i)=>{
            const idx = item.id;
            console.log(i);
            console.log(index)
            if (idx === index){
                return data
            }
            else{
                return item
            }
        });
        setDetails(newDetails);
    }

    const handleTextChange = (e, id)=>{
        const data = {
            name : e.target.value,
            type: 'text',
            id:id
        }
        const newDetails = details.map((item, index)=>{
            const idx = item.id;
            if (id === idx){
                return data
            }
            else{
                return item
            }
        });
        setDetails(newDetails);
    }

    const handleSubTextChange = (e, id)=>{
        const data = {
            name : e.target.value,
            type: 'subtext',
            id:id
        }
        const newDetails = details.map((item, index)=>{
            const idx = item.id;
            if (idx === id){
                return data
            }
            else{
                return item
            }
        });
        setDetails(newDetails);
    }

    const handleSubheaderChange = (e, id)=>{
        const data = {
            name : e.target.value,
            type: 'subheader',
            id:id
        }
        const newDetails = details.map((item, index)=>{
            const idx = item.id;
            if (idx === id){
                return data
            }
            else{
                return item
            }
        });
        setDetails(newDetails);
    }

    const handleHeaderChange = (e, id)=>{
        const data = {
            name : e.target.value,
            type: 'header',
            id:id
        }
        const newDetails = details.map((item, index)=>{
            const idx = item.id;
            if (idx === id){
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
    const [prevData, setPrevdata] = useState({});
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
    const renderInputField = (it, i) =>{
        const item = it.type;
        const name = it.name;
        const opt = it.options;
        const id = it.id;
        if(item === 'Text Field'){
            return(
                <>
                    <>
                        <div className='newFormQuestion'>
                            <div>
                                <TextField name='text' placeholder='Question' sx={{width: '100%'}} onChange={(e)=>handleTextChange(e, id)}/>
                            </div>
                            <div>
                                <TextField name='answer' placeholder='Answer' sx={{width: '100%'}} disabled={true}/>
                            </div>
                        </div>
                    </>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Text Field
                    </button>
                </>
            )
        }
        else if(item === 'Radio Button'){
            return(
                <>
                    <RadioButton id={id} allDetails={allDetails} value={name} options={opt} other={false} edit={true}/>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Radio
                    </button>
                </>
            )
        }
        else if(item === 'Checkbox'){
            return(
                <>
                    <Checkbox id={id} allDetails={allDetails} value={''} options={[]} other={false} edit={false} />
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Checkbox
                    </button>
                </>
            )
        }
        else if(item === 'Select'){
            return(
                <>
                    <Select id={id} allDetails={allDetails} value={''} options={[]} edit={false} />
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Select
                    </button>
                </>
            )
        }
        else if (item === 'Sub Header'){
            return(
                <>
                    <div className='radioOption'>
                        <TextField name='text' placeholder='Subheader' sx={{width: '100%'}}  onChange={(e)=>handleSubheaderChange(e, id)}/>
                    </div>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Subheader
                    </button>
                </>
            )
        }

        else if (item === 'Header'){
            return(
                <>
                    <div className='radioOption'>
                        <TextField name='text' placeholder='Header' sx={{width: '100%'}} className='headertext' onChange={(e)=>handleHeaderChange(e, id)}/>
                    </div>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Header
                    </button>
                </>
            )
        }

        else if (item === 'Subtext'){
            return(
                <>
                    <div className='radioOption'>
                        <TextField name='text' placeholder='Subtext' sx={{width: '100%'}} className='subtext' onChange={(e)=>handleSubTextChange(e, id)}/>
                    </div>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Subtext
                    </button>
                </>
            )
        }
        else if (item === ""){
            return(<></>)
        }
        else if (item === 'Cancel'){
            return(<></>)
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

export default CreateQuestionnaire;