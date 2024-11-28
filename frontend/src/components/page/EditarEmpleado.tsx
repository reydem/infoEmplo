// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/page/EditarEmpleado.tsx
import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Cliente {
    nombre: string;
    apellido: string;
    empresa: string;
    email: string;
    telefono: string;
}

function EditarEmpleado() {
    // Obtener el ID del cliente desde los parámetros de la URL
    const { id } = useParams<{ id: string }>();
    console.log('ID del cliente:', id);

    // Estado local para almacenar los datos del cliente
    const [cliente, guardarCliente] = useState<Cliente>({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // Estado para saber si el formulario está cargando
    const [cargando, setCargando] = useState<boolean>(true);

    // Simula la carga del cliente desde la API al montar el componente
    useEffect(() => {
        // Aquí puedes hacer una solicitud HTTP para obtener los datos del cliente
        const cargarCliente = async () => {
            setCargando(true);
            try {
                // Simulación de una API
                const respuesta = await fetch(`/api/clientes/${id}`);
                const datos: Cliente = await respuesta.json();
                guardarCliente(datos);
            } catch (error) {
                console.error('Error cargando el cliente:', error);
            } finally {
                setCargando(false);
            }
        };
        cargarCliente();
    }, [id]);

    // Manejar los cambios en el formulario
    const actualizarState = (e: React.ChangeEvent<HTMLInputElement>) => {
        guardarCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });
    };

    // Validar el formulario
    const validarCliente = () => {
        const { nombre, apellido, email, empresa, telefono } = cliente;
        return !nombre || !apellido || !email || !empresa || !telefono;
    };

    // Manejar el envío del formulario
    const manejarSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Aquí puedes hacer la solicitud HTTP para actualizar el cliente
            const respuesta = await fetch(`/api/clientes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });

            if (!respuesta.ok) {
                throw new Error('Error actualizando el cliente');
            }

            alert('Cliente actualizado exitosamente');
        } catch (error) {
            console.error('Error actualizando el cliente:', error);
            alert('Hubo un error al actualizar el cliente');
        }
    };

    if (cargando) {
        return <p>Cargando cliente...</p>;
    }

    return (
        <Fragment>
            <form onSubmit={manejarSubmit}>
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        value={cliente.nombre}
                        onChange={actualizarState}
                    />
                </div>
                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"
                        value={cliente.apellido}
                        onChange={actualizarState}
                    />
                </div>
                <div className="campo">
                    <label>Empresa:</label>
                    <input
                        type="text"
                        placeholder="Empresa Cliente"
                        name="empresa"
                        value={cliente.empresa}
                        onChange={actualizarState}
                    />
                </div>
                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email Cliente"
                        name="email"
                        value={cliente.email}
                        onChange={actualizarState}
                    />
                </div>
                <div className="campo">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        placeholder="Teléfono Cliente"
                        name="telefono"
                        value={cliente.telefono}
                        onChange={actualizarState}
                    />
                </div>
                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Actualizar Cliente"
                        disabled={validarCliente()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarEmpleado;
