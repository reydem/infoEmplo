// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/EsReclutadorNO.tsx
import { useContext } from 'react';
import { CRMContext } from '../../context/CRMContext';
import EsReclutador from './EsReclutador';
import NoReclutador from './NoReclutador';

function EsReclutadorNO() {
  const crmContextValue = useContext(CRMContext);
  if (!crmContextValue) return null;

  const [auth] = crmContextValue;

  // Aquí puedes obtener la vacante o definir un placeholder
  const vacanteToEdit = {}; // Ajusta esto según tu lógica o estado actual
  // Aquí defines la función que se llama cuando se actualice la vacante
  const handleVacanteUpdated = () => {
    console.log('Vacante actualizada');
    // tu lógica de actualización
  };

  return auth.esReclutador ? (
    <EsReclutador
      vacanteToEdit={vacanteToEdit}
      handleVacanteUpdated={handleVacanteUpdated}
    />
  ) : (
    <NoReclutador />
  );
}

export default EsReclutadorNO;
