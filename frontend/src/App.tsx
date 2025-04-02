// /webapps/infoEmplo-venv/infoEmplo/frontend/src/App.tsx
import './App.css';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Asideleft from './components/custom-ui/Asideleft';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Input, InputGroup } from "./components/ui";
import Asideright from "./components/custom-ui/Asideright";
import LoginComponent from "./components/Login/Login";
import Register from "./components/Register/Register";
import Content from "./components/Content/Content";
import Configuration from "./components/Configuration/Configuration";
import Security from "./components/Security/Security";
import Preferences from "./components/Preferences/Preferences";
import Notifications from "./components/Notifications/Notifications";
import Home from './components/Home/Home';
import NuevoEmpleado from './components/Empleados/NuevoEmpleado';

import EditarEmpleado from './components/Empleados/EditarEmpleado';
import NuevoVacante from './components/Vacantes/NuevoVacante';
import EditarVacante from './components/Vacantes/EditarVacante';
import Empleados from './components/Empleados/Empleados';
import Vacantes from './components/Vacantes/Vacantes';
import Ofertas from './components/Ofertas/Ofertas';
import NuevaOferta from './components/Ofertas/NuevaOferta';
import { CRMContext, CRMProvider } from './context/CRMContext';
import Vacante from './components/Vacantes/Vacante';
import Usuarios from './components/Usuarios/Usuarios';
import NOAsiderightSI from './components/custom-ui/NOAsiderightSI';


function App() {
  return (
    <Router>
      <CRMProvider>
        <Routes>
          {/* Ruta específica para el componente de Login */}
          <Route path="/iniciar-sesion" element={<LoginComponent />} />
          <Route path="/register" element={<Register />} /> 

          {/* Rutas que requieren la interfaz principal */}
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </CRMProvider>
    </Router>
  );
}

function AppLayout() {
  const location = useLocation();

  const isLoginRoute = location.pathname === "/login";
  // const isRegisterRoute = location.pathname === "/register";
  const isContentRoute = location.pathname === "/content";
  const isConfigurationRoute = location.pathname === "/configuration";
  const isSecurityRoute = location.pathname === "/security";
  const isPreferencesRoute = location.pathname === "/preferences";
  const isNotificationsRoute = location.pathname === "/notifications";

  if (isLoginRoute) {
    return (
      <div>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </div>
    );
  }

  // if (isRegisterRoute) {
  //   return (
  //     <div>
  //       <Routes>
  //         <Route path="/register" element={<Register />} />
  //       </Routes>
  //     </div>
  //   );
  // }

  if (isContentRoute) {
    return (
      <div>
        <Routes>
          <Route path="/content" element={<Content />} />
        </Routes>
      </div>
    );
  }

  if (isConfigurationRoute) {
    return (
      <div>
        <Routes>
          <Route path="/configuration" element={<Configuration />} />
        </Routes>
      </div>
    );
  }

  if (isSecurityRoute) {
    return (
      <div>
        <Routes>
          <Route path="/security" element={<Security />} />
        </Routes>
      </div>
    );
  }

  if (isPreferencesRoute) {
    return (
      <div>
        <Routes>
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
      </div>
    );
  }

  if (isNotificationsRoute) {
    return (
      <div>
        <Routes>
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    );
  }

  // Diseño principal para el resto de las rutas
  return (
    <div className="main-layout flex min-h-full flex-col p-20 bg-slate-300 font-nanum pb-96">
      <div className="mx-auto flex w-full max-w-7xl items-start px-0 py-0 sm:px-6 lg:px-8 border-4 border-gray-400 rounded-[32px] bg-white">
        <Asideleft />
        <main className="flex-1 border-l-4 border-gray-400 bg-white">
          <InputGroup className="flex-1 border-4 border-gray-400">
            <MagnifyingGlassIcon className='ml-5 ' />
            <Input
              name="search"
              aria-label="Search"
              className="border-2 border-gray-400 rounded-lg my-5 mx-5 w-auto max-w-[500px] sm:leading-[0.75rem]" />
            <div className="absolute top-[5px] right-[100px] bg-white text-black font-bold">
              Comunidad
            </div>
            <div className="absolute top-[5px] right-[-120px] bg-white text-black font-bold">
              Soporte
            </div>
          </InputGroup>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/empleados/nuevo" element={<NuevoEmpleado />} />
            <Route path="/empleados/editar/:id" element={<EditarEmpleado />} />
            <Route path="/vacantes" element={<Empleados />} />
            <Route path="/vacantes/nuevo" element={<NuevoVacante />} />
            <Route path="/vacantes/editar/:id" element={<EditarVacante />} />

            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/ofertas/nuevo" element={<NuevaOferta />} />
          </Routes>
        </main>
        <NOAsiderightSI />
      </div>
    </div>
  );
}

export default App;
