// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/UserSession.tsx
import React, { Component } from 'react'
import clienteAxios from '../../config/axios';
import { AxiosError } from 'axios';
import VacanteList from './VacanteList';
import VacantesSession from './VacantesSession';
import Modal from './Modal';

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

interface Vacante {
    _id: string;
    titulo: string;
    descripcion: string;
    imagen_empresa?: string;
}

interface UserSessionState {
    users: Usuario[];
    vacantes: Vacante[];
}

interface UserSessionState {
    users: Usuario[];
    vacantes: Vacante[];
    vacanteToEdit: Vacante | null;
}

export class UserSession extends Component<{}, UserSessionState> {
    state: UserSessionState = {
        users: [],
        vacantes: [],
        vacanteToEdit: null,
    };
    // Método para obtener los datos del usuario autenticado y vacantes
    async componentDidMount() {
        try {
            let token = localStorage.getItem('token');

            if (!token) {
                console.error('❌ No hay token disponible en localStorage');
                return;
            }

            if (!token.startsWith('Bearer ')) {
                token = `Bearer ${token}`;
            }

            // Obtener usuario autenticado
            const usuarioResponse = await clienteAxios.get('/usuario/me', {
                headers: { Authorization: token }
            });

            console.log("✅ Usuario autenticado:", usuarioResponse.data);
            this.setState({ users: [usuarioResponse.data] });

            // Obtener vacantes iniciales
            this.fetchVacantes();
            // Agregar listener para actualizar vacantes cuando se cree una nueva
            window.addEventListener("vacanteCreada", this.handleVacanteCreada);

        } catch (error) {
            const err = error as AxiosError<ErrorResponse>;
            console.error('❌ Error obteniendo datos:', err.response?.data?.mensaje || err.message);
        }
    }

   
    // Función para cerrar el modal sin actualizar
    handleCloseModal = () => {
        this.setState({ vacanteToEdit: null });
    }

    // Nueva función para obtener las vacantes
    fetchVacantes = async () => {
        try {
            const vacantesResponse = await clienteAxios.get('/vacantes');
            this.setState({ vacantes: vacantesResponse.data || [] });
        } catch (error) {
            console.error('Error al obtener vacantes:', error);
        }
    }

    // Función que maneja el evento de vacante creada
    handleVacanteCreada = () => {
        this.fetchVacantes();
    }

    componentWillUnmount() {
        window.removeEventListener("vacanteCreada", this.handleVacanteCreada);
    }
    // Aquí defines el método con el mismo nombre que pasas en onDelete
    handleDeleteVacante = async (idVacante: string) => {
        try {
            let token = localStorage.getItem('token');
            if (!token) {
                console.error('❌ No hay token disponible');
                return;
            }
            if (!token.startsWith('Bearer ')) {
                token = `Bearer ${token}`;
            }
            await clienteAxios.delete(`/vacantes/${idVacante}`, {
                headers: { Authorization: token }
            });
            // Actualizar el estado filtrando la vacante eliminada
            this.setState((prevState) => ({
                vacantes: prevState.vacantes.filter(v => v._id !== idVacante)
            }));
            console.log('✅ Vacante eliminada correctamente');
        } catch (error) {
            console.error('❌ Error eliminando la vacante:', error);
        }
    };


    

    handleEditVacante = (idVacante: string) => {
        const vacanteEncontrada = this.state.vacantes.find(v => v._id === idVacante);
        if (vacanteEncontrada) {
            this.setState({ vacanteToEdit: vacanteEncontrada });
        }
    }

    handleVacanteUpdated = () => {
        this.fetchVacantes();     // Refresca la lista de vacantes
        this.setState({ vacanteToEdit: null }); // Cierra el modal al actualizar
    }



    render() {
        return (
            <>
                <ul role="list" className="divide-y divide-gray-200 xl:col-span-3 mt-6">
                    {this.state.users.length > 0 ? (
                        this.state.users.map((user) => (
                            <li key={user._id} className="flex flex-col gap-10  first:pt-0 last:pb-0 sm:flex-row mb-3">
                                <img
                                    alt={user.nombre}
                                    src={user.fotoPerfil ? `http://localhost:5000/uploads/${user.fotoPerfil}` : "https://via.placeholder.com/150"}
                                    className="aspect-4/5 w-52 flex-none rounded-2xl object-cover"
                                />

                                <div className="max-w-xl flex-auto mb-3">
                                    <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">
                                        {user.nombre} {user.primerApellido} {user.segundoApellido}
                                    </h3>
                                    <p className="text-base/7 text-gray-600">
                                        {user.esReclutador ? "Reclutador" : "Postulante"}
                                    </p>
                                    <p className="text-base/7 text-gray-600">Correo: {user.correo}</p>
                                    <p className="text-base/7 text-gray-600">Teléfono: {user.telefono}</p>
                                    <p className="text-base/7 text-gray-600">Hoja de Vida: {user.hojaVida ? "Disponible" : "No disponible"}</p>

                                    <ul role="list" className="mt-6 flex gap-x-6 mb-3">
                                        <li>
                                            <a href={user.xUrl || "#"} className="text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">X</span>
                                                <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                                                    <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                                                </svg>
                                            </a>
                                        </li>
                                        <li className=''>
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
                    {/* Renderiza la lista de vacantes */}
                    <VacanteList
                        onEdit={this.handleEditVacante}
                        vacantes={this.state.vacantes}
                        onDelete={this.handleDeleteVacante}
                    />
                    {this.state.vacanteToEdit && (
                        <VacantesSession
                            vacanteToEdit={this.state.vacanteToEdit}
                            onVacanteUpdated={this.handleVacanteUpdated}
                        />
                    )}
                </ul>

                 {/* Modal para editar la vacante */}
                 <Modal
                    isOpen={this.state.vacanteToEdit !== null}
                    onClose={this.handleCloseModal}
                >
                    <VacantesSession
                        vacanteToEdit={this.state.vacanteToEdit}
                        onVacanteUpdated={this.handleVacanteUpdated}
                    />
                </Modal>


            </>
        )
    }
}

export default UserSession;
