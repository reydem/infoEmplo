// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Login/Login.tsx
import { Component } from 'react'
import Logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';

export class Login extends Component {
    render() {
        return (
            <>
                {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
          */}
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-nanum">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <Link to="/">
                            <img
                                alt="Your Company"
                                src={Logo}
                                className="mx-auto h-44 w-auto"
                            />
                        </Link>
                        <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Iniciar Sesion
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-4 border-gray-400 rounded-[32px] bg-slate-300 ">
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="email" className="text-center block text-xl font-bold text-gray-900">
                                    Correo:
                                </label>
                                <div className="mt-2 flex justify-center">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <label htmlFor="password" className="text-center block text-xl font-bold text-gray-900">
                                        Contraseña:
                                    </label>
                                    {/* <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div> */}
                                </div>
                                <div className="mt-2 flex justify-center">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                                <div className="flex items-center ml-[70px]">
                                    <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-white-800 focus:ring-2 dark:bg-white-700 dark:border-gray-600" />
                                    <label className="ms-2 text-sm font-medium text-black ">Recuérdame <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline"></a></label>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="flex w-36 justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                >
                                    Entrar
                                </button>
                            </div>

                        </form>

                        <p className="mt-4 mb-10 text-center text-sm/6 text-black">
                            Aun no tengo cuenta, quiero{' '}
                            <Link to="/register">
                            <a href="#" className="font-semibold text-black hover:text-gray-500 underline">
                                Registrarme
                            </a>
                            </Link>
                        </p>
                    </div>
                </div>
            </>
        )
    }
}

export default Login
