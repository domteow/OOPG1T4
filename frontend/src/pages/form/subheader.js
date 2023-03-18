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
import PropTypes from 'prop-types';
import Dialogue from './dialogue';

const Subheader = ({allDetails, id})=> {
    const [subheader, setSubheader] = useState("");

    const handleTextChange = (e) => {
        setSubheader(e.target.value);
    }
    const data = {
        type: 'subheader',
        name: subheader
    }

    allDetails(data, id)

    return(
        <>
            <div className='newFormQuestion'>
                <div>
                    <TextField name='text' placeholder='Question' sx={{width: '100%'}} value={subheader} onChange={handleTextChange}/>
                </div>
            </div>
        </>
    )

}

export default Subheader;