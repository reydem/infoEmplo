// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Login/Login.tsx
import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { AxiosError } from 'axios';
import Logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';

// Context
import { CRMContext } from '../../context/CRMContext';

function Login() {
    // Auth y token
    const context = useContext(CRMContext);

    if (!context) {
        throw new Error('CRMContext must be used within a CRMProvider');
    }

    const [auth, guardarAuth] = context;

    // State con los datos del formulario
    const [credenciales, guardarCredenciales] = useState({ correo: '', password: '' });

    const navigate = useNavigate();

    // iniciar sesión en el servidor
    const iniciarSesion = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);

            // extraer el token y colocarlo en localstorage
            const { token, esReclutador, correo } = respuesta.data;
            localStorage.setItem('token', token);

            // Actualiza todos los campos del estado
            guardarAuth({
                token,
                auth: true,
                esReclutador,
                correo
            });

            // alerta
            Swal.fire('Login Correcto', 'Has iniciado Sesión', 'success');

            // redireccionar usando navigate
            navigate('/');
        } catch (error) {
            console.error(error);

            if (error instanceof AxiosError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: error.response?.data?.mensaje || 'Error desconocido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Error inesperado. Por favor, inténtalo de nuevo.',
                });
            }
        }
    };

    // almacenar lo que el usuario escribe en el state
    const leerDatos = (e: React.ChangeEvent<HTMLInputElement>) => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-nanum">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Link to="/">
                    <img
                        alt="Your Company"
                        src={Logo}
                        className="mx-auto h-44 w-auto"
                    />
                </Link>
                <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 bg-amber-300">
                    "Inicio de Sesióned"
                </h1>
                <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Iniciar Sesión
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-4 border-gray-400 rounded-[32px] bg-slate-300">
                <form onSubmit={iniciarSesion} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-center block text-xl font-bold text-gray-900">
                            Correo:
                        </label>
                        <div className="mt-2 flex justify-center">
                            <input
                                id="correo"
                                name="correo"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                onChange={leerDatos}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="text-center block text-xl font-bold text-gray-900">
                            Contraseña:
                        </label>
                        <div className="mt-2 flex justify-center">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                onChange={leerDatos}
                            />
                        </div>
                        <div className="flex items-center ml-[70px] mt-4">
                            <input
                                id="link-checkbox"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label className="ms-2 text-sm font-medium text-black">
                                Recuérdame
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="flex w-36 justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500"
                        >
                            Entrar
                        </button>
                    </div>
                </form>

                <p className="mt-4 mb-10 text-center text-sm text-black">
                    Aún no tengo cuenta, quiero{' '}
                    <Link to="/register" className="font-semibold text-black hover:text-gray-500 underline">
                        Registrarme
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
