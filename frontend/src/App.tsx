// /webapps/infoEmplo-venv/infoEmplo/frontend/src/App.tsx
import { Fragment } from "react";
import Home from './components/Home/Home'
import Login from "./components/Login/Login";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Fragment>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          
        </Fragment>
      </Router>
    </>
  )
}

export default App
