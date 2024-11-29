// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Vacantes/Vacantes.tsx
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { Dispatch, SetStateAction } from 'react';

interface Producto {
    _id: string;
    nombre: string;
    precio: number;
    imagen?: string;
}

interface VacanteProps {
    producto: Producto;
    setActualizarProductos: Dispatch<SetStateAction<boolean>>;
}

function Vacante({ producto, setActualizarProductos }: VacanteProps) {
    // Elimina un producto
    const eliminarProducto = (id: string) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un producto eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Eliminar',
            cancelButtonText: 'No, Cancelar'
        }).then((result) => {
            if (result.value) {
                clienteAxios.delete(`/vacantes/${id}`)
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire(
                                'Eliminado',
                                res.data.mensaje,
                                'success'
                            );
                            setActualizarProductos((prev: boolean) => !prev); // Alterna el valor para actualizar la lista
                        }
                    });
            }
        });
    };

    const { _id, nombre, precio, imagen } = producto;

    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">$ {precio}</p>
                {imagen ? (
                    <img src={`http://localhost:5000/${imagen}`} alt="imagen" />
                ) : null}
            </div>
            <div className="acciones">
                <Link to={`/vacantes/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>
                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarProducto(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    );
}

export default Vacante;


