// /webapps/infoEmplo-venv/infoEmplo/frontend/src/App.tsx
import { Fragment } from "react";
import Home from './components/Home/Home'
import Login from "./components/Login/Login";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "./components/Register/Register";

function App() {
  return (
    <>
      <Router>
        <Fragment>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>          
        </Fragment>
      </Router>
    </>
  )
}

export default App
