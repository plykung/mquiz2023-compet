import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfessorChecking from './Components/Waiting';

function Professors() {
    return (
        <Routes>
            <Route path="/" element={<ProfessorChecking/>}/>
        </Routes>
    );
}

export default Professors;