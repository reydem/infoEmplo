// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Empleados/Empleados.tsx
import { useEffect, useState, useContext, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Empleado from './Empleado';
import Spinner from '../layout/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';
import axios from 'axios';

interface Cliente {
    _id: string;
    nombre: string;
    apellido: string;
    empresa: string;
    email: string;
    telefono: string;
}

function Empleados() {
    const [clientes, guardarClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);
    const [actualizarClientes, setActualizarClientes] = useState(false);

    // Obtener el contexto
    const crmContext = useContext(CRMContext);

    // Verificar que el contexto no sea undefined
    if (!crmContext) {
        throw new Error('CRMContext debe ser utilizado dentro de un CRMProvider');
    }

    // Desestructurar el contexto
    const [auth] = crmContext; // No necesitas `guardarAuth` aquí
    const navigate = useNavigate();

    // Manejar la autenticación y redirección
    useEffect(() => {
        if (!auth.auth) {
            navigate('/iniciar-sesion');
        }
    }, [auth, navigate]);

    // Consultar la API de empleados
    useEffect(() => {
        if (auth.token) {
            const consultarAPI = async () => {
                try {
                    const clientesConsulta = await clienteAxios.get('/empleados', {
                        headers: { Authorization: `Bearer ${auth.token}` },
                    });
                    const clientesConDatosCompletos = clientesConsulta.data.map((cliente: any) => ({
                        ...cliente,
                        apellido: cliente.apellido || '',
                        empresa: cliente.empresa || '',
                        email: cliente.email || '',
                        telefono: cliente.telefono || '',
                    }));
                    guardarClientes(clientesConDatosCompletos);
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response?.status === 500) {
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

    // Mostrar spinner mientras se cargan los datos
    if (loading) return <Spinner />;
    if (!clientes.length) return <p>No hay empleados disponibles.</p>;

    return (
        <Fragment>
            <h2>Clientes</h2>
            <Link to={"/empleados/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>
            <ul className="listado-clientes">
                {clientes.map((cliente) => (
                    <Empleado
                        key={cliente._id}
                        cliente={cliente}
                        setActualizarClientes={setActualizarClientes}
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default Empleados;
