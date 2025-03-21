// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Usuarios/Usuarios.tsx
import React, { useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import Pagination from '../Pagination/Pagination';



interface Usuario {
  _id: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  correo: string;
  fotoPerfil: string;
  telefono: string;
  esReclutador: boolean;
  createdAt: string; // Agregamos la propiedad para la fecha de creación
}

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mensaje, setMensaje] = useState<string>('');

  const [page, setPage] = useState<number>(1);
  const limit: number = 3;
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalDocs, setTotalDocs] = useState<number>(0);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMensaje('⚠️ No estás autenticado. Inicia sesión.');
          return;
        }
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        };

        const response = await clienteAxios.get(
          `/usuarios/pagination?page=${page}&limit=${limit}`,
          config
        );

        // Filtramos solo usuarios que NO sean reclutadores
        const usuariosNoReclutadores = response.data.data.filter(
          (u: Usuario) => !u.esReclutador
        );
        setUsuarios(usuariosNoReclutadores);

        setTotalPages(response.data.totalPages);
        setTotalDocs(response.data.totalDocs);
      } catch (error: any) {
        console.error('Error al obtener usuarios:', error);
        if (error.response) {
          setMensaje(error.response.data?.mensaje || '❌ Error en la solicitud');
        } else if (error.request) {
          setMensaje('❌ No se pudo conectar con el servidor');
        } else {
          setMensaje('❌ Error desconocido');
        }
      }
    };

    fetchUsuarios();
  }, [page]);
  return (
    <>
      <section aria-labelledby="recent-heading" className="">
        <h2 id="recent-heading" className="sr-only">Usuarios no Reclutadores</h2>
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
            {mensaje && <p>{mensaje}</p>}
            {usuarios.length === 0 ? (
              <p>No hay usuarios disponibles.</p>
            ) : (
              usuarios.map((usuario) => (
                <div key={usuario._id} className="border-[1px] border-black rounded-[10px] shadow-custom">
                  {/* Encabezado con el nombre completo del usuario */}
                  <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                    <dl className="grid flex-1">
                      <div>
                        <dt className="font-medium text-gray-900 text-2xl">
                          {usuario.nombre}
                        </dt>
                      </div>
                    </dl>
                  </div>
                  {/* Detalle del usuario */}
                  <ul role="list" className="divide-y divide-gray-200">
                    <li className="p-4 sm:p-6">
                      <div className="flex items-center sm:items-start">
                        <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:size-40">
                          {/* Si en el futuro se añade imagen de perfil, se puede adaptar este tag */}
                          <img
                            alt={`${usuario.nombre}`}
                            src={
                              usuario.fotoPerfil
                                  ? `http://localhost:5000/uploads/${usuario.fotoPerfil}`
                                  : "https://via.placeholder.com/150"
                          }
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="ml-6 flex-1 text-sm">
                          <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                            <h5>{usuario.correo}</h5>
                            <p className="mt-2 sm:mt-0">{usuario.telefono}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-6 sm:flex sm:justify-between mb-3 mx-3">
                    <div className="flex items-center">
                      <CheckCircleIcon aria-hidden="true" className="size-5 text-green-500" />
                      <p className="ml-2 text-sm font-medium text-gray-500">
                        Delivered on{' '}
                        <time dateTime={usuario.createdAt}>
                          {new Date(usuario.createdAt).toLocaleDateString('es-ES')}
                        </time>
                      </p>
                    </div>
                    <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                      >
                        <span>View Invoice</span>
                        <span className="sr-only">for order </span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        totalDocs={totalDocs}
        limit={limit}
      />

    </>
  );
};

export default Usuarios;
