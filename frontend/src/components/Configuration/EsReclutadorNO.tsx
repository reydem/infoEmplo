// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/esReclutadorNO.tsx
import { useContext } from 'react';
import { CRMContext } from '../../context/CRMContext';
import EsReclutador from './EsReclutador';
import NoReclutador from './NoReclutador';


function EsReclutadorNO() {
  const crmContextValue = useContext(CRMContext);
  if (!crmContextValue) return null;

  const [auth] = crmContextValue;
  console.log('Valor de auth:', auth);
  console.log('Valor de esReclutador:', auth.esReclutador);
  console.log('Valor de correo:', auth.correo);
  return auth.esReclutador ? <EsReclutador /> : <NoReclutador />;
}

export default EsReclutadorNO
