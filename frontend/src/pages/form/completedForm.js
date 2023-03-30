import React from 'react'
import axios from '../../api/axios'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Route, Routes, BrowserRouter, useLocation, useParams, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../navbar'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '../../index'
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import CircularProgress from '@mui/material/CircularProgress';
import { get } from 'react-hook-form'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

export default function CompletedForm() {
    const formids  = useParams()['formId'];    
    // const vendorids = useParams()['vendorId'];
    const [formID, setFormID] = useState(formids);
    // const [vendorId, setVendorId] = useState(vendorids);
    const [questionnaires, setQuestionnaires] = useState({});
    const [formToSend, setFormToSend] = useState({}); 
    const [form, setForm] = useState({});
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [formStatus, setFormStatus] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [revisionNo, setRevisionNo] = useState('');
    const [questionnaireIds, setQuestionnaireIds] = useState([]);
    // const [isLoading, setLoading] = useState(true); 
    const [upTo, setUpTo] = useState();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const getData = async() => {
                const response = await axios.get("/api/v1/formResponse/getFormByFormResponseID/" + formID);
                setForm(response.data.data)
                const localform = response.data.data;
                setQuestionnaires(localform.questionnaires);
                setLoading(false);
            };
            getData();
        }, 800);
    }, [formID]);

    if (isLoading) {
        return (
            <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            }}> <CircularProgress /> Form loading in progress... {console.log("loading state")}</div>
        );
    }
    console.log(form);

      
    const cancel = () =>{
        localStorage.getItem('role')
        navigate(-1);
    }

        return (
            <>
                <Navbar />

                <Container className='formPage'>
                    <Row className='imgrow'>
                        <Typography
                            variant="h2"
                            component="div"
                            sx={{ flexGrow: 100, display: { xs: 'none', sm: 'block' }}}
                        >
                            <img src={logo}/>
                        </Typography>
                    </Row>
                    <Row className='formDetailsRow'>
                        <Col className='formName'>
                            {form['description']}
                        </Col>

                        <Col className='formDeets'>
                            <div>
                                {form['formCode']}
                            </div>
                            <div>
                                {form['effectiveDate']}
                            </div>
                            <div>
                                {form['revisionNo']}
                            </div>
                        </Col>
                    </Row>

                    
                        {questionnaires.map((questionnaire) => {
                            const fields = questionnaire.fields;
                            console.log(fields);
                            return(
                                <>
                                    <Row className='formRow'>
                                        <div className='displayquestionnairename'>
                                            {questionnaire.name}
                                        </div>
                                    </Row>

                                    {fields.map((field) => {
                                        const inputType  = field.type;
                                        console.log(inputType == 'text');

                                        if (inputType == 'text'){
                                            return(
                                                <>
                                                    <Row className='radioQuestion'>
                                                        {field.name}
                                                    </Row>
                                                
                                                    <Row className='radioFormInput'>
                                                        {field.value}
                                                    </Row>
                                                </>
                                            )
                                        }
                                        else if (inputType == 'subheader'){
                                            return(
                                                <Row className='formRow'>
                                                    <div className='displaySubheader'>
                                                        {field.name}
                                                    </div>
                                                </Row>
                                            )
                                        }
                                        else if (inputType == 'subtext'){
                                            return(
                                                <Row className='formRow'>
                                                    <div className='subtext'>
                                                        {field.name}
                                                    </div>
                                                </Row>
                                            )
                                        }
                                        else if (inputType == 'header'){
                                            return (
                                                <Row className='formRow'>
                                                    <div className='headertext'>
                                                        {field.name}
                                                    </div>
                                                </Row>
                                            )
                                        }
                                        else if (inputType == 'select' || inputType == 'checkbox'){
                                            const answers = field.value;
                                            console.log(answers);
                                            console.log(typeof(answers));
                                            return(
                                                <>
                                                    <Row className='radioQuestion'>
                                                        {field.name}
                                                    </Row>
                                                    <Row className='radioFormInput'>

                                                        {Object.keys(answers).map((item, i) => {
                                                            console.log(answers);
                                                            console.log(item);
                                                            return (
                                                                <li>
                                                                    {answers[item]}
                                                                </li>
                                                            )
                                                        })}
                                                    </Row>
                                                </>
                                            )
                                        }
                                        else if (inputType =='radio'){
                                            return(
                                                <>
                                                    <Row className='radioQuestion'>
                                                        {field.name}
                                                    </Row>
                                                
                                                    <Row className='radioFormInput'>
                                                        {field.value}
                                                    </Row>
                                                </>
                                            )
                                        }
                                    })}
                                </>
                            )
                        })}
                        
                </Container>
                <div className="buttonFormRow">
                    <button className='cancelButtform' onClick={cancel}>Cancel</button>   
                </div>
            </>
        )
    }


  
    














