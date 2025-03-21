// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/EsReclutadorNO.tsx

import { useContext } from 'react';
import { CRMContext } from '../../context/CRMContext';
import EsReclutador from './EsReclutador';
import NoReclutador from './NoReclutador';

function EsReclutadorNO() {
  // Obtenemos el estado global de autenticación
  const crmContextValue = useContext(CRMContext);
  if (!crmContextValue) return null;

  // Desestructuramos ambos valores para poder usar setAuth
  const [auth, setAuth] = crmContextValue;

  // Callback que se ejecuta cuando se actualiza el perfil de un postulante
  const handlePerfilActualizado = (usuarioActualizado: any) => {
    console.log("Perfil actualizado:", usuarioActualizado);
    // Actualiza el estado global en el contexto
    setAuth({ ...auth, user: usuarioActualizado });
  };

  // Callback para cuando se actualice la vacante (ejemplo)
  const handleVacanteUpdated = () => {
    console.log('Vacante actualizada');
    // Aquí tu lógica de actualización de vacantes, si aplica
  };

  // Dependiendo de si es reclutador o no, renderizamos el componente correspondiente
  return auth.esReclutador ? (
    <EsReclutador
      vacanteToEdit={{}}  // Ajusta esto según tu lógica o estado actual
      handleVacanteUpdated={handleVacanteUpdated}
    />
  ) : (
    <NoReclutador onPerfilActualizado={handlePerfilActualizado} />
  );
}

export default EsReclutadorNO;

