import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/components/login/login"
import MyCourses from './components/myCourses/myCourses';
import Overview from './components/overview/overview';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/myCourses" element={<MyCourses />}></Route>
        <Route path="/overview" element={<Overview />}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
