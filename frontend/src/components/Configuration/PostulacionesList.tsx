// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/PostulacionesList.tsx
import React, { useState } from 'react';
import { Trash } from 'lucide-react';
import Swal from 'sweetalert2';
import Pagination from '../Pagination/Pagination';

interface Vacante {
  _id: string;
  titulo: string;
  descripcion: string;
  imagen_empresa?: string;
}

interface Postulacion {
  vacante: Vacante;
  estado: 'aplicado' | 'cancelado';
}


interface PostulacionesListProps {
  postulaciones: Postulacion[];
  onDelete?: (id: string) => void;
}

const PostulacionesList: React.FC<PostulacionesListProps> = ({ postulaciones = [], onDelete }) => {
  // Estado para la paginación
  const [page, setPage] = useState<number>(1);
  const limit = 3; // Número de postulaciones por página
  const totalDocs = postulaciones.length;
  const totalPages = Math.ceil(totalDocs / limit);

  // Calcula las postulaciones que se mostrarán en la página actual
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedPostulaciones = postulaciones.slice(startIndex, endIndex);

  // Función para confirmar la eliminación usando SweetAlert2
  const handleDelete = (id: string) => {
    console.log("handleDelete invocado para id:", id);
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
      console.log("Resultado de Swal:", result);
      if (result.isConfirmed) {
        console.log("El usuario confirmó la eliminación para id:", id);
        if (onDelete) {
          console.log("Ejecutando callback onDelete con id:", id);
          onDelete(id);
        } else {
          console.log("No se proporcionó callback onDelete");
        }
        Swal.fire('Eliminado!', 'La postulación ha sido eliminada.', 'success');
      }
    });
  };

  return (
    <div>
      
      <div className="space-y-6">
        {paginatedPostulaciones.length > 0 ? (
          paginatedPostulaciones.map((post) => {
            // Extraemos el objeto vacante
            const vac = post.vacante;
            console.log("Renderizando postulación para vacante:", vac);
            return (
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
                      {vac.descripcion && vac.descripcion.length > 100
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
            );
          })
        ) : (
          <p className="text-gray-500">No te has postulado a ninguna vacante.</p>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalDocs={totalDocs}
          limit={limit}
        />
      )}
    </div>
  );
};

export default PostulacionesList;

