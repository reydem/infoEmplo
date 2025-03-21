import React from 'react';
import Swal from 'sweetalert2';
import { Pencil, Trash } from 'lucide-react';

interface Vacante {
    _id: string;
    titulo: string;
    descripcion: string;
    imagen_empresa?: string;
}

interface VacanteListProps {
    vacantes?: Vacante[];
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const VacanteList: React.FC<VacanteListProps> = ({ vacantes = [], onEdit, onDelete }) => {
    // Función para confirmar la eliminación usando SweetAlert2
    const handleDelete = (id: string) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarla',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Llama al callback onDelete si existe
                onDelete && onDelete(id);
                Swal.fire('Eliminado!', 'La vacante ha sido eliminada.', 'success');
            }
        });
    };

    return (
        <div className="space-y-6">
            {vacantes.length > 0 ? (
                vacantes.map((vacante) => (
                    <div
                        key={vacante._id}
                        className="flex items-center justify-between border p-4 rounded-lg shadow-md bg-white"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                alt={vacante.titulo}
                                src={
                                    vacante.imagen_empresa
                                        ? `http://localhost:5000/uploads/${vacante.imagen_empresa}`
                                        : "https://via.placeholder.com/150"
                                }
                                className="size-14 bg-gray-50 mt-3"
                            />
                            <div className="text-base">
                                <div className="font-semibold text-gray-900">{vacante.titulo}</div>
                                <div className="mt-1 text-gray-500">
                                    {vacante.descripcion.length > 100
                                        ? vacante.descripcion.substring(0, 50) + "..."
                                        : vacante.descripcion}
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <button
                                onClick={() => onEdit && onEdit(vacante._id)}
                                className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                            >
                                <Pencil className="w-4 h-4 mr-1" />
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(vacante._id)}
                                className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                            >
                                <Trash className="w-4 h-4 mr-1" />
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No hay vacantes disponibles.</p>
            )}
        </div>
    );
};

export default VacanteList;
