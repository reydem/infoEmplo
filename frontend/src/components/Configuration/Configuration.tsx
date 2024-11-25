// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/Configuration.tsx
import { Component } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import Logo from '../../assets/Logo.png';
import { Button, Input, InputGroup } from '../ui';
import { Link } from 'react-router-dom';
import {
    UserIcon,
    LockClosedIcon,
    Cog8ToothIcon,
    BellAlertIcon
} from '@heroicons/react/24/outline';

export class Configuration extends Component {
    render() {
        return (
            <div className="flex min-h-full flex-col p-20 bg-slate-300 font-nanum ">
                {/* <header className="shrink-0 border-b border-gray-200 bg-white mt-10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <img
            alt="Your Company"
            src={Logo}
            className="h-8 w-auto"
          />
          <div>
            <Button color="dark">
              Entrar
            </Button>
          </div>
        </div>
      </header> */}
                <div className="mx-auto flex w-full max-w-7xl items-start border-4 border-gray-400 rounded-[32px] bg-white">
                    <aside className="sticky top-8 hidden w-64 shrink-0 lg:block ">
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            {/* Envolver el logo con el componente Link */}
                            <Link to="/">
                                <img
                                    alt="Your Company"
                                    src={Logo}
                                    className="h-10 w-auto"
                                />
                            </Link>
                            <div>
                                <div className='ml-7'>
                                    <Button color="dark">
                                        Contenido
                                    </Button>
                                </div> <div className='ml-7'>
                                    <Link to="/login">
                                        <Button className='bg-purple-custom m-0 p-0'>
                                            <div className='text-[9px] '>
                                                Cerrar seccion
                                            </div>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <h2 color="white" className="-m-2.5 p-2.5 text-lg text-black font-bold hover:text-gray-300">
                                Navegacion
                            </h2>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <Link to={'/configuration'}>
                                <Button color="white" className="-m-2.5 p-2.5 text-black">
                                    <UserIcon
                                        aria-hidden="true"
                                        className="w-6 h-6 font-bold"
                                        strokeWidth={2.5} // Ajusta el grosor del trazo
                                    />
                                    Información personal
                                </Button>
                            </Link>
                        </div>
                        <div className="flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                            <Button color="white" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
                                <LockClosedIcon aria-hidden="true" className="size-6" />
                                <p className='leading-tight text-left'>
                                    Inicio de sesión y seguridad
                                </p>
                            </Button>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <Button color="white" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
                                <Cog8ToothIcon aria-hidden="true" className="size-6" />
                                Preferencias
                            </Button>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <Button color="white" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
                                <BellAlertIcon aria-hidden="true" className="size-6" />
                                Notificaciones
                            </Button>
                        </div>
                        {/* Left column area */}
                    </aside>
                    {/* Main area */}
                    <main className="flex-1 border-l-4 border-gray-400 rounded-tr-[18px] bg-transparent">
                        <InputGroup className="flex-1 " >
                            <MagnifyingGlassIcon className='ml-5 ' />
                            <Input
                                name="search"
                                aria-label="Search"
                                className="border-2 border-gray-400 rounded-lg my-5 mx-5 w-auto max-w-[500px] sm:leading-[0.75rem]" />
                            <div className="absolute top-[5px] right-[302px] bg-white text-black font-bold">
                                Comunidad
                            </div>
                            <div className="absolute top-[5px] right-[176px] bg-white text-black font-bold">
                                Soporte
                            </div>

                            <div className="absolute top-[5px] right-[80px] bg-white text-black font-bold">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                            </div>
                            <div className="absolute top-[5px] right-[4px] bg-white text-black font-bold">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                </svg>
                            </div>

                        </InputGroup>
                        {/* Main area */}
                        <div className="mt-3 mx-auto max-w-7xl px-6 lg:px-2 border-t-4 border-gray-400 ">
                            <p className="font-bold mt-3 text-center text-2xl">Información del perfil</p>
                            <div className="grid grid-cols-3 gap-6 mt-6 mb-14">
                                {/* Columna izquierda: Botones de agregar archivos */}
                                <form className="space-y-2">
                                    <div className="flex flex-col items-center ">
                                        <div className="flex flex-col items-center gap-4 mt-10">
                                            {/* Botón para subir foto de perfil */}
                                            <div className="flex flex-col items-center border-[1px] border-black rounded-[10px] shadow-custom">
                                                <label
                                                    htmlFor="profilePhoto"
                                                    className="flex flex-col items-center justify-center w-24 h-24 cursor-pointer border-gray-400 rounded-[10px] bg-slate-300 hover:bg-gray-200"
                                                >
                                                    {/* Ícono SVG */}
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none" viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="size-6">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                    </svg>
                                                    {/* Texto debajo del ícono */}
                                                    <span className="mt-2 text-xs text-center font-bold text-black">Agregar foto de perfil</span>
                                                </label>
                                                <input id="profilePhoto" type="file" className="hidden" />
                                            </div>
                                            {/* Botón para subir hoja de vida */}
                                            <div className="flex flex-col items-center border-[1px] border-black rounded-[10px] mt-10 shadow-custom">
                                                <label
                                                    htmlFor="cv"
                                                    className="flex flex-col items-center justify-center w-24 h-24 cursor-pointer border-gray-400 rounded-[10px] bg-slate-300 hover:bg-gray-200"
                                                >
                                                    {/* Ícono SVG diferente */}
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none" viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="size-6">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                                    </svg>
                                                    {/* Texto debajo del ícono */}
                                                    <span className="mt-2 text-xs text-center font-bold text-black">Agregar hoja de vida</span>
                                                </label>
                                                <input id="cv" type="file" className="hidden" />
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                {/* Columna central: Formulario principal */}
                                <div className="col-span-2 space-y-6 mr-16">
                                    {/* Sección de nombres y apellidos */}
                                    <div className="grid grid-cols-2 gap-6 p-6 bg-gray-100 rounded-lg shadow-md">
                                        <div className="space-y-4">
                                            <div>
                                                <label
                                                    htmlFor="primer-nombre"
                                                    className="block text-xs font-bold text-gray-900"
                                                >
                                                    Primer nombre*:
                                                </label>
                                                <input
                                                    id="primer-nombre"
                                                    type="text"
                                                    className="mt-1 block w-full p-[1px] rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="segundo-nombre"
                                                    className="block text-xs font-bold text-gray-900"
                                                >
                                                    Segundo nombre:
                                                </label>
                                                <input
                                                    id="segundo-nombre"
                                                    type="text"
                                                    className="mt-1 block w-full p-[1px] rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label
                                                    htmlFor="primer-apellido"
                                                    className="block text-xs font-bold text-gray-900"
                                                >
                                                    Primer apellido*:
                                                </label>
                                                <input
                                                    id="primer-apellido"
                                                    type="text"
                                                    className="mt-1 block w-full p-[1px] rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="segundo-apellido"
                                                    className="block text-xs font-bold text-gray-900"
                                                >
                                                    Segundo apellido*:
                                                </label>
                                                <input
                                                    id="segundo-apellido"
                                                    type="text"
                                                    className="mt-1 block w-full p-[1px] rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contenedor principal */}
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Primer formulario */}
                                        <div className="grid gap-6 p-6 bg-gray-100 rounded-lg shadow-md">
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block text-xs font-bold text-gray-900"
                                                >
                                                    Correo electrónico*:
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    className="mt-1 block w-full p-[1px] rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="telefono"
                                                    className="block text-xs font-bold text-gray-900"
                                                >
                                                    Teléfono*:
                                                </label>
                                                <input
                                                    id="telefono"
                                                    type="tel"
                                                    className="mt-1 block w-full p-[1px] rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="direccion"
                                                    className="block text-xs font-bold text-gray-900"
                                                >
                                                    Dirección*:
                                                </label>
                                                <div className="flex space-x-2">
                                                    <input
                                                        id="direccion1"
                                                        type="text"
                                                        className="block w-full p-[1px] rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                                                    />
                                                    <input
                                                        id="direccion2"
                                                        type="text"
                                                        className="block w-full p-[1px] rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                                                    />
                                                    <input
                                                        id="direccion3"
                                                        type="text"
                                                        className="block w-full p-[1px] rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        {/* Segundo formulario */}
                                        <div className="grid gap-6 p-6 bg-gray-100 rounded-lg shadow-md">
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block text-xs font-bold text-gray-900"
                                                >
                                                    Ciudad*:
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    className="mt-1 block w-full p-[1px] rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="telefono"
                                                    className="block text-xs font-bold text-gray-900"
                                                >
                                                    Ocupacion*:
                                                </label>
                                                <input
                                                    id="telefono"
                                                    type="tel"
                                                    className="mt-1 block w-full p-[1px] rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="telefono"
                                                    className="block text-xs font-bold text-gray-900"
                                                >
                                                    Educacion*:
                                                </label>
                                                <input
                                                    id="telefono"
                                                    type="tel"
                                                    className="mt-1 block w-full p-[1px] rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    {/* Botón Guardar */}
                                    <div className="flex justify-center mt-10">
                                        <button
                                            type="submit"
                                            className="flex w-44 justify-center p-[1px] rounded-md bg-black px-3 py-1.5 text-base font-semibold text-white shadow-sm hover:bg-gray-500"
                                        >
                                            Guardar cambios
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </main>
                    {/* Main area */}

                </div>
            </div>
        )
    }
}

export default Configuration
