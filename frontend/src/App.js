import "./index.css";
// ========================= general components =========================
// ======== routing ========
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
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
import Form from "./pages/form"

// ======== vendors ========
// all vendors page 
import Allvendors from "./pages/adminVendorPages/allvendors"
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
                <Route exact path="/react/form/:formId" element={<Form/>}/>
                <Route exact path="/react/admin/homepage" element={<Allvendors/>}/>
                <Route exact path="/react/newvendor" element={<Newvendor/>}/>
                <Route exact path="/react/viewvendor/:vendorId" element={<Viewvendor/>}/>
            </Routes>
            </div>
        </BrowserRouter>
    )
}