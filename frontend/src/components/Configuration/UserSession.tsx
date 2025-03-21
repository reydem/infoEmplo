// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/UserSession.tsx
import React, { Component } from 'react';
import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../config/axios';
import { AxiosError } from 'axios';
import VacantesSession from './VacantesSession';
import Modal from './Modal';
import VacanteOPostulaciones from './VacanteOPostulaciones';

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
    postulaciones?: Vacante[];
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
    vacantes: Vacante[];
    vacanteToEdit: Vacante | null;
}

export class UserSession extends Component<{}, UserSessionState> {
    static contextType = CRMContext;
    
    state: UserSessionState = {
        vacantes: [],
        vacanteToEdit: null,
    };

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
            // Obtener usuario autenticado y actualizar el contexto
            const usuarioResponse = await clienteAxios.get('/usuario/me', {
                headers: { Authorization: token }
            });
            console.log("✅ Usuario autenticado:", usuarioResponse.data);
            const [auth, setAuth] = this.context;
            setAuth({ ...auth, user: usuarioResponse.data });
            // Obtener vacantes iniciales
            this.fetchVacantes();
            window.addEventListener("vacanteCreada", this.handleVacanteCreada);
        } catch (error) {
            const err = error as AxiosError<ErrorResponse>;
            console.error('❌ Error obteniendo datos:', err.response?.data?.mensaje || err.message);
        }
    }

    handleCloseModal = () => {
        this.setState({ vacanteToEdit: null });
    }

    fetchVacantes = async () => {
        try {
            const vacantesResponse = await clienteAxios.get('/vacantes');
            this.setState({ vacantes: vacantesResponse.data || [] });
        } catch (error) {
            console.error('Error al obtener vacantes:', error);
        }
    }

    handleVacanteCreada = () => {
        this.fetchVacantes();
    }

    componentWillUnmount() {
        window.removeEventListener("vacanteCreada", this.handleVacanteCreada);
    }

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
        this.fetchVacantes();
        this.setState({ vacanteToEdit: null });
    }

    render() {
        const [auth] = this.context;
        const user = auth.user;
        return (
            <>
                <ul role="list" className="divide-y divide-gray-200 xl:col-span-3 mt-6">
                    {user ? (
                        <li key={user._id} className="flex flex-col gap-10 first:pt-0 last:pb-0 sm:flex-row mb-3">
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
                                <p className="text-base/7 text-gray-600">
                                    Hoja de Vida: {user.hojaVida && user.hojaVida.length > 100 ? user.hojaVida.substring(0, 100) + "..." : user.hojaVida ?? "Sin Hoja de Vida"}
                                </p>
                            </div>
                        </li>
                    ) : (
                        <p className="text-center text-gray-600">No hay usuarios registrados.</p>
                    )}
                    <div className="col-span-3 p-4 overflow-y-auto">
                        <VacanteOPostulaciones onEditVacante={this.handleEditVacante} />
                    </div>
                </ul>
                <Modal isOpen={this.state.vacanteToEdit !== null} onClose={this.handleCloseModal}>
                    <VacantesSession vacanteToEdit={this.state.vacanteToEdit} onVacanteUpdated={this.handleVacanteUpdated} />
                </Modal>
            </>
        );
    }
}

export default UserSession;
