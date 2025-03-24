import { useContext } from 'react';
import { CRMContext } from '../../context/CRMContext';
import Asideright from './Asideright';
import NOAsideright from './NOAsideright';

function NOAsiderightSI() {
    // Obtenemos el estado global de autenticación
    const crmContextValue = useContext(CRMContext);
    if (!crmContextValue) return null;

    // Desestructuramos ambos valores para poder usar setAuth
    const [auth] = crmContextValue;

    // Dependiendo de si es reclutador o no, renderizamos el componente correspondiente
    return auth.esReclutador ? (
        <NOAsideright />
    ) : (
        <Asideright />
    );
}

export default NOAsiderightSI;