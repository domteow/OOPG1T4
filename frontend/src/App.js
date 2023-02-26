import "./index.css";
// ========================= general components =========================
// ======== routing ========
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import React from "react";
// ======== nav bar ========
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavbarVendor from "./navbarvendor"
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

// ========================= pages/entities =========================
// ======== homepage ========
import Homepage from "./pages/homepage"

// ======== form ========
import Form from "./pages/form"

export default function App(){
    return (
        <BrowserRouter>
            <div className="body">
            <Routes>
                <Route exact path="/react" element={<Homepage />} />
                {/* <Route exact path="/" element={<Homepage/>}/> */}
                <Route exact path="/react/form/:formId" element={<Form/>}/>
            </Routes>
            </div>
        </BrowserRouter>
    )
}