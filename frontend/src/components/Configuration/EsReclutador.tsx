// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/EsReclutador.tsx
import React from 'react'
import VacantesSession from './VacantesSession'

interface EsReclutadorProps {
  vacanteToEdit: any; // Ajusta el tipo según corresponda
  handleVacanteUpdated: () => void;
}



const EsReclutador: React.FC<EsReclutadorProps> = ({ vacanteToEdit, handleVacanteUpdated }) => {
  return (
    <VacantesSession
      vacanteToEdit={vacanteToEdit}
      onVacanteUpdated={handleVacanteUpdated}
    />
  )
}

export default EsReclutador;

