import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Cadastro from './Pages/Cadastro.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='login' element={<Login/>} />
        <Route path='cadastro' element={<Cadastro/>} />

      </Routes>
    
    </Router>
  </React.StrictMode>,
)
