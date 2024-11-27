// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/custom-ui/EmploymentOffer.tsx
import React from 'react';
import { Button } from '../ui';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

// Interfaz para los empleados
interface Empleado {
  buttonText: string; // Campo desde la base de datos
  description: string; // Campo desde la base de datos
}

// Props para el componente EmploymentOffer
interface EmploymentOfferProps {
  empleados: Empleado[]; // Lista de empleados pasada como prop
}

const EmploymentOffer: React.FC<EmploymentOfferProps> = ({ empleados }) => {
  return (
    <div className="border-gray-400 border-t-4 my-0">
      {empleados.map((empleado, index) => (
        <div
          key={index}
          className="mx-auto flex flex-col mt-3 max-w-7xl items-start justify-between px-4 sm:px-6 lg:px-8"
        >
          {/* Botón con texto del empleado */}
          <Button
            color="white"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300"
            style={{ '--btn-icon': 'rgb(0, 0, 0)' } as React.CSSProperties}
          >
            <BriefcaseIcon
              aria-hidden="true"
              className="w-6 h-6 text-black"
              strokeWidth={2.5}
            />
            {empleado.buttonText}
          </Button>

          {/* Descripción del empleado */}
          <p className="text-xs leading-tight mt-2 font-bold">{empleado.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EmploymentOffer;

