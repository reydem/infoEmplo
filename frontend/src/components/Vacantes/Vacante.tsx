// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Vacantes/Vacantes.tsx
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { Dispatch, SetStateAction } from 'react';

// Interfaz actualizada para reflejar los nombres del backend
interface VacanteInterface {
    _id: string;
    titulo: string; // Antes "nombre"
    salario_ofrecido: number; // Antes "precio"
    imagen_empresa?: string; // Antes "imagen"
}

interface VacanteProps {
    vacante: VacanteInterface;
    setActualizarVacantes: Dispatch<SetStateAction<boolean>>;
}

function Vacante({ vacante, setActualizarVacantes }: VacanteProps) {
    // Elimina una vacante
    const eliminarVacante = (id: string) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Una vacante eliminada no se puede recuperar",
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
                            setActualizarVacantes((prev: boolean) => !prev); // Alterna el valor para actualizar la lista
                        }
                    })
                    .catch(error => {
                        Swal.fire(
                            'Error',
                            'Hubo un problema al eliminar la vacante.',
                            'error'
                        );
                        console.error(error);
                    });
            }
        });
    };

    const { _id, titulo, salario_ofrecido, imagen_empresa } = vacante;

    return (
        <li className="vacante">
            <div className="info-vacante">
                <p className="titulo">{titulo}</p>
                <p className="salario">$ {salario_ofrecido}</p>
                {imagen_empresa ? (
                    <img src={`http://localhost:5000/uploads/${imagen_empresa}`} alt="Imagen Empresa" />
                ) : null}
            </div>
            <div className="acciones">
                <Link to={`/vacantes/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Vacante
                </Link>
                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarVacante(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Vacante
                </button>
            </div>
        </li>
    );
}

export default Vacante;




