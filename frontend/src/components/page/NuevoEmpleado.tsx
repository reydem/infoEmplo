// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/page/NuevoEmpleado.tsx
import { Fragment, useState, ChangeEvent, useEffect } from 'react'
import clienteAxios from '../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const NuevoEmpleado = () => {
    const { id } = useParams(); // Obtén el 'id' desde la URL
    const navigate = useNavigate();
    // cliente = state, guardarcliente = funcion para guardar el state
    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // Query a la API
    const consultarAPI = async () => {
        if (id) { // Verifica que 'id' exista antes de usarlo
            try {
                const clienteConsulta = await clienteAxios.get(`/empleados/${id}`);
                datosCliente(clienteConsulta.data);
            } catch (error) {
                console.error('Error consultando el cliente:', error);
            }
        }
    };

    useEffect(() => {
        consultarAPI();
    }, [id]);

    // Añade en la REST API un cliente nuevo
    const agregarCliente = (e: React.FormEvent) => {
        e.preventDefault();
        // enviar petición
        clienteAxios.post('/empleados', cliente)
            .then(res => {
                Swal.fire(
                    'Se agregó el Cliente',
                    res.data.mensaje,
                    'success'
                );
            })
            .catch(error => {
                if (error.response && error.response.data.code === 11000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'Ese cliente ya está registrado'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'Error inesperado, intenta de nuevo'
                    });
                }
                navigate('/');
            });
    }

    // leer los datos del formulario
    const actualizarState = (e: ChangeEvent<HTMLInputElement>) => {
        // Almacenar lo que el usuario escribe en el state
        datosCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });
        console.log([e.target.name] + ':' + e.target.value);
    };

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
            <form onSubmit={agregarCliente} >
                <h2>Nuevo Empleado</h2>
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

export default NuevoEmpleado;
