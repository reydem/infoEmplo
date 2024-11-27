// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Home/Home.tsx
import { useEffect, useState } from 'react';
import EmploymentOffer from '../custom-ui/EmploymentOffer';
import clienteAxios from '../../config/axios';

// Interfaz para definir un empleado
interface Empleado {
    buttonText: string;
    description: string;
}

function Home() {
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
            {/* Mostrar errores si ocurren */}
            {error && (
                <div className="text-red-500 text-center my-4">{error}</div>
            )}

            {/* Pasar los empleados como props a EmploymentOffer */}
            <EmploymentOffer empleados={empleados} />

            {/* Main area */}
        </>



    )
}

export default Home