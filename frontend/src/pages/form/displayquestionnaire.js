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

const DisplayQuestionnaire = ({initialDetails, key, value}) => {
    const fields = value.fields; 
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[1]);
    const [inputList, setInputList] = useState(fields);
    const [questionnaireName, setQuestionnaireName] = useState(value.name);
    const [details, setDetails] = useState(fields);
    const assign = value.roleRequired
    const [assigned, setAssigned] = useState(assign);
    const [prevFields, setPreviousFields] = useState(fields);
    const [prevAssign, setPreviousAssign] = useState(assign);
    const [prevName, setPreviousName] = useState(value.name);
   
    

    /* DIALOGUE STUFF */
    // this is for opening the dialogue
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    // this is for closing the dialogue
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        if (details.length > 0){
            const lastitem = details[details.length - 1];
            const len = lastitem.id;
            console.log(lastitem);
            console.log(len);
            const data = {
                type: value, 
                id: len + 1,        
                name: '',
                value:'',
                options: []
            }
            setInputList([...inputList, data]);
            setDetails([...details, data]);
        }
        else{
            const data = {
                type: value, 
                id: 1,        
                name: '',
                value:'',
                options: []
            }
            setInputList([...inputList, data]);
            setDetails([...details, data]);
        }
        
    };
    /* END OF DIALOGUE STUFF */

    const handleRemoveInputField = index => {
        const newInputs = inputList.map((item, i) => {
            if (item.id === index){
                return "";
            }
            else{
                return item;
            }
        });
        setInputList(newInputs);

        details.map((item, i) => {
            if (item.id === index){
                const newitem = [...details]
                newitem.splice(i, 1);
                setDetails(newitem);
            }
        })
  

    };

    const handleQuestionnaireTitleChange = (e) => {
        setQuestionnaireName(e.target.value);
    }

    const handleTextChange = (e, i)=>{

        const newDetails = details.map((item, index)=>{
            if (item.id === i){
                const dat = item;
                const newdata = {...item, name:e.target.value};
                return newdata
            }
            else{
                return item
            }
        });
        setDetails(newDetails);
    }

    const handleSubtextChange = (e, i)=>{
       
        const newDetails = details.map((item, index)=>{
            if (item.id === i){
                const dat = item;
                const newdata = {...item, name:e.target.value};
                return newdata
            }
            else{
                return item
            }
        });
        setDetails(newDetails);        
    }

    const handleSubHeaderChange = (e, i)=>{
       
        const newDetails = details.map((item, index)=>{
            if (item.id === i){
                const dat = item;
                const newdata = {...item, name:e.target.value};
                return newdata
            }
            else{
                return item
            }
        });
        setDetails(newDetails);        
    }

    const handleHeaderChange = (e, i) => {
        const data = {
            question : e.target.value,
            type: 'header'
        }
        const newDetails = details.map((item, index)=>{
            if (item.id === i){
                const dat = item;
                const newdata = {...item, name:e.target.value};
                return newdata
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

    const allDetails = (data, index) => {
        console.log(data);
        const newDetails = details.map((item, i)=>{
            if (item.id === index){
                return data
            }
            else{
                return item
            }
        });
        setDetails(newDetails);
    }


    const newData = {
        ...value,
        name: questionnaireName,
        roleRequired: assigned,
        fields: details,
    }
    console.log(newData);

    useEffect(() => {
        if (details !== prevFields){
            setPreviousFields(details);
            initialDetails(newData, key);
        }
        if (assigned !== prevAssign){
            setPreviousAssign(assigned);
            initialDetails(newData, key);
        }
        if (questionnaireName !== prevName){
            setPreviousName(questionnaireName);
            initialDetails(newData, key);
        }
    })


    const renderInputField = (item, i) =>{
        const itemType = item.type;
        const itemName = item.name;
        const itemOptions = item.options;

        if(itemType === 'text' || itemType === 'Text Field'){
            return(
                <>
                    <>
                        <div className='newFormQuestion'>
                            <div>
                                <TextField name='text' placeholder='Question' sx={{width: '100%'}} defaultValue={itemName} onChange={(e)=>handleTextChange(e, item.id)}/>
                            </div>
                            <div>
                                <TextField name='answer' placeholder='Answer' sx={{width: '100%'}} disabled={true}/>
                            </div>
                        </div>
                    </>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(item.id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Text Field
                    </button>
                </>
            )
        }
        else if(itemType === 'radio' || itemType =='Radio Button'){
            return(
                <>
                    <RadioButton id={item.id} allDetails={allDetails} value={itemName} options = {itemOptions} other={item.others} edit={true}/>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(item.id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Radio
                    </button>
                </>
            )
        }
        else if(itemType === 'checkbox' || itemType =='Checkbox'){
            return(
                <>
                    <Checkbox id={i} allDetails={allDetails} value={itemName} options = {itemOptions} other={item.others} edit={true} />
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(item.id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Checkbox
                    </button>
                </>
            )
        }
        else if(itemType === 'select' || itemType === 'Select'){
            return(
                <>
                    <Select id={i} allDetails={allDetails} value={itemName} options = {itemOptions} edit = {true} />
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(item.id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Select
                    </button>
                </>
            )
        }
        else if (itemType === 'subheader' || itemType === 'Sub Header'){
            return(
                <>
                    <div className='radioOption'>
                        <TextField name='text' placeholder='Subheader' sx={{width: '100%'}} defaultValue={itemName}  onChange={(e)=>handleSubHeaderChange(e, item.id)}/>
                    </div>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(item.id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Subheader
                    </button>
                </>
            )
        }
        else if (itemType === 'header' || itemType === 'Header'){
            return(
                <>
                    <div className='radioOption'>
                        <TextField name='text' placeholder='Header' sx={{width: '100%'}} defaultValue={itemName}  onChange={(e)=>handleHeaderChange(e, item.id)}/>
                    </div>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(item.id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Header
                    </button>
                </>
            )
        }
        else if (itemType === 'subtext' || itemType === 'Subtext'){
            return(
                <>
                    <div className='radioOption'>
                        <TextField name='text' placeholder='Subtext' sx={{width: '100%'}} defaultValue={itemName}  onChange={(e)=>handleSubtextChange(e, item.id)}/>
                    </div>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(item.id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Subtext
                    </button>
                </>
            )
        }
        else if(item === 'Radio Button'){
            return(
                <>
                    <RadioButton id={i} allDetails={allDetails} value={''} options={[]} other={false} edit={false}/>
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(item.id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Radio
                    </button>
                </>
            )
        }
        else if(item === 'Checkbox'){
            return(
                <>
                    <Checkbox id={i} allDetails={allDetails} value={''} options={[]} other={false} edit={false} />
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(item.id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Checkbox
                    </button>
                </>
            )
        }
        else if(item === 'Select'){
            return(
                <>
                    <Select id={i} allDetails={allDetails} value={''} options={[]} edit={false} />
                    <button className='deleteInputButton' onClick={()=>handleRemoveInputField(item.id)}>
                        <DeleteIcon sx={{fontSize: 30}}/> Delete Select
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
                            defaultValue={value.name}
                            onChange={handleQuestionnaireTitleChange}
                        />
                    </div>
                </div>

                {inputList.map((item, i) =>{
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
                                defaultValue={assigned}
                                onChange={handleSelectChange}
                                inputProps={{
                                    id: 'uncontrolled-native',
                                    name:'Assigned',
                                }}>
                                
                                <option value='Admin' >Admin</option>
                                <option value='Approver' >Approver</option>
                                <option value='Vendor' >Vendor</option>
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



export default DisplayQuestionnaire;

