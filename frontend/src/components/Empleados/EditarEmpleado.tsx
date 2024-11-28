// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/page/EditarEmpleado.tsx
import { Fragment, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import clienteAxios from '../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

// Interface para el estado del cliente
interface Cliente {
    _id?: string; // Solo presente cuando el cliente ya existe
    nombre: string;
    apellido: string;
    empresa: string;
    email: string;
    telefono: string;
}

function EditarEmpleado() {

    const navigate = useNavigate();
    // obtener el ID
    const { id } = useParams<Record<string, string | undefined>>(); // Tipo genérico compatible
    console.log(id)

    // cliente = state, guardarcliente = funcion para guardar el state
    const [cliente, datosCliente] = useState<Cliente>({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // Query a la API
    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/empleados/${id}`);
        console.log(clienteConsulta);

        // colocar en el state
        datosCliente(clienteConsulta.data);
    }

    // useEffect, cuando el componente carga
    useEffect(() => {
        consultarAPI();
    }, []);

    // leer los datos del formulario
    const actualizarState = (e: ChangeEvent<HTMLInputElement>) => {

        // Almacenar lo que el usuario escribe en el state
        datosCliente({
            // obtener una copia del state actual
            ...cliente,
            [e.target.name]: e.target.value
        });
        console.log([e.target.name] + ':' + e.target.value);
    }

     // Envia una petición por axios para actualizar el cliente
     const actualizarCliente = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // enviar petición por axios
        clienteAxios.put(`/empleados/${cliente._id}`, cliente) 
            .then(res => {
                // validar si hay errores de mongo 
                if(res.data.code === 11000) {
                    Swal.fire({
                        icon: 'error', // Cambié 'type' por 'icon' ya que 'type' está deprecado
                        title: 'Hubo un error',
                        text: 'Ese cliente ya está registrado'
                    });
                } else {
                    Swal.fire(
                        'Correcto',
                        'Se actualizó correctamente',
                        'success'
                    );
                }
    
                // redireccionar usando navigate
                navigate('/');
            });
    }
    
    // Validar el formulario
    const validarCliente = () => {
        // Destructuring
        const { nombre, apellido, email, empresa, telefono } = cliente;

        // revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

        // return true o false
        return valido;
    }
    return (
        <Fragment>
            <form onSubmit={actualizarCliente} >
                <h2>Editar Empleado</h2>
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        onChange={actualizarState}
                        value={cliente.nombre}
                    />
                </div>
                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"
                        onChange={actualizarState}
                        value={cliente.apellido}
                    />
                </div>
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text"
                        placeholder="Empresa Cliente"
                        name="empresa"
                        onChange={actualizarState}
                        value={cliente.empresa}
                    />
                </div>
                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                        placeholder="Email Cliente"
                        name="email"
                        onChange={actualizarState}
                        value={cliente.email}
                    />
                </div>
                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel"
                        placeholder="Teléfono Cliente"
                        name="telefono"
                        onChange={actualizarState}
                        value={cliente.telefono}
                    />
                </div>
                <div className="enviar">
                    <input type="submit"
                        className="btn btn-azul"
                        value="Guardar cambios"
                        disabled={validarCliente()}
                    />
                </div>
            </form>
        </Fragment>
    );
};

export default EditarEmpleado;

