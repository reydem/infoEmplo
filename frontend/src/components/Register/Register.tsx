// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Register/Register.tsx
import { Component } from 'react'
import Logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';

export class Register extends Component {
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
                                className="mx-auto h-16 w-auto"
                            />
                        </Link>
                        <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Registrarse en Info.empleo
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-4 border-gray-400 rounded-[32px] bg-slate-300 ">
                        <form action="#" method="POST" className="space-y-2">
                            <div>
                                <label htmlFor="email" className="ml-4 mt-4 block text-sm font-bold text-gray-900">
                                    Nombre*:
                                </label>
                                <div className="ml-4 flex ">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-60 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="email" className="ml-4 block text-sm font-bold text-gray-900">
                                    Primer apellido*:
                                </label>
                                <div className="ml-4 flex ">
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
                            <div className=''>
                                <label htmlFor="email" className="ml-4 block text-sm font-bold text-gray-900">
                                    Segundo apellido*:
                                </label>
                                <div className="ml-4 flex ">
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
                            <div className=''>
                                <label htmlFor="email" className="ml-4 block text-sm font-bold text-gray-900">
                                    Correo*:
                                </label>
                                <div className="ml-4 flex ">
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
                            <div className=''>
                                <label htmlFor="email" className="ml-4 block text-sm font-bold text-gray-900">
                                    Telefono*:
                                </label>
                                <div className="ml-4 flex ">
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
                            <div className=''>
                                <label htmlFor="email" className="ml-4 block text-sm font-bold text-gray-900">
                                    Contraseña*:
                                </label>
                                <div className="ml-4 flex ">
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
                            <div className=''>
                                <label htmlFor="email" className="ml-4 block text-sm font-bold text-gray-900">
                                    Repetir Contraseña*:
                                </label>
                                <div className="ml-4 flex ">
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
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="flex w-36 mt-5 mb-10 justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                >
                                    Registrarse
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Register
