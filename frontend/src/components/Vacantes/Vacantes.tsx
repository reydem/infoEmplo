// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Vacantes/Vacantes.tsx
import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Vacante from './Vacante';
import Spinner from '../layout/Spinner';

// Interfaz para definir la estructura de las vacantes
interface Vacante {
    _id: string;
    titulo: string; // Cambiado para que coincida con el backend
    salario_ofrecido: number; // Cambiado para que coincida con el backend
    imagen_empresa?: string; // Cambiado para que coincida con el backend
}

function Vacantes() {
    const [vacantes, setVacantes] = useState<Vacante[]>([]);
    const [actualizarVacantes, setActualizarVacantes] = useState(false); // Estado para actualizar lista

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const respuesta = await clienteAxios.get<Vacante[]>('/vacantes');
                setVacantes(respuesta.data); // Usamos los nombres correctos del backend
            } catch (error) {
                console.error('Error al consultar las vacantes:', error);
            }
        };
        consultarAPI();
    }, [actualizarVacantes]);

    // Spinner de carga
    if (!vacantes.length) return <Spinner />;

    return (
        <Fragment>
            <h2>Vacantes</h2>
            <Link to={'/vacantes/nuevo'} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nueva Vacante
            </Link>
            <ul className="listado-vacantes">
                {vacantes.map(vacante => (
                    <Vacante
                        key={vacante._id}
                        vacante={vacante} // Pasamos la vacante como prop
                        setActualizarVacantes={setActualizarVacantes} // Pasamos el estado como prop
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default Vacantes;



