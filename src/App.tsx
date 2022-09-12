import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './utils/interceptors';
import './App.css';

function App(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
