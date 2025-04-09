import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Calendario from './Calendario';
import Login from './login';
import Dashboard from './Dashboard';
;


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* nova rota */}
      </Routes>
    </Router>
  );
}

export default App;
