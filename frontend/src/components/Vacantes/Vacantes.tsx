// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Vacantes/Vacantes.tsx
import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';

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
                <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">VueJS</p>
                        <p className="precio">$25.00 </p>
                        <img src="img/1.jpg" />
                    </div>
                    <div className="acciones">
                        <a href="#" className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </a>
                        <button type="button" className="btn btn-rojo btn-eliminar">
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
            </ul>
        </Fragment>
    );
}

export default Vacantes;

