// /webapps/infoEmplo-venv/infoEmplo/frontend/src/App.tsx
import './App.css';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Asideleft from "./components/custom-ui/Asideleft";
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Input, InputGroup } from "./components/ui";
import Asideright from "./components/custom-ui/Asideright";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Content from "./components/Content/Content";
import Configuration from "./components/Configuration/Configuration";
import Security from "./components/Security/Security";
import Preferences from "./components/Preferences/Preferences";
import Notifications from "./components/Notifications/Notifications";
import Home from './components/Home/Home';
import NuevoEmpleado from './components/page/NuevoEmpleado';
import Vacantes from './components/page/Vacantes';
import Ofertas from './components/page/Ofertas';
import EditarEmpleado from './components/page/EditarEmpleado';
import Empleado from './components/page/Empleado';

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

function AppLayout() {
  const location = useLocation();

  const isLoginRoute = location.pathname === "/login";
  const isRegisterRoute = location.pathname === "/register";
  const isContentRoute = location.pathname === "/content";
  const isConfigurationRoute = location.pathname === "/configuration";
  const isSecurityRoute = location.pathname === "/security";
  const isPreferencesRoute = location.pathname === "/preferences";
  const isNotificationsRoute = location.pathname === "/notifications";

  if (isLoginRoute) {
    return (
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    );
  }

  if (isRegisterRoute) {
    return (
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    );
  }

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
    <div className="main-layout flex min-h-full flex-col p-20 bg-slate-300 font-nanum">
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
            <Route path="/empleados" element={<Empleado  />} />
            <Route path="/empleados/nuevo" element={<NuevoEmpleado />} />
            <Route path="/clientes/editar/:id" element={<EditarEmpleado  />} />

            <Route path="/vacantes" element={<Vacantes />} />
            <Route path="/ofertas" element={<Ofertas />} />

          </Routes>
        </main>
        <Asideright />
      </div>
    </div>
  );
}

export default App;
