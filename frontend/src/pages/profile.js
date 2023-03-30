import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../api/axios'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate, useParams } from 'react-router-dom'
import '../index.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function VendorProfile(){
    const vendorId = useParams().vendorId; 
    const [vendor, setVendor] = useState({})
    const [isLoading, setLoading] = useState(true); 
    const [vendorCountry, setVendorCountry] = useState([])
    const [allCountry, setAllCountry] = useState([])
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    const [values, setValues] = useState({});
    const [storePwd, setStorePwd] = useState();

    useEffect(() => { 
        setTimeout(() => { 
        axios.get("/api/v1/vendor/getVendor/" + vendorId)
        .then((response) => {
            setVendor(response.data.data);
            // setVendorCountry(response.data.data.countries)
            setLoading(false); //set loading state
            console.log(response.data.data);
            for(let country in response.data.data.countries){
                console.log(response.data.data.countries[country]);
                setAllCountry (prev => ([...prev, {label: response.data.data.countries[country]}]));
            }

            setValues({
                accountType : 'Vendor',
                countries : response.data.data.countries,
                name: response.data.data.name,
                company: response.data.data.company,
                phoneNumber: response.data.data.phoneNumber,
                faxNumber: response.data.data.faxNumber,
                emailAddress: response.data.data.emailAddress,
                password: response.data.data.password,
                id: parseInt(vendorId),
                active: response.data.data.active
        
            });

            setStorePwd(response.data.data.password)

          });
         }, 800);
    }, []);
    console.log(allCountry);

    const handleCancel = () => {
        setIsDisabled(true);
        navigate('/react/viewvendor/' + vendorId)
    }

    if(isLoading) {
        return (
            <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            }}> <CircularProgress /> Loading the Vendor details {console.log("loading state")}</div>
        );
    }
    else{
        return(
            <>
                <Navbar />

                <div className='mainContent'>
                    <div className='welcomeMsg'>
                        Profile
                    </div>
                    
                    <Container>
                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='vendorDetailsQues'>
                                Name:
                            </Col>
                            <Col xs={12} md={8} className='vendordetailsinput'>
                                {vendor.name}
                            </Col>
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='vendorDetailsQues'>
                                Company Name:
                            </Col>
                            <Col xs={12} md={8} className='vendordetailsinput'>
                                {vendor.company}
                            </Col>
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='vendorDetailsQues'>
                                Email Address:
                            </Col>
                            <Col xs={12} md={8} className='vendordetailsinput'>
                                {vendor.emailAddress}
                            </Col>
                        </Row>

                        

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='vendorDetailsQues'>
                                Phone Number:
                            </Col>
                            <Col xs={12} md={8} className='vendordetailsinput'>
                                {vendor.phoneNumber}
                            </Col>
                           
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='vendorDetailsQues'>
                                Fax Number:
                            </Col>
                            <Col xs={12} md={8} className='vendordetailsinput'>
                                {vendor.faxNumber}
                            </Col>
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='vendorDetailsQues'>
                                Countries:
                            </Col>
                            <Col xs={12} md={8} className='vendordetailsinput'>
                                {allCountry.map((item)=>{
                                    return(
                                        <li>{item.label}</li>
                                    )
                                })}
                                
                            </Col>
                        </Row>  

                    </Container>
                    <div className="buttonFormRow">
                        <button onClick={handleCancel} className='cancelFormButton'>
                            Cancel
                        </button>
                    </div>
                </div> 
            </>
        )
    }
}