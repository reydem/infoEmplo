// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Vacantes/Vacantes.tsx
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import Spinner from '../layout/Spinner';
import { CRMContext } from '../../context/CRMContext';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import Pagination from '../Pagination/Pagination';

// Interfaz para definir la estructura de las vacantes
interface Vacante {
    _id: string;
    titulo: string;
    salario_ofrecido: number;
    imagen_empresa?: string;
    descripcion?: string;
    createdAt: string; // Fecha de creación
}

function Vacantes() {
    const [vacantes, setVacantes] = useState<Vacante[]>([]);
    const [postulaciones, setPostulaciones] = useState<any[]>([]);
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalDocs, setTotalDocs] = useState<number>(0);
    const limit: number = 2;

    // Usar el contexto
    const crmContext = useContext(CRMContext);
    if (!crmContext) {
        throw new Error('CRMContext debe ser usado dentro de un CRMProvider');
    }
    const [auth] = crmContext; // Extraer valores del contexto

    useEffect(() => {
        if (!auth.token) {
            navigate('/iniciar-sesion');
            return;
        }

        const consultarAPI = async () => {
            try {
                const responseVacantes = await clienteAxios.get(
                    `/vacantes/pagination?page=${page}&limit=${limit}`,
                    { headers: { Authorization: `Bearer ${auth.token}` } }
                );
                setVacantes(responseVacantes.data.data);
                setTotalPages(responseVacantes.data.totalPages);
                setTotalDocs(responseVacantes.data.totalDocs);
            } catch (error: any) {
                console.error('Error al consultar la API:', error);
                if (error.response?.status === 500) {
                    navigate('/iniciar-sesion');
                }
            }
        };

        const obtenerDatosUsuario = async () => {
            try {
                const responseUsuario = await clienteAxios.get('/usuario/me', {
                    headers: { Authorization: `Bearer ${auth.token}` }
                });
                setPostulaciones(responseUsuario.data.postulaciones);
            } catch (error: any) {
                console.error("Error al obtener datos del usuario:", error);
            }
        };

        consultarAPI();
        obtenerDatosUsuario();
    }, [page, auth.token, navigate]);

    if (!auth.auth) {
        navigate('/iniciar-sesion');
    }

    if (!vacantes.length) return <Spinner />;

    // Función para postularse a una vacante con confirmación de SweetAlert2
    const handlePostular = (idVacante: string) => {
        Swal.fire({
            title: '¿Confirmas tu postulación?',
            text: 'Si confirmas, se enviará tu postulación. Si decides no postularte, podrás eliminarla desde el panel de configuración, pero ya no podrás volver a postularte a esta vacante.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, postularme',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await clienteAxios.post(
                        `/vacantes/${idVacante}/postular`,
                        {},
                        { headers: { Authorization: `Bearer ${auth.token}` } }
                    );
                    Swal.fire({
                        icon: 'success',
                        title: 'Postulación exitosa',
                        text: response.data.mensaje,
                    });
                    // Se agrega el ID de la vacante al estado de aplicadas
                    setPostulaciones((prev) => [...prev, { vacante: idVacante, estado: 'aplicado' }]);
                } catch (error: any) {
                    console.error("Error al postularse:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al postularse',
                        text: error.response?.data.mensaje || "Error al postularse",
                    });
                }
            }
        });
    };
    const handleCancelarPostulacion = (idVacante: string) => {
        Swal.fire({
            title: '¿Confirmas cancelar tu postulación?',
            text: 'Esta acción cancelará tu postulación y la marcará como cancelada.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await clienteAxios.delete(
                        `/vacantes/${idVacante}/postular`,
                        { headers: { Authorization: `Bearer ${auth.token}` } }
                    );
                    Swal.fire({
                        icon: 'success',
                        title: 'Postulación cancelada',
                        text: response.data.mensaje,
                    });
                    // Actualiza el estado de las postulaciones: cambia el estado a "cancelado"
                    setPostulaciones(prev =>
                        prev.map(post =>
                            post.vacante.toString() === idVacante
                                ? { ...post, estado: 'cancelado' }
                                : post
                        )
                    );
                } catch (error: any) {
                    console.error("Error al cancelar la postulación:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al cancelar la postulación',
                        text: error.response?.data.mensaje || "Error al cancelar la postulación",
                    });
                }
            }
        });
    };

    const obtenerEstadoPostulacion = (vacanteId: string) => {
        const postulacion = postulaciones.find(post => post.vacante.toString() === vacanteId);
        return postulacion ? postulacion.estado : null;
    };

    return (
        <div className="bg-gray-50 listado-empleados border-gray-400 border-t-4">
            <main>
                <h1 className="mt-6 text-center text-2xl font-extrabold text-gray-900 mb-4">
                    <span className="inline-block bg-amber-300 px-2 py-1">
                        "Postulación a Oferta de Trabajo"
                    </span>
                </h1>
                <section aria-labelledby="recent-heading" className="my-3">
                    <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
                        <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                            {vacantes.map((vacante) => (
                                <div key={vacante._id} className="border border-black rounded-[10px] shadow-custom">
                                    {/* Encabezado */}
                                    <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                                        <dl className="grid flex-1">
                                            <div>
                                                <dt className="font-medium text-gray-900 text-2xl">
                                                    {vacante.titulo}
                                                </dt>
                                            </div>
                                        </dl>
                                    </div>
                                    {/* Detalle de la vacante */}

                                    <ul role="list" className="divide-y divide-gray-200">
                                        <li className="p-4 sm:p-6">
                                            <div className="flex items-center sm:items-start">
                                                <div className="shrink-0 overflow-hidden rounded-lg bg-gray-200 w-20 h-20">
                                                    <img
                                                        alt={vacante.titulo}
                                                        src={
                                                            vacante.imagen_empresa
                                                                ? `http://localhost:5000/uploads/${vacante.imagen_empresa}`
                                                                : "https://via.placeholder.com/150"
                                                        }
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                <div className="ml-6 flex-1 text-sm">
                                                    <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                                        <h5>{vacante.titulo}</h5>
                                                        <p className="mt-2 sm:mt-0 text-base font-bold">
                                                            <samp className="text-base font-light">Salario a pagar: </samp>${vacante.salario_ofrecido}
                                                        </p>
                                                    </div>
                                                    <p className="hidden text-gray-500 sm:mt-2 sm:block">
                                                        {vacante.descripcion}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    {/* Sección del botón de postulación */}
                                    <div className="mt-6 sm:flex sm:justify-between mb-3 mx-3">
                                        <div className="flex items-center">
                                            <CheckCircleIcon aria-hidden="true" className="w-5 h-5 text-green-500" />
                                            <p className="ml-2 text-sm font-medium text-gray-500">
                                                Fecha de publicación{' '}
                                                <time dateTime={vacante.createdAt}>
                                                    {new Date(vacante.createdAt).toLocaleDateString('es-ES')}
                                                </time>
                                            </p>
                                        </div>
                                        <div className="lg:flex lg:items-center lg:justify-end">
                                            {(() => {
                                                const estado = obtenerEstadoPostulacion(vacante._id);
                                                if (estado === 'aplicado') {
                                                    return (
                                                        <div className="flex items-center space-x-2">
                                                            {/* Ícono clickeable para cancelar la postulación */}
                                                            <div
                                                                className="cursor-pointer"
                                                                onClick={() => handleCancelarPostulacion(vacante._id)}
                                                            >
                                                                <CheckCircleIcon aria-hidden="true" className="w-6 h-6 text-green-500" />
                                                            </div>
                                                            <button
                                                                onClick={() => handleCancelarPostulacion(vacante._id)}
                                                                className="text-sm text-red-500"
                                                            >
                                                                Cancelar
                                                            </button>
                                                        </div>
                                                    );
                                                } else if (estado === 'cancelado') {
                                                    return (
                                                        <div className="flex items-center justify-center rounded-md border border-red-500 bg-white px-2.5 py-2 text-sm font-medium text-red-500 shadow-xs">
                                                            <span>X</span>
                                                        </div>
                                                    );
                                                } else {
                                                    return (
                                                        <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handlePostular(vacante._id);
                                                            }}
                                                            className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        >
                                                            <span>Postularse</span>
                                                            <span className="sr-only">postularse</span>
                                                        </a>
                                                    );
                                                }
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    totalDocs={totalDocs}
                    limit={limit}
                />
            </main>
        </div>


    );
}

export default Vacantes;
