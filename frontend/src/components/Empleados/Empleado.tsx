// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Empleados/Empleado.tsx
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

interface Cliente {
    _id: string;
    nombre: string;
    apellido: string;
    empresa: string;
    email: string;
    telefono: string;
  }
  
  interface EmpleadoProps {
    cliente: Cliente;
  }

function Empleado({ cliente }: EmpleadoProps) {
    console.log(cliente.nombre);
    // extraer los valores
    const { _id, nombre, apellido, empresa, email, telefono } = cliente;

    // Eliminar cliente
    const eliminarCliente = (idCliente: string) => {
		Swal.fire({
			title: '¿Estas seguro?',
			text: "Un cliente eliminado no se puede recuperar",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.value) {
                // Llamado a axios
                clienteAxios.delete(`/empleados/${idCliente}`)
                    .then(res => {
                        Swal.fire(  
                            'Eliminado', 
                            res.data.mensaje, 
                            'success'
                        );
                        
                    });
                    
			}
		});
	};

    return (
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>Tel: {telefono}</p>
            </div>
            <div className="acciones">
                <Link to={`/empleados/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt" />
                    Editar Cliente
                </Link>
                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarCliente(_id)}
                >
                    <i className="fas fa-times" />
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )
}

export default Empleado