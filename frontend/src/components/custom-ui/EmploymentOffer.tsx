// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/custom-ui/EmploymentOffer.tsx
import React, { useEffect, useState } from 'react';
import clienteAxios from '../../config/axios'; // Asegúrate de importar correctamente
import { Button } from '../ui';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

interface Empleado {
  buttonText: string;
  description: string;
}

const EmploymentOffer: React.FC = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  useEffect(() => {
    const obtenerEmpleados = async () => {
      try {
        const respuesta = await clienteAxios.get('/empleados'); // Endpoint correcto
        setEmpleados(respuesta.data);
      } catch (error) {
        console.error('Error al obtener los empleados:', error);
      }
    };

    obtenerEmpleados();
  }, []);

  return (
    <div className="border-gray-400 border-t-4 my-0">
      {empleados.map((empleado, index) => (
        <div
          key={index}
          className="mx-auto flex flex-col mt-3 max-w-7xl items-start justify-between px-4 sm:px-6 lg:px-8"
        >
          <Button
            color="white"
            className="-m-2.5 p-2.5 text-black hover:text-gray-300"
            style={{ '--btn-icon': 'rgb(0, 0, 0)' } as React.CSSProperties}
          >
            <BriefcaseIcon
              aria-hidden="true"
              className="w-6 h-6 text-black"
              strokeWidth={2.5}
            />
            {empleado.buttonText}
          </Button>
          <p className="text-xs leading-tight mt-2 font-bold">{empleado.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EmploymentOffer;


