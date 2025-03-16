// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/Configuration.tsx
import { Component } from 'react';
import clienteAxios from '../../config/axios';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Input, InputGroup } from '../ui';
import Navegacion from '../custom-ui/Navegacion';

interface Usuario {
    _id: string;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    correo: string;
    telefono: string;
    esReclutador: boolean;
    hojaVida?: string;
    fotoPerfil?: string;
}

export class Configuration extends Component {
    state: { users: Usuario[] } = { users: [] };

    // Método para obtener los usuarios desde la API
    async componentDidMount() {
        try {
            const response = await clienteAxios.get('/usuarios'); // Ruta de la API
            console.log("Usuarios obtenidos:", response.data); // 👀 Verificar qué llega al frontend
            this.setState({ users: response.data }); // Guardamos los usuarios en el estado
        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
        }
    }

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
                    <Navegacion />

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
                        <div className="bg-white pt-10 md:pt-10 mt-3 mx-auto max-w-7xl px-6 lg:px-2 border-t-4 border-gray-400">
                            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 px-6 lg:px-8 xl:grid-cols-5">

                                {/* Lista de usuarios obtenidos de la base de datos */}
                                <ul role="list" className="divide-y divide-gray-200 xl:col-span-3 mt-6">
                                    {this.state.users.length > 0 ? (
                                        this.state.users.map((user) => (
                                            <li key={user._id} className="flex flex-col gap-10 py-12 first:pt-0 last:pb-0 sm:flex-row">
                                                <img
                                                    alt={user.nombre}
                                                    src={user.fotoPerfil ? `http://localhost:5000/uploads/${user.fotoPerfil}` : "https://via.placeholder.com/150"}
                                                    className="aspect-4/5 w-52 flex-none rounded-2xl object-cover"
                                                />

                                                <div className="max-w-xl flex-auto">
                                                    <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">
                                                        {user.nombre} {user.primerApellido} {user.segundoApellido}
                                                    </h3>
                                                    <p className="text-base/7 text-gray-600">
                                                        {user.esReclutador ? "Reclutador" : "Usuario Regular"}
                                                    </p>
                                                    <p className="text-base/7 text-gray-600">Correo: {user.correo}</p>
                                                    <p className="text-base/7 text-gray-600">Teléfono: {user.telefono}</p>
                                                    <p className="text-base/7 text-gray-600">Hoja de Vida: {user.hojaVida ? "Disponible" : "No disponible"}</p>

                                                    <ul role="list" className="mt-6 flex gap-x-6">
                                                        <li>
                                                            <a href={user.xUrl || "#"} className="text-gray-400 hover:text-gray-500">
                                                                <span className="sr-only">X</span>
                                                                <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                                                                    <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                                                                </svg>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href={user.linkedinUrl || "#"} className="text-gray-400 hover:text-gray-500">
                                                                <span className="sr-only">LinkedIn</span>
                                                                <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                                                                    <path
                                                                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                                        clipRule="evenodd"
                                                                        fillRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-600">No hay usuarios registrados.</p>
                                    )}
                                </ul>

                                <div className="max-w-2xl xl:col-span-2">
                                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                        About the team
                                    </h2>
                                    <p className="mt-6 text-lg/8 text-gray-600">
                                        We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
                                        best results for our clients.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Botón para subir foto de perfil */}
                        <div className="ml-[95px] mt-2">
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
                                <span className="mt-2 text-xs text-center font-bold text-black p-2">Editar foto de perfil</span>
                            </label>
                            <input id="profilePhoto" type="file" className="hidden" />
                        </div>

                        <div className="mt-3 mx-auto max-w-7xl px-6 lg:px-2 border-t-4 border-gray-400 ">
                            <p className="font-bold mt-3 text-center text-2xl">Editar informacion personal</p>
                            <div className="grid grid-cols-3 gap-6 mt-6 mb-14">
                                {/* Columna izquierda: Botones de agregar archivos */}
                                <form className="space-y-2">
                                    <div className="flex flex-col items-center ">
                                        <div className="flex flex-col items-center gap-4 mt-10">

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
                                                    <span className="mt-2 text-xs text-center font-bold text-black p-2">Ver hoja de vida</span>
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
