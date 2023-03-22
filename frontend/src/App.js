import "./index.css";
// ========================= general components =========================
// ======== routing ========
import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";
import React from "react";
// ======== nav bar ========
import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import Navbar from "./navbar"
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

// ========================= pages/entities =========================
import Login from './pages/login'

// ======== homepage for vendor ========
import Homepage from "./pages/homepage"

// ======== form ========
import Form from "./pages/viewform"
import AllForms from "./pages/form/allforms"
import Newform from "./pages/form/newform"
import ViewForm from './pages/form/viewonlyform'
import EditForm from './pages/form/editform'
import AssignForm from './pages/form/assignform'

// ======== vendors ========
// all vendors page 
import AdminHomepage from "./pages/adminVendorPages/adminHomepage"
import VendorDetails from './pages/adminVendorPages/vendorDetails'
// home page for admin ^
import Viewvendor from "./pages/adminVendorPages/viewvendor"
import Newvendor from "./pages/adminVendorPages/newvendor"

export default function App(){
    
    return (
        <BrowserRouter>
            <div className="body">
            <Routes>
                <Route exact path='/react/login' element={<Login />} />
                <Route exact path="/react/vendor/homepage" element={<Homepage />} />
                {/* <Route exact path="/" element={<Homepage/>}/> */}
                <Route exact path="/react/viewform/:formId" element={<Form/>}/>
                <Route exact path="/react/admin/homepage" element={<AdminHomepage/>}/>
                <Route exact path="/react/newvendor" element={<Newvendor/>}/>
                <Route exact path="/react/viewvendor/:vendorId" element={<Viewvendor/>}/>
                <Route exact path="/react/allforms" element={<AllForms/>}/>
                <Route exact path="/react/newform" element={<Newform/>}/>
                <Route exact path="/react/allforms/viewform/:formId" element={<ViewForm/>}/>
                <Route exact path="/react/allforms/editform/:formId" element={<EditForm/>}/>
                <Route exact path="/react/assignform/:vendorId" element={<AssignForm/>}/>
                <Route exact path="/react/vendordetails/:vendorId" element={<VendorDetails/>}/>
            </Routes>
            </div>
        </BrowserRouter>
    )
}
