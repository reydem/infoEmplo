// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/VacanteOPostulaciones.tsx

import React, { useContext, useState } from 'react';
import { CRMContext } from '../../context/CRMContext';
import VacanteList from './VacanteList';
import PostulacionesList from './PostulacionesList';


// Interfaces de ejemplo
interface Vacante {
  _id: string;
  titulo: string;
  descripcion: string;
  imagen_empresa?: string;
}

interface Usuario {
  postulaciones?: Vacante[];
}

const VacanteOPostulaciones: React.FC = () => {
  const crmContext = useContext(CRMContext);
  if (!crmContext) return null;

  const [auth] = crmContext;

  // EJEMPLO: datos en el estado local. En tu app real podrías recibirlos de un padre
  const [listaVacantes, setListaVacantes] = useState<Vacante[]>([
    { _id: '1', titulo: 'Vacante 1', descripcion: 'Desc 1' },
    { _id: '2', titulo: 'Vacante 2', descripcion: 'Desc 2' },
  ]);

  const [usuario, setUsuario] = useState<Usuario>({
    postulaciones: [
      { _id: '3', titulo: 'Vacante postulada 1', descripcion: 'Desc postulada 1' },
      { _id: '4', titulo: 'Vacante postulada 2', descripcion: 'Desc postulada 2' },
    ],
  });

  // Funciones de ejemplo para editar y eliminar
  const handleEditVacante = (id: string) => {
    console.log('Edit vacante:', id);
    // Aquí iría tu lógica para editar una vacante
  };

  const handleDeleteVacante = (id: string) => {
    console.log('Delete vacante:', id);
    // Lógica de eliminación en el estado local
    setListaVacantes((prev) => prev.filter((v) => v._id !== id));
  };

  // Si es reclutador, muestra <VacanteList />, si no, <PostulacionesList />
  return auth.esReclutador ? (
    <VacanteList 
      vacantes={listaVacantes}
      onEdit={handleEditVacante}
      onDelete={handleDeleteVacante}
    />
  ) : (
    <PostulacionesList 
      postulaciones={usuario.postulaciones || []}
    />
  );
};

export default VacanteOPostulaciones;

