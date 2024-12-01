// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Vacantes/Vacantes.tsx
import { useEffect, useState, Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Vacante from './Vacante';
import Spinner from '../layout/Spinner';
import { CRMContext } from '../../context/CRMContext';

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
                    const vacantesConsulta = await clienteAxios.get('/vacantes', {
                        headers: { Authorization: `Bearer ${auth.token}` },
                    });
                    setVacantes(vacantesConsulta.data);
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
    }, [actualizarVacantes, auth.token, navigate]);

    if (!auth.auth) {
        navigate('/iniciar-sesion');
    }

    if (!vacantes.length) return <Spinner />;

    return (
        <Fragment>
            <h2>Vacantes</h2>
            <Link to={'/vacantes/nuevo'} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nueva Vacante
            </Link>
            <ul className="listado-vacantes">
                {vacantes.map((vacante) => (
                    <Vacante
                        key={vacante._id}
                        vacante={vacante}
                        setActualizarVacantes={setActualizarVacantes}
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default Vacantes;








