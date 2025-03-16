// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/Configuration.tsx
import { Component } from 'react';
import clienteAxios from '../../config/axios';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Input, InputGroup } from '../ui';
import Navegacion from '../custom-ui/Navegacion';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { AxiosError } from 'axios';



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

interface ErrorResponse {
  mensaje?: string;
}

export class Configuration extends Component {
  state: { users: Usuario[] } = { users: [] };

  // Método para obtener los usuarios desde la API
  async componentDidMount() {
    try {
      let token = localStorage.getItem('token');

      if (!token) {
        console.error('❌ No hay token disponible en localStorage');
        return;
      }

      // Asegurar que el token tiene el formato "Bearer TOKEN"
      if (!token.startsWith('Bearer ')) {
        token = `Bearer ${token}`;
      }

      const response = await clienteAxios.get('/usuario/me', {
        headers: { Authorization: token }
      });

      console.log("✅ Usuario autenticado:", response.data);
      this.setState({ users: [response.data] }); // Guarda solo el usuario autenticado
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>; // 🔹 Especificamos el tipo de `data`
      console.error('❌ Error obteniendo el usuario autenticado:', err.response?.data?.mensaje || err.message);
    }
  }
  render() {
    return (
      <div className="flex min-h-full flex-col p-20 bg-slate-300 font-nanum pb-[500px]">
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
            <div className="bg-white mx-auto max-w-7xl px-6 lg:px-2 border-t-4 border-gray-400 mb-10">
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
                            {user.esReclutador ? "Reclutador" : "Postulante"}
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

                <div className="max-w-2xl xl:col-span-2 ">

                  <form className='pb-10'>
                    <div className="space-y-12 sm:space-y-16">
                      <div>


                        <div className=" pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                          <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="username" className="block text-lg font-bold text-gray-900 ">
                              Empresa
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                              <div className="flex items-center rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:max-w-md">

                                <input
                                  id="username"
                                  name="username"
                                  type="text"
                                  placeholder="Nombre de la empresa"
                                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="sm:grid sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="about" className="block text-lg font-bold text-gray-900">
                              Descripción de la vacante
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                              <textarea
                                id="about"
                                name="about"
                                rows={3}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                defaultValue={''}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>


                        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5">
                              First name
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                              <input
                                id="first-name"
                                name="first-name"
                                type="text"
                                autoComplete="given-name"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:max-w-xs sm:text-sm/6"
                              />
                            </div>
                          </div>











                        </div>
                      </div>

                      <div>



                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">

                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>
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
