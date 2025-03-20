// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/VacanteOPostulaciones.tsx

import React, { useContext, useState, useEffect } from 'react';
import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../config/axios';  // Asumiendo que aquí configuras tu baseURL y headers
import VacanteList from './VacanteList';
import PostulacionesList from './PostulacionesList';

interface Vacante {
  _id: string;
  titulo: string;
  descripcion: string;
  imagen_empresa?: string;
}

interface Usuario {
  _id: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  esReclutador: boolean;
  postulaciones?: Vacante[];  // Array de vacantes a las que se postuló
  // ... cualquier otro campo que uses
}

const VacanteOPostulaciones: React.FC = () => {
  const crmContext = useContext(CRMContext);
  if (!crmContext) return null;

  const [auth] = crmContext;

  // Estado para manejar el usuario y la lista de vacantes
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Al montar el componente, hacemos las llamadas a la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!auth.token) {
          console.warn('No hay token, no se puede cargar data');
          setLoading(false);
          return;
        }

        // Configurar cabeceras con el token
        const config = {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        };

        // 1. Obtener el usuario autenticado (populado con postulaciones en el backend)
        const { data: usuarioData } = await clienteAxios.get('/usuario/me', config);
        setUsuario(usuarioData);

        // 2. Si es reclutador, obtener la lista de vacantes
        if (usuarioData.esReclutador) {
          const { data: vacantesData } = await clienteAxios.get('/vacantes', config);
          setVacantes(vacantesData);
        }

      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth.token]);

  // Funciones para editar o eliminar vacantes
  const handleEditVacante = async (id: string) => {
    console.log('Editar vacante:', id);
    // Podrías abrir un modal para editar o hacer otra llamada a la API
  };

  const handleDeleteVacante = async (id: string) => {
    if (!auth.token) return;
    try {
      // Llamada DELETE a la API
      await clienteAxios.delete(`/vacantes/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      // Actualizamos la lista de vacantes en el estado
      setVacantes((prev) => prev.filter((v) => v._id !== id));
      console.log('Vacante eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la vacante:', error);
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (!usuario) {
    return <p>No se pudo cargar la información del usuario.</p>;
  }

  // Si es reclutador, mostramos las vacantes
  if (usuario.esReclutador) {
    return (
      <VacanteList
        vacantes={vacantes}
        onEdit={handleEditVacante}
        onDelete={handleDeleteVacante}
      />
    );
  } else {
    // Caso: usuario postulante
    return (
      <PostulacionesList
        postulaciones={usuario.postulaciones || []}
      />
    );
  }
};

export default VacanteOPostulaciones;
