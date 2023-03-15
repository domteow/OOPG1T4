import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../../index.css'
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';


const Checkbox = ({allDetails}) => {
    const [checkboxQuestion, setCheckboxQuestion] = useState('');
    const [checkboxOptions, setCheckboxOptions] = useState([]);
    const [prevOption, setPrevOption] = useState([]);
    const [prevQuestion, setPrevQuestion] = useState(''); 
    const [others, setOthers] = useState(false);

    
    const handleQuestionChange = (e) => {
        setCheckboxQuestion(e.target.value);
    };

    const handleOptionChange = (e, index) => {
        const updatedOptions = [...checkboxOptions];
        updatedOptions[index] = e.target.value;        
        setCheckboxOptions(updatedOptions);
    }

    const handleAddOption = () => {
        setCheckboxOptions([...checkboxOptions, ""]);
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = [...checkboxOptions];
        updatedOptions.splice(index, 1);
        setCheckboxOptions(updatedOptions);
    };

    const handleAddOthers = () =>{
        setOthers(true);
    }

    const handleRemoveOthers = () =>{
        setOthers(false);
    }

    console.log(checkboxQuestion)
    console.log(checkboxOptions)

    const data = {
        question: checkboxQuestion,
        options: checkboxOptions,
        type: 'checkbox',
        others: others
    }

    useEffect(()=>{
        if (prevQuestion !== checkboxQuestion){
            setPrevQuestion(checkboxQuestion);
            allDetails(data);
        }
        if(prevOption!== checkboxOptions){
            setPrevOption(checkboxOptions);
            allDetails(data);
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
                <TextField className='newFormInput' value={checkboxQuestion} sx={{width: '100%'}} onChange={handleQuestionChange} placeholder="Question"/>
                
                {checkboxOptions.map((option, index)=>(
                    <div key={index} className="checkboxOption">
                        <TextField className='newFormInput' value={option} placeholder='Option' sx={{width: '70%'}} onChange={e => handleOptionChange(e, index)}/>
                        <DeleteIcon onClick={() => handleRemoveOption(index)}/>
                    </div>
                ))}

                <Others />
            
                <div>
                    <button onClick={handleAddOption} className='addCheckbox'>
                        <AddIcon/> Add Option
                    </button>

                    <button disabled={others} onClick={handleAddOthers} className="addOthers">
                        <AddIcon/>Add Others
                    </button>
                </div>
            </div>            
        </>
    )
}

export default Checkbox;