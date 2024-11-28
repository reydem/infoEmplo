// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/page/EditarEmpleado.tsx
import { Fragment, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import clienteAxios from '../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

// Definir la interfaz para el cliente
interface Cliente {
    _id?: string; // Es opcional porque no estará disponible al crear un nuevo cliente
    nombre: string;
    apellido: string;
    empresa: string;
    email: string;
    telefono: string;
}

const EditarEmpleado = () => {
    const navigate = useNavigate();
    // obtener el ID
    const { id } = useParams<Record<string, string | undefined>>(); // Tipo genérico compatible
    console.log(id);

    // cliente = state, datosCliente = función para actualizar el state
    const [cliente, datosCliente] = useState<Cliente>({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: '',
    });

    // Query a la API
    const consultarAPI = async () => {
        try {
            if (id) { // Verifica que el ID exista
                const clienteConsulta = await clienteAxios.get<Cliente>(`/empleados/${id}`);
                datosCliente(clienteConsulta.data); // Actualizamos el estado con los datos del cliente
            }
        } catch (error) {
            console.error('Error consultando el cliente:', error);
        }
    };

    // useEffect: Ejecutar cuando el componente se carga
    useEffect(() => {
        consultarAPI();
    }, [id]);

    // Actualizar el state con los datos del formulario
    const actualizarState = (e: ChangeEvent<HTMLInputElement>) => {
        datosCliente({
            ...cliente,
            [e.target.name]: e.target.value,
        });
        console.log(`${e.target.name}: ${e.target.value}`);
    };

    // Enviar los datos actualizados del cliente
    const actualizarCliente = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await clienteAxios.put(`/empleados/${cliente._id}`, cliente);
            Swal.fire(
                'Correcto',
                'Se actualizó correctamente',
                'success'
            );
            navigate('/');
        } catch (error: any) {
            if (error.response?.data?.code === 11000) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Ese cliente ya está registrado',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Error inesperado, intenta de nuevo',
                });
            }
        }
    };

    // Validar el formulario
    const validarCliente = () => {
        const { nombre, apellido, empresa, email, telefono } = cliente;
        return !nombre || !apellido || !empresa || !email || !telefono;
    };

    return (
        <Fragment>
            <h2>Editar Cliente</h2>
            <form onSubmit={actualizarCliente}>
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        onChange={actualizarState}
                        value={cliente.nombre}
                    />
                </div>
                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"
                        onChange={actualizarState}
                        value={cliente.apellido}
                    />
                </div>
                <div className="campo">
                    <label>Empresa:</label>
                    <input
                        type="text"
                        placeholder="Empresa Cliente"
                        name="empresa"
                        onChange={actualizarState}
                        value={cliente.empresa}
                    />
                </div>
                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email Cliente"
                        name="email"
                        onChange={actualizarState}
                        value={cliente.email}
                    />
                </div>
                <div className="campo">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        placeholder="Teléfono Cliente"
                        name="telefono"
                        onChange={actualizarState}
                        value={cliente.telefono}
                    />
                </div>
                <div className="enviar">
                    <input
                        type="submit"
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

