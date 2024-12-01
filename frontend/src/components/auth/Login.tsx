// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/auth/Login.tsx
import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

// Context
import { CRMContext } from '../../context/CRMContext';

function Login(props) {

    // Auth y token
    const [auth, guardarAuth] = useContext(CRMContext);
    console.log(auth);
    
    // State con los datos del formulario
    const [credenciales, guardarCredenciales] = useState({});
    const navigate = useNavigate();

    // iniciar sesión en el servidor
    const iniciarSesion = async e => {
        e.preventDefault();

        // autenticar al usuario

        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
            console.log(respuesta);

            // extraer el token y colocarlo en localstorage
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            // colocarlo en el state
            guardarAuth({
                token, 
                auth: true
            })
            // alerta
            Swal.fire(
                'Login Correcto',
                'Has iniciado Sesión',
                'success'
            )

             // redireccionar usando navigate
             navigate('/');

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: error.response.data.mensaje
            })
        }
    }

    // almacenar lo que el usuario escribe en el state
    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="login">
            <h2>Iniciar Sesión</h2>

            <div className="contenedor-formulario">
                <form
                    onSubmit={iniciarSesion}
                >

                    <div className="campo">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email para Iniciar Sesión"
                            required
                            onChange={leerDatos}
                        />
                    </div>

                    <div className="campo">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password para Iniciar Sesión"
                            required
                            onChange={leerDatos}
                        />
                    </div>

                    <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block" />
                </form>
            </div>
        </div>
    )
}

export default Login