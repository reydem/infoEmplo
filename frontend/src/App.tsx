// /webapps/infoEmplo-venv/infoEmplo/frontend/src/App.tsx
import { Fragment } from "react";
import './App.css'
import { BrowserRouter as Router} from 'react-router-dom';
import Asideleft from "./components/custom-ui/Asideleft";
import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'


import clienteAxios from './config/axios';
import EmploymentOffer from "./components/custom-ui/EmploymentOffer";
import { Input, InputGroup } from "./components/ui";
import Asideright from "./components/custom-ui/Asideright";
import Navegacion from "./components/layout/Navegacion";


// Interfaz para definir un empleado
interface Empleado {
  buttonText: string;
  description: string;
}


function App() {

  const [empleados, setEmpleados] = useState<Empleado[]>([]); // Estado para almacenar los empleados
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  // Función para consultar la API
  const consultarAPI = async () => {
    try {
      const { data } = await clienteAxios.get('/empleados');
      setEmpleados(data); // Actualizar el estado con los datos de la API
    } catch (error) {
      console.error('Error al consultar la API:', error);
      setError('No se pudo cargar la lista de empleados.');
    }
  };

  // useEffect para realizar la consulta al montar el componente
  useEffect(() => {
    consultarAPI();
  }, []);
  return (
    <>
      <Router>
        <Fragment>
          <div className="flex min-h-full flex-col p-20 bg-slate-300 font-nanum">
            {/* <Header /> */}
            <div className="mx-auto flex w-full max-w-7xl items-start px-0 py-0 sm:px-6 lg:px-8 border-4 border-gray-400 rounded-[32px] bg-white">
              <Asideleft />
              <main className="flex-1 border-l-4 border-gray-400 bg-white">
                <InputGroup className="flex-1 border-4 border-gray-400" >
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
                {/* Mostrar errores si ocurren */}
                {error && (
                  <div className="text-red-500 text-center my-4">{error}</div>
                )}

                {/* Pasar los empleados como props a EmploymentOffer */}
                <EmploymentOffer empleados={empleados} />

                {/* Main area */}

              </main>

              <Navegacion/>
              <Asideright />
            </div>
          </div>
        </Fragment>
      </Router>
    </>
  )
}

export default App
