// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Vacantes/Vacantes.tsx
import { useEffect, useState, Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Vacante from './Vacante';
import Spinner from '../layout/Spinner';
import { CRMContext } from '../../context/CRMContext';



import { CheckCircleIcon } from '@heroicons/react/20/solid'


import Pagination from '../Pagination/Pagination';


// Interfaz para definir la estructura de las vacantes
interface Vacante {
    _id: string;
    titulo: string;
    salario_ofrecido: number;
    imagen_empresa?: string;
}

function Vacantes() {
    const [vacantes, setVacantes] = useState<Vacante[]>([]);
    const [actualizarVacantes, setActualizarVacantes] = useState(false);
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalDocs, setTotalDocs] = useState<number>(0);
    const limit: number = 1;

    // Usar el contexto como arreglo
    const crmContext = useContext(CRMContext);

    // Validar que el contexto no sea undefined
    if (!crmContext) {
        throw new Error('CRMContext debe ser usado dentro de un CRMProvider');
    }

    const [auth, guardarAuth] = crmContext; // Extraer valores del contexto

    useEffect(() => {
        if (auth.token !== '') {
            const consultarAPI = async () => {
                try {
                    const response = await clienteAxios.get(`/vacantes/pagination?page=${page}&limit=${limit}`, {
                        headers: { Authorization: `Bearer ${auth.token}` },
                    });
                    setVacantes(response.data.data);
                    setTotalPages(response.data.totalPages);
                    setTotalDocs(response.data.totalDocs);
                } catch (error: any) {
                    console.error('Error al consultar la API:', error);
                    if (error.response?.status === 500) {
                        navigate('/iniciar-sesion');
                    }
                }
            };

            consultarAPI();
        } else {
            navigate('/iniciar-sesion');
        }
    }, [page, auth.token, navigate]);  // Se elimina "actualizarVacantes" de las dependencias


    if (!auth.auth) {
        navigate('/iniciar-sesion');
    }

    if (!vacantes.length) return <Spinner />;



    return (
        <div className="bg-gray-50 listado-empleados border-gray-400 border-t-4  ">
            <main className="">
                <section aria-labelledby="recent-heading" className="my-3">
                    <h2 id="recent-heading" className="sr-only">Vacantes Disponibles</h2>
                    <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
                        <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                            {vacantes.map((vacante) => (
                                <div key={vacante._id} className="border-[1px] border-black rounded-[10px] shadow-custom">
                                    {/* Encabezado con el nombre de la empresa */}
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
                                                <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:size-40">
                                                    <img
                                                        alt={vacante.titulo}
                                                        src={
                                                            vacante.imagen_empresa
                                                                ? `http://localhost:5000/uploads/${vacante.imagen_empresa}`
                                                                : "https://via.placeholder.com/150"
                                                        }
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                                <div className="ml-6 flex-1 text-sm">
                                                    <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                                        <h5>{vacante.titulo}</h5>
                                                        <p className="mt-2 sm:mt-0">${vacante.salario_ofrecido}</p>
                                                    </div>
                                                    <p className="hidden text-gray-500 sm:mt-2 sm:block">
                                                        {vacante.descripcion}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="mt-6 sm:flex sm:justify-between mb-3 mx-3">
                                        <div className="flex items-center">
                                            <CheckCircleIcon aria-hidden="true" className="size-5 text-green-500" />
                                            <p className="ml-2 text-sm font-medium text-gray-500">
                                                Delivered on <time ></time>
                                            </p>
                                        </div>
                                        <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                                            <a
                                                href="#"
                                                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                                            >
                                                <span>View Invoice</span>
                                                <span className="sr-only">for order </span>
                                            </a>
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
    )


}

export default Vacantes;