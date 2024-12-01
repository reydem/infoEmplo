// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/layout/Navegacion.tsx
import { useContext } from 'react';
import Logo from '../../assets/Logo.png';
import { Button } from '../ui';
import { Link } from 'react-router-dom';
import {
  SignalIcon,
  FolderIcon,
  DocumentCheckIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { CRMContext } from '../../context/CRMContext';

const Navegacion = () => {
  const crmContext = useContext(CRMContext);

  // Verificar que el contexto no sea undefined
  if (!crmContext) {
    throw new Error('CRMContext debe ser utilizado dentro de un CRMProvider');
  }

  const [auth] = crmContext; // No necesitas `guardarAuth` aquí

  // Si no está autenticado, no mostrar la navegación
  if (!auth.auth) return null;

  return (
    <>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Envolver el logo con el componente Link */}
        <Link to="/">
          <img alt="Your Company" src={Logo} className="h-10 w-auto" />
        </Link>
        <div>
          <Link to="/login">
            <Button color="dark">Entrar</Button>
          </Link>
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <h2
          color="white"
          className="-m-2.5 p-2.5 text-lg text-black font-bold hover:text-gray-300"
        >
          Navegación
        </h2>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Button color="white" className="-m-2.5 p-2.5 text-black">
          <SignalIcon
            aria-hidden="true"
            className="w-6 h-6 font-bold"
            strokeWidth={2.5} // Ajusta el grosor del trazo
          />
          Actividades
        </Button>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Button
          color="white"
          className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300"
        >
          <FolderIcon aria-hidden="true" className="size-6" />
          Proyectos de empleo
        </Button>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Button
          color="white"
          className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300"
        >
          <DocumentCheckIcon aria-hidden="true" className="size-6" />
          Información de ofertas
        </Button>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Button
          color="white"
          className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300"
        >
          <ChartBarIcon aria-hidden="true" className="size-6" />
          Lanzamiento de ofertas
        </Button>
      </div>
    </>
  );
};

export default Navegacion;

