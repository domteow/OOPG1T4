import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../../index.css'
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import CheckboxBox from '@mui/material/Checkbox';


const Checkbox = ({allDetails, id, value, options, other, edit}) => {
    const [checkboxQuestion, setCheckboxQuestion] = useState(value);
    const [checkboxOptions, setCheckboxOptions] = useState(options);
    const [prevOption, setPrevOption] = useState(options);
    const [prevQuestion, setPrevQuestion] = useState(value); 
    const [others, setOthers] = useState(other);
    const [prevOthers, setPrevOthers] = useState(other);

    
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

    const data = {
        name: checkboxQuestion,
        options: checkboxOptions,
        type: 'checkbox',
        others: others,
        id: id
    }

    useEffect(()=>{
        if (prevQuestion !== checkboxQuestion){
            setPrevQuestion(checkboxQuestion);
            allDetails(data, id);
        }
        if(prevOption!== checkboxOptions){
            setPrevOption(checkboxOptions);
            allDetails(data, id);
        }
        if (others !== prevOthers){
            setPrevOthers(others);
            allDetails(data, id);
        }
    })

    const Others = () =>{
        if (others){
            return(
                <div className="othersOption">
                        <CheckboxBox disabled={true}/>
                        <TextField sx={{width: '70%'}} className="othersOption" placeholder="Others" disabled={true}/>
                        <DeleteIcon onClick={() => handleRemoveOthers()}/>
                </div>
            )
        }
    }

    if (!edit){
        return(
            <>
                <div className='newFormInput'>
                    <TextField className='newFormInput' value={checkboxQuestion} sx={{width: '100%'}} onChange={handleQuestionChange} placeholder="Checkbox Question"/>
                    
                    {checkboxOptions.map((option, index)=>(
                        <div key={index} className="checkboxOption">
                            <CheckboxBox disabled={true}/>
                            <TextField className='newFormInput' value={option} placeholder='Checkbox Option' sx={{width: '70%'}} onChange={e => handleOptionChange(e, index)}/>
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

    else{
        return(
            <>
                <div className='newFormInput'>
                    <TextField className='newFormInput' value={checkboxQuestion} sx={{width: '100%'}} onChange={handleQuestionChange} placeholder="Checkbox Question"/>
                    
                    {checkboxOptions.map((option, index)=>(
                        <div key={index} className="checkboxOption">
                            <CheckboxBox disabled={true}/>
                            <TextField className='newFormInput' value={option} placeholder='Checkbox Option' sx={{width: '70%'}} onChange={e => handleOptionChange(e, index)}/>
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
}

export default Checkbox;