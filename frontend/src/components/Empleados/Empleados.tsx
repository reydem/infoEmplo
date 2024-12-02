// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Empleados/Empleados.tsx
import { useEffect, useState, useContext, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Empleado from './Empleado';
import Spinner from '../layout/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';
import axios from 'axios';

interface EmpleadoData {
    _id: string;
    buttonText: string;
    description: string;
    createdAt: string; // Agregamos esta propiedad
}


function Empleados() {
    const [empleados, guardarEmpleados] = useState<EmpleadoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [actualizarClientes, setActualizarClientes] = useState(false);

    // Obtener el contexto
    const crmContext = useContext(CRMContext);
    if (!crmContext) {
        throw new Error('CRMContext debe ser utilizado dentro de un CRMProvider');
    }

    const [auth] = crmContext;
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.auth) {
            navigate('/iniciar-sesion');
        }
    }, [auth, navigate]);

    // Consultar la API cuando `auth.token` o `actualizarClientes` cambie
    useEffect(() => {
        if (auth.token) {
            const consultarAPI = async () => {
                try {
                    const empleadosConsulta = await clienteAxios.get('/empleados', {
                        headers: { Authorization: `Bearer ${auth.token}` },
                    });
    
                    // Ordenar los empleados en orden descendente por `createdAt`
                    const empleadosOrdenados = empleadosConsulta.data.sort(
                        (a: EmpleadoData, b: EmpleadoData) =>
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
    
                    guardarEmpleados(empleadosOrdenados);
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response?.status === 401) {
                        navigate('/iniciar-sesion');
                    }
                } finally {
                    setLoading(false);
                }
            };
            consultarAPI();
        } else {
            navigate('/iniciar-sesion');
        }
    }, [auth.token, navigate, actualizarClientes]);
    

    if (loading) return <Spinner />;
    if (!empleados.length) return <p>No hay empleados disponibles.</p>;

    return (
        <Fragment>
            <ul className="listado-empleados border-gray-400 border-t-4 my-0">
                {empleados.map((empleado) => (
                    <Empleado
                        key={empleado._id}
                        empleado={empleado}
                        setActualizarClientes={setActualizarClientes}
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default Empleados;




