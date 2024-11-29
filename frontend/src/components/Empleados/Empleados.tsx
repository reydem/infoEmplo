// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Empleados/Empleados.tsx
import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Empleado from './Empleado';

interface Cliente {
  _id: string;
  nombre: string;
  apellido: string;
  empresa: string;
  email: string;
  telefono: string;
}

function Empleados() {
  const [clientes, guardarClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const clientesConsulta = await clienteAxios.get('/empleados');
      const clientesConDatosCompletos = clientesConsulta.data.map((cliente: any) => ({
        ...cliente,
        apellido: cliente.apellido || '',
        empresa: cliente.empresa || '',
        email: cliente.email || '',
        telefono: cliente.telefono || '',
      }));
      guardarClientes(clientesConDatosCompletos);
    };
    consultarAPI();
  }, []);

  return (
    <Fragment>
      <h2>Clientes</h2>
      <Link to={"/empleados/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      <ul className="listado-clientes">
        {clientes.map((cliente) => (
          <Empleado
            key={cliente._id}
            cliente={cliente}
          />
        ))}
      </ul>
    </Fragment>
  );
}

export default Empleados;

