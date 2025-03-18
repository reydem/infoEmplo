// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Usuarios/Usuarios.tsx
import React, { useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';

interface Usuario {
  _id: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  correo: string;
  telefono: string;
  esReclutador: boolean;
}

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mensaje, setMensaje] = useState<string>('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMensaje('⚠️ No estás autenticado. Inicia sesión.');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        };

        const response = await clienteAxios.get('/usuarios', config);
        // Filtramos para quedarnos solo con los usuarios que no sean reclutadores
        const usuariosNoReclutadores = response.data.filter((usuario: Usuario) => !usuario.esReclutador);
        setUsuarios(usuariosNoReclutadores);
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
  }, []);

  return (
    <div>
      <h2>Usuarios no Reclutadores</h2>
      {mensaje && <p>{mensaje}</p>}
      {usuarios.length === 0 ? (
        <p>No hay usuarios disponibles.</p>
      ) : (
        usuarios.map((usuario) => (
          <div key={usuario._id}>
            <h3>
              {usuario.nombre} {usuario.primerApellido} {usuario.segundoApellido}
            </h3>
            <p>Email: {usuario.correo}</p>
            <p>Teléfono: {usuario.telefono}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Usuarios;
