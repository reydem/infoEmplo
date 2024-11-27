import { Component } from 'react'

import { Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Content from '../Content/Content';
import Configuration from '../Configuration/Configuration';
import Security from '../Security/Security';
import Preferences from '../Preferences/Preferences';
import Notifications from '../Notifications/Notifications';



export class Navegacion extends Component {
    render() {
        return (
            <Routes>
                
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/content" element={<Content />} />
                <Route path="/configuration" element={<Configuration />} />
                <Route path="/security" element={<Security />} />
                <Route path="/preferences" element={<Preferences />} />
                <Route path="/notifications" element={<Notifications />} />
            </Routes>
        )
    }
}

export default Navegacion
