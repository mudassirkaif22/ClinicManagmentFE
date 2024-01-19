import './App.css';
import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Patient from './components/Patient';
import Drlogin from './components/Drlogin';
import ClinicManagment from './components/ClinicManagment';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Contact from './components/Contact';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/patient" element={<Patient/>}/>
        <Route path="/drlogin" element={<Drlogin/>}/>
        <Route path='/clinicmanagment' element={<ClinicManagment/>}/>
        <Route path='/contact' element={<Contact/>}/>
        {/* <Route path='/admin' element={<Admin/>}/> */}
      </Routes>
    
    </BrowserRouter>
      
    </>
  );
}

export default App;
