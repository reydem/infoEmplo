// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/VacanteOPostulaciones.tsx

import React, { useContext, useState, useEffect, useCallback } from 'react';
import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../config/axios';
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
  postulaciones?: Vacante[];
}

interface VacanteOPostulacionesProps {
  onEditVacante: (id: string) => void;
}

const VacanteOPostulaciones: React.FC<VacanteOPostulacionesProps> = ({ onEditVacante }) => {
  const crmContext = useContext(CRMContext);
  if (!crmContext) return null;
  const [auth] = crmContext;

  // Estados para el usuario y la lista de vacantes
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Función que obtiene el usuario y las vacantes (si es reclutador).
   */
  const fetchData = useCallback(async () => {
    try {
      if (!auth.token) {
        console.warn('No hay token, no se puede cargar data');
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      };

      // 1. Obtener el usuario autenticado (con sus postulaciones pobladas)
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
  }, [auth.token]);

  useEffect(() => {
    fetchData();

    // Suscribir al evento "vacanteCreada"
    const handleVacanteCreada = () => {
      fetchData();
    };

    window.addEventListener("vacanteCreada", handleVacanteCreada);

    return () => {
      window.removeEventListener("vacanteCreada", handleVacanteCreada);
    };
  }, [fetchData]);

  // Función para eliminar vacantes (para reclutadores)
  const handleDeleteVacante = async (id: string) => {
    if (!auth.token) return;
    try {
      await clienteAxios.delete(`/vacantes/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setVacantes((prev) => prev.filter((v) => v._id !== id));
      console.log('Vacante eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la vacante:', error);
    }
  };

  // Función para eliminar la postulación (para usuarios postulantes)
  const handleDeletePostulacion = async (id: string) => {
    if (!auth.token) return;
    try {
      await clienteAxios.delete(`/vacantes/${id}/postular`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setUsuario((prevUsuario) => {
        if (!prevUsuario) return prevUsuario;
        return {
          ...prevUsuario,
          postulaciones: prevUsuario.postulaciones?.filter((vac) => vac._id !== id)
        };
      });
      console.log('Postulación eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la postulación:', error);
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (!usuario) {
    return <p>No se pudo cargar la información del usuario.</p>;
  }

  // Si es reclutador, mostramos la lista de vacantes
  if (usuario.esReclutador) {
    return (
      <VacanteList
        vacantes={vacantes}
        onEdit={onEditVacante} // Se utiliza la función pasada desde el padre
        onDelete={handleDeleteVacante}
      />
    );
  } else {
    // Caso: usuario postulante, mostramos las postulaciones con opción de eliminación
    return (
      <PostulacionesList
        postulaciones={usuario.postulaciones || []}
        onDelete={handleDeletePostulacion}
      />
    );
  }
};

export default VacanteOPostulaciones;
