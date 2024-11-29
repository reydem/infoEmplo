// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Vacantes/Vacantes.tsx
import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Vacante from './Vacante';

interface Producto {
    _id: string;
    nombre: string;
    precio: number;
    imagen?: string;
}

function Vacantes() {
    const [productos, guardarProductos] = useState<Producto[]>([]);

    useEffect(() => {
        const consultarAPI = async () => {
            const productosConsulta = await clienteAxios.get<Producto[]>('/vacantes');
            guardarProductos(productosConsulta.data);
        };
        consultarAPI();
    }, []);

    return (
        <Fragment>
            <h2>Productos</h2>
            <Link to={'/vacantes/nuevo'} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>
            <ul className="listado-productos">
                {productos.map(producto => (
                    <Vacante
                        key={producto._id}
                        producto={producto}
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default Vacantes;

