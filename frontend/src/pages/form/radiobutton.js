import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Route, Routes, BrowserRouter, useLocation, useParams, useNavigate } from 'react-router-dom'
import '../../index.css'
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Radio from '@mui/material/Radio';

const RadioButton = ({allDetails, id, value, options, other, edit}) => {
    console.log(value)
    console.log(options)
    const [radioQuestion, setRadioQuestion] = useState(value);
    const [radioOptions, setRadioOptions] = useState(options);
    const [prevOption, setPrevOption] = useState(options);
    const [prevQuestion, setPrevQuestion] = useState(value);      
    const [others, setOthers] = useState(other);
    const [prevOthers, setPrevOthers] = useState(other);
    console.log(radioOptions)
    console.log(radioQuestion);
    console.log(prevQuestion);

    const handleQuestionChange = (e) => {
        console.log(e.target.value);
        setRadioQuestion(e.target.value);
    };
    console.log(radioQuestion)
    
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
        name: radioQuestion,
        options: radioOptions,
        type: 'radio',
        others: others,
        id: id
    }
    console.log(data);
    console.log(radioQuestion)
    console.log(prevQuestion);
    console.log(prevOption)
    useEffect(()=>{        
        if (prevQuestion !== radioQuestion){
            console.log('hi')
            allDetails(data, id);
            setPrevQuestion(radioQuestion);
        }
        if(prevOption!== radioOptions){
            console.log('hi2')
            allDetails(data, id);
            setPrevOption(radioOptions);
        }
        if (others !== prevOthers){
            allDetails(data, id);
            setPrevOthers(others);
        }
    })

    console.log(radioQuestion)
    console.log(radioOptions)
   
    const Others = () =>{
        if (others){
            return(
                <div className="othersOption">
                        <Radio disabled={true} />
                        <TextField sx={{width: '70%'}} className="othersOption" placeholder="Others" disabled={true}/>
                        <DeleteIcon onClick={() => handleRemoveOthers()}/>
                </div>
            )
        }
    }

    console.log(radioOptions);

    if (!edit){
        console.log(value);
        return(
            <>
                <div className='newFormInput'>
                    <TextField defaultValue={radioQuestion} sx={{width: '100%'}} onChange={handleQuestionChange} placeholder="Radio Question"/>

                    {radioOptions.map((option, index) => (
                        <div key={index} className="radioOption">
                            <Radio disabled={true} />
                            <TextField defaultValue={option} sx={{width: '70%'}} onChange={(e) => handleOptionChange(e, index)} placeholder="Radio Option"/>
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

    
    else{
        return(
            <>
                <div className='newFormInput'>
                    <TextField defaultValue={value} sx={{width: '100%'}} onChange={handleQuestionChange} placeholder="Radio Question"/>

                    {radioOptions.map((option, index) => (
                        <div key={index} className="radioOption">
                            <Radio disabled={true}/>
                            <TextField value={option} sx={{width: '70%'}} onChange={(e) => handleOptionChange(e, index)} placeholder="Radio Option"/>
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
}

export default RadioButton;