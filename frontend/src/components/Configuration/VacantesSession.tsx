// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/VacantesSession.tsx
import React, { useState } from 'react';
import clienteAxios from '../../config/axios';

const VacantesSession: React.FC = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [salario, setSalario] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token"); // Obtiene el token de autenticación
            if (!token) {
                setMensaje('⚠️ No estás autenticado. Inicia sesión.');
                return;
            }

            const response = await clienteAxios.post('/vacantes', {
                titulo,
                descripcion,
                salario_ofrecido: isNaN(parseFloat(salario)) ? 0 : parseFloat(salario)
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Envía el token en el header
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            setMensaje(response.data.mensaje || '✅ Vacante publicada con éxito');
            setTitulo('');
            setDescripcion('');
            setSalario('');
        } catch (error: any) {
            console.error('Error al crear la vacante:', error);

            if (error.response) {
                // El servidor respondió con un código de error (4xx o 5xx)
                setMensaje(error.response.data?.mensaje || '❌ Error en la solicitud');
            } else if (error.request) {
                // No se recibió respuesta del servidor
                setMensaje('❌ No se pudo conectar con el servidor');
            } else {
                // Ocurrió un error al configurar la petición
                setMensaje('❌ Error desconocido al enviar la vacante');
            }
        }
    };
    return (
        <>
            <div className="max-w-2xl xl:col-span-2 ">
                <form className='pb-10' onSubmit={handleSubmit}>
                    <div className="">
                        <div>
                            <div className=" pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                                <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:py-6">
                                    <label htmlFor="username" className="block text-lg font-bold text-gray-900 ">
                                        Empresa
                                    </label>
                                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                                        <div className="flex items-center rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-600 sm:max-w-md">

                                            <input
                                                id="username"
                                                name="username"
                                                type="text"
                                                placeholder="Nombre de la empresa"
                                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                value={titulo}
                                                onChange={(e) => setTitulo(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:grid sm:items-start sm:gap-4 sm:py-6">
                                    <label htmlFor="about" className="block text-lg font-bold text-gray-900">
                                        Descripción de la vacante
                                    </label>
                                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:gray-indigo-600"
                                            placeholder="Descripción del puesto"
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className=" ">
                                <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:py-6">
                                    <label htmlFor="first-name" className="block text-lg font-bold text-gray-900">
                                        Salario
                                    </label>
                                    <div className="sm:col-span-2 sm:mt-0">
                                        <input
                                            id="first-name"
                                            name="first-name"
                                            type="text"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md bg-white  py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:max-w-xs sm:text-sm/6"
                                            placeholder="Ej: 50000"
                                            value={salario}
                                            onChange={(e) => setSalario(e.target.value)}
                                            required                                        
                                        />
                                    </div>
                                    {mensaje && <p className="text-sm text-red-500 mt-2">{mensaje}</p>}
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md bg-gray-950 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-500"
                            >
                                Publicar Vacante
                            </button>
                        </div>
                </form>
            </div>
        </>
    )
}

export default VacantesSession;
