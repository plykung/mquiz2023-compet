import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminRouter from "./Admin";
import Competition from './Competition';
import './css/App.css'
import LoginPage from "./Login";
import Professors from "./Professors";
function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/competition" element={<Competition/>}/>
          <Route path="/professor/*" element={<Professors/>}/>
          <Route path="/admin/*" element={<AdminRouter/>}/>
        </Routes>
      </div>
  )
}

export default App
