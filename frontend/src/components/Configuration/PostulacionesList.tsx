// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/PostulacionesList.tsx
import React from 'react';
import { Trash } from 'lucide-react';
import Swal from 'sweetalert2';

interface Vacante {
  _id: string;
  titulo: string;
  descripcion: string;
  imagen_empresa?: string;
}

interface PostulacionesListProps {
  postulaciones: Vacante[];
  onDelete?: (id: string) => void;
}

const PostulacionesList: React.FC<PostulacionesListProps> = ({
  postulaciones,
  onDelete
}) => {
  const handleDelete = (id: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si eliminas la postulación, no podrás volverte a postularse a esta vacante.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete && onDelete(id);
        Swal.fire('Eliminado!', 'La postulación ha sido eliminada.', 'success');
      }
    });
  };

  return (
    <div className="space-y-6">
      {postulaciones.length > 0 ? (
        postulaciones.map((vac) => (
          <div
            key={vac._id}
            className="flex items-center justify-between border p-4 rounded-lg shadow-md bg-white"
          >
            <div className="flex items-center space-x-4">
              <img
                alt={vac.titulo}
                src={
                  vac.imagen_empresa
                    ? `http://localhost:5000/uploads/${vac.imagen_empresa}`
                    : "https://via.placeholder.com/150"
                }
                className="w-14 h-14 bg-gray-50"
              />
              <div className="text-base">
                <div className="font-semibold text-gray-900">{vac.titulo}</div>
                <div className="mt-1 text-gray-500">
                  {vac.descripcion.length > 100
                    ? vac.descripcion.substring(0, 50) + "..."
                    : vac.descripcion}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDelete(vac._id)}
                className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
              >
                <Trash className="w-4 h-4 mr-1" />
                Eliminar
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No te has postulado a ninguna vacante.</p>
      )}
    </div>
  );
};

export default PostulacionesList;
