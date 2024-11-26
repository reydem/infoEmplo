// /webapps/infoEmplo-venv/infoEmplo/frontend/src/App.tsx
import { Fragment } from "react";
import Home from './components/Home/Home'
import Login from "./components/Login/Login";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "./components/Register/Register";
import Content from "./components/Content/Content";
import Configuration from "./components/Configuration/Configuration";
import Security from "./components/Security/Security";
import Preferences from "./components/Preferences/Preferences";

function App() {
  return (
    <>
      <Router>
        <Fragment>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/content" element={<Content />} />
            <Route path="/configuration" element={<Configuration />} />
            <Route path="/security" element={<Security />} />
            <Route path="/preferences" element={<Preferences />} />
          </Routes>
        </Fragment>
      </Router>
    </>
  )
}

export default App
