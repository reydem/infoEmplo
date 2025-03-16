import React, { Component } from 'react'
import clienteAxios from '../../config/axios';
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

export class UserSession extends Component {
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
            <>
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
            </>
        )
    }
}

export default UserSession
