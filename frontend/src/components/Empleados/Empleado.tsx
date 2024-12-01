// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Empleados/Empleado.tsx
import { BriefcaseIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { Dispatch, SetStateAction } from 'react';

interface EmpleadoData {
    _id: string;
    buttonText: string;
    description: string;
}

interface EmpleadoProps {
    empleado: EmpleadoData;
    setActualizarClientes: Dispatch<SetStateAction<boolean>>;
}

function Empleado({ empleado, setActualizarClientes }: EmpleadoProps) {
    const { _id, buttonText, description } = empleado;

    const eliminarEmpleado = (idEmpleado: string) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Un empleado eliminado no se puede recuperar.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                clienteAxios.delete(`/empleados/${idEmpleado}`).then((res) => {
                    Swal.fire('Eliminado', res.data.mensaje, 'success');
                    setActualizarClientes((prev) => !prev); // Alterna el valor para actualizar la lista
                });
            }
        });
    };

    return (
        <li className="empleado mx-auto flex flex-col mt-3 max-w-7xl items-start justify-between px-4 sm:px-6 lg:px-8">
            <button
                className="btn btn-light text-black  hover:text-gray-300 flex items-center gap-2"
                onClick={() => eliminarEmpleado(_id)}
            >
                <BriefcaseIcon
                    aria-hidden="true"
                    className="w-6 h-6 text-black"
                    strokeWidth={2.5}
                />
                {buttonText}
            </button>
            <p className="text-xs leading-tight mt-2 font-bold">{description}</p>
        </li>
    );
}

export default Empleado;


