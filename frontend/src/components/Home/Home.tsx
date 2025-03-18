// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Home/Home.tsx
import { useContext } from 'react';
import { CRMContext } from '../../context/CRMContext';
import Vacantes from '../Vacantes/Vacantes';
import Usuarios from '../Usuarios/Usuarios';

function Home() {
    const crmContextValue = useContext(CRMContext);
    if (!crmContextValue) return null;
  
    const [auth] = crmContextValue;
    console.log('Valor de auth:', auth);
    console.log('Valor de esReclutador:', auth.esReclutador);
    console.log('Valor de correo:', auth.correo);
  
    return auth.esReclutador ? <Usuarios /> : <Vacantes />;
  }

export default Home;