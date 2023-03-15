import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Route, Routes, BrowserRouter, useLocation, useParams, useNavigate } from 'react-router-dom'
import '../../index.css'
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

const RadioButton = ({allDetails, id}) => {
    console.log(id);
    const [radioQuestion, setRadioQuestion] = useState('');
    const [radioOptions, setRadioOptions] = useState([]);
    const [prevOption, setPrevOption] = useState([]);
    const [prevQuestion, setPrevQuestion] = useState('');      
    const [others, setOthers] = useState(false);

    const handleQuestionChange = (e) => {
        setRadioQuestion(e.target.value);
    };
    
    const handleOptionChange = (e, index) => {
        const updatedOptions = [...radioOptions];
        updatedOptions[index] = e.target.value;
        setRadioOptions(updatedOptions);
    };

    const handleAddOption = () => {
        setRadioOptions([...radioOptions, ""]);
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = [...radioOptions];
        updatedOptions.splice(index, 1);
        setRadioOptions(updatedOptions);
    };

    const handleAddOthers = () =>{
        setOthers(true);
    }

    const handleRemoveOthers = () =>{
        setOthers(false);
    }

    const data = {
        question: radioQuestion,
        options: radioOptions,
        type: 'radio',
        others: others
    }
    console.log(data);
    useEffect(()=>{
        if (prevQuestion !== radioQuestion){
            setPrevQuestion(radioQuestion);
            allDetails(data, id);
        }
        if(prevOption!== radioOptions){
            setPrevOption(radioOptions);
            allDetails(data, id);
        }
    })
   
    const Others = () =>{
        if (others){
            return(
                <div className="othersOption">
                        <TextField sx={{width: '70%'}} className="othersOption" placeholder="Others" disabled={true}/>
                        <DeleteIcon onClick={() => handleRemoveOthers()}/>
                </div>
            )
        }
    }

    return(
        <>
            <div className='newFormInput'>
                <TextField value={radioQuestion} sx={{width: '100%'}} onChange={handleQuestionChange} placeholder="Question"/>

                {radioOptions.map((option, index) => (
                    <div key={index} className="radioOption">
                    
                        <TextField value={option} sx={{width: '70%'}} onChange={(e) => handleOptionChange(e, index)} placeholder="Option"/>
                        <DeleteIcon onClick={() => handleRemoveOption(index)}/>
                    </div>
                ))}

                <Others />

                <div>
                    <button onClick={handleAddOption} className="addRadio">
                        <AddIcon/>Add Option
                    </button>

                    <button disabled={others} onClick={handleAddOthers} className="addOthers">
                        <AddIcon/>Add Others
                    </button>
                </div>
            </div>
            
        </>
    )
}

export default RadioButton;