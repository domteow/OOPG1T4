import React from 'react'
import axios from '../../api/axios'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import '../../index.css'
import logo from '../../assets/quantum.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../navbar'
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

export default function ApproverHomepage(){
    const [openMsg, setOpenMsg] = useState(false);
    const [msg, setMsg] = useState();
    const [allVendors, setAllVendors] = useState({});
    const user = localStorage.getItem('username');
    const [allAdmins, setAllAdmins] = useState({});

    const getAllAdmins = async() => {
        try{
            console.log('running ad')
            const response = await axios.get('/api/v1/admin/getAllAdmins')
            setAllAdmins(response.data.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getAllVendors = async() => {
        try {
            const response = await axios.get("/api/v1/vendor/getAllVendors")
            setAllVendors(response.data.data);
            getAllAdmins();
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        getAllVendors();
        const message = localStorage.getItem('message');
        console.log(message);
        console.log(message === 'null')

        if (message !== 'null' && message !== null){
            setMsg(message);
            displayMessage();      
        }
    }, []);

    const displayMessage = () => {
        setOpenMsg(true);
        setTimeout(()=>{
            setOpenMsg(false);
            localStorage.setItem('message', null);
        }, 3000)
    }

    const handleCloseMsg = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenMsg(false);
        localStorage.setItem('message', null);
        setMsg(null);
    };

    const navigate = useNavigate();
    const addNewVendor = () =>{
        navigate('/react/newvendor');
    }

    const addNewAdmin = () => {
        navigate('/react/newadmin');
    }

    const viewVendor = (vendorId) =>{
        navigate("/react/approver/viewvendor/" + vendorId);
    }

    const [openDelete, setOpenDelete] = useState(false);
    const [delId, setDelId] = useState('');

    const openDel = (vendorId) => {
      setOpenDelete(true);
      setDelId(vendorId);      
    }

    const handleCloseDel = () => {
      setOpenDelete(false);
      setDelId('');
    }

    const [openDeleteAd, setOpenDeleteAd] = useState(false);
    const [delAdId, setDelAdId] = useState('');
    const openDelAd = (adminId) => {
        setDelAdId(adminId);
        setOpenDeleteAd(true);
    }

    const handleCloseDelAd = () => {
        setOpenDeleteAd(false);
        setDelAdId('');
      }

    const deleteVendor = async()=>{
        // add code to delete the vendor 
        try {
            const response = await axios.put(
                "/api/v1/vendor/deleteVendor/" + delId
            );
            // refresh the list of vendors
            setMsg('Vendor deleted successfully.')
            setOpenDelete(false)
            getAllVendors();
            getAllAdmins();
            displayMessage();
        } catch (error) {
            console.error(error);
        }
    }

    const deleteAdmin = async()=>{
        // add code to delete the vendor 
        try {
            const response = await axios.put(
                "/api/v1/admin/deleteAdmin/" + delAdId
            );
            console.log(response.data);
            // refresh the list of vendors
            setMsg('Admin deleted successfully.')
            setOpenDeleteAd(false)
            getAllVendors();
            getAllAdmins();
            displayMessage();
        } catch (error) {
            console.error(error);
        }
    }

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseMsg}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

    return(
        <>
            <Navbar />

            <div className='mainContent'>
                <div className='welcomeAdmin'>
                Welcome {user}!
                </div>


                {/* button to add a new vendor */}
                <div className='addVendorDiv'>
                    <button className='addAdminButton' onClick={addNewAdmin}>+ New Admin</button>
                    <button className='addVendorButton' onClick={addNewVendor}>+ New Vendor</button>
                </div>
                

                <div className='vendorContainer'>
                    <Container>
                        <Row className='containerHeaders'>
                            <Col xs={12} md={6} >
                                Vendor Name
                            </Col>
                            <Col xs={12} md={3} className='companyHeader'>
                                Company
                            </Col>
                            <Col xs={8} md={2} className='companyHeader'>
                                View Vendor
                            </Col>
                            <Col xs={4} md={1} ></Col>
                        </Row>
                    
                        {/* to display all vendors */}

                        {Object.values(allVendors).map((vendorDetails, index)=>{
                            const vendorId = vendorDetails['id'];
                            
                            return(
                                <Row className='vendorDisplayRows'>
                                    <Col xs={12} md={6} className='vendorDetailsCol'>
                                        <div className='vendorDisplayName'>
                                            {vendorDetails.name}
                                        </div>
                                    </Col>
                                    <Col xs={12} md={3}>
                                        <div className='vendorCompany'>
                                            {vendorDetails.company}
                                            
                                        </div>
                                    </Col>
                                    <Col xs={8} md={2}  className='vendorButtonCol'>
                                        <button className='viewVendorButton' id={vendorId} onClick={() => viewVendor(vendorId)}>
                                            View Vendor
                                        </button>
                                    </Col>
                                    <Col xs={4} md={1} className='companyHeader' >
                                        <DeleteIcon onClick={()=>openDel(vendorId)}/>
                                    </Col>
                                </Row>
                            )
                        })}

                    </Container>
                </div>

                <div className='vendorContainer'>
                    <Container>
                        <Row className='containerHeaders'>
                            <Col xs={12} md={5} >
                                Admin Name
                            </Col>
                            <Col xs={12} md={6} className='companyHeader'>
                                Email Address
                            </Col>
                            <Col xs={4} md={1} ></Col>
                        </Row>
                    
                        {/* to display all vendors */}

                        {Object.values(allAdmins).map((adminDetails, index)=>{
                            const adminId = adminDetails['id'];
                            
                            return(
                                <Row className='vendorDisplayRows'>
                                    <Col xs={12} md={5} className='vendorDetailsCol'>
                                        <div className='vendorDisplayName'>
                                            {adminDetails.name}
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <div className='vendorCompany'>
                                            {adminDetails.emailAddress}
                                            
                                        </div>
                                    </Col>
                                    <Col xs={4} md={1} className='companyHeader' >
                                        <DeleteIcon onClick={()=>openDelAd(adminId)}/>
                                    </Col>
                                </Row>
                            )
                        })}

                    </Container>
                </div>
            </div>

            <Dialog open={openDelete} onClose={handleCloseDel} fullWidth='90%'>
                <DialogTitle>Delete Vendor</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirm deletion of vendor? 
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDel}>Cancel</Button>
                    <Button onClick={deleteVendor} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteAd} onClose={handleCloseDel} fullWidth='90%'>
                <DialogTitle>Delete Admin</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirm deletion of admin? 
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDelAd}>Cancel</Button>
                    <Button onClick={deleteAdmin} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            
            <Snackbar
                open={openMsg}
                autoHideDuration={6000}
                onClose={handleCloseMsg}
                message={msg}
                action={action}
            />
        </>
    )
}