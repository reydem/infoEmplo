// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Register/Register.tsx
// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Register/Register.tsx
import { useState } from "react";
import clienteAxios from "../../config/axios";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Register = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        nombre: "",
        primerApellido: "",
        segundoApellido: "",
        correo: "",
        telefono: "",
        password: "",
        repetirPassword: "",
    });

    const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
    const [hojaVida, setHojaVida] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (field === "fotoPerfil") {
            setFotoPerfil(file);
        } else if (field === "hojaVida") {
            setHojaVida(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.repetirPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden',
            });
            return;
        }

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value as string);
        });

        if (fotoPerfil) {
            formDataToSend.append("fotoPerfil", fotoPerfil);
        }
        if (hojaVida) {
            formDataToSend.append("hojaVida", hojaVida);
        }

        try {
            const response = await clienteAxios.post("/crear-cuenta", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Alerta de éxito usando Swal
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: response.data.mensaje || 'Será redirigido a la dashboard de infoEmpleo',
            });

            // Redirigir a la página de empleados después del registro exitoso
            navigate("/");
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.mensaje || "Error al registrar usuario",
            });
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-2 font-nanum">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Link to="/">
                        <img
                            alt="Your Company"
                            src={Logo}
                            className="mx-auto h-16 w-auto"
                        />
                    </Link>
                    <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Registrarse en INFO.EMPLEO
                    </h2>
                </div>

                <form
                    className='mt-10 mx-auto max-w-7xl px-6 lg:px-2 border-4 border-gray-400 rounded-[32px] bg-slate-300'
                    onSubmit={handleSubmit}
                >
                    <div className=" col-span-3 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">

                        <div className="space-y-3">
                            <div className=''>
                                <label htmlFor="email" className="ml-4 mt-4 block text-sm font-bold text-gray-900">
                                    Nombre*:
                                </label>
                                <div className="ml-4 flex ">
                                    <input
                                        type="text"
                                        name="nombre"
                                        placeholder="Nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                        id="email"
                                        className="block w-60 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="email" className="ml-4 block text-sm font-bold text-gray-900">
                                    Primer apellido*:
                                </label>
                                <div className="ml-4 flex ">
                                    <input
                                        type="text"
                                        name="primerApellido"
                                        placeholder="Primer apellido"
                                        value={formData.primerApellido}
                                        onChange={handleChange}
                                        required
                                        id="email"
                                        className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="email" className="ml-4 block text-sm font-bold text-gray-900">
                                    Segundo apellido*:
                                </label>
                                <div className="ml-4 flex ">
                                    <input
                                        type="text"
                                        name="segundoApellido"
                                        placeholder="Segundo apellido"
                                        value={formData.segundoApellido}
                                        onChange={handleChange}
                                        required
                                        id="email"
                                        className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="email" className="ml-4 block text-sm font-bold text-gray-900">
                                    Correo*:
                                </label>
                                <div className="ml-4 flex ">
                                    <input
                                        type="email"
                                        name="correo"
                                        placeholder="Correo"
                                        value={formData.correo}
                                        onChange={handleChange}
                                        required
                                        id="email"
                                        className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="email" className="ml-4 block text-sm font-bold text-gray-900">
                                    Telefono*:
                                </label>
                                <div className="ml-4 flex ">
                                    <input
                                        type="text"
                                        name="telefono"
                                        placeholder="Teléfono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        required
                                        id="email"
                                        className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="email" className="ml-4 block text-sm font-bold text-gray-900">
                                    Contraseña*:
                                </label>
                                <div className="ml-4 flex ">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Contraseña"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        id="email"
                                        className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="email" className="ml-4 block text-sm font-bold text-gray-900">
                                    Repetir Contraseña*:
                                </label>
                                <div className="ml-4 flex">
                                    <input
                                        type="password"
                                        name="repetirPassword"
                                        placeholder="Repetir contraseña"
                                        value={formData.repetirPassword}
                                        onChange={handleChange}
                                        required
                                        id="email"
                                        className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className='font-bold mt-3 text-center text-sm/6'>Estos campos son opcionales:</p>
                            <div className="flex flex-col items-center ">
                                <div className="flex flex-col items-center gap-4 mt-10">
                                    {/* Botón para subir foto de perfil */}
                                    <div className="flex flex-col items-center border-[1px] border-black rounded-[10px] shadow-custom">
                                        <label
                                            htmlFor="profilePhoto"
                                            className="flex flex-col items-center justify-center w-24 h-24 cursor-pointer border-gray-400 rounded-[10px] bg-slate-300 hover:bg-gray-200"
                                        >
                                            {/* Ícono SVG */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                            </svg>
                                            {/* Texto debajo del ícono */}
                                            <span className="mt-2 text-xs text-center font-bold text-black">Agregar foto de perfil</span>
                                        </label>
                                        <input
                                            id="profilePhoto"
                                            type="file" className="hidden"
                                            onChange={(e) => handleFileChange(e, "fotoPerfil")}
                                        />
                                    </div>
                                    {/* Botón para subir hoja de vida */}
                                    <div className="flex flex-col items-center border-[1px] border-black rounded-[10px] mt-10 shadow-custom">
                                        <label
                                            htmlFor="cv"
                                            className="flex flex-col items-center justify-center w-24 h-24 cursor-pointer border-gray-400 rounded-[10px] bg-slate-300 hover:bg-gray-200"
                                        >
                                            {/* Ícono SVG diferente */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                            </svg>
                                            {/* Texto debajo del ícono */}
                                            <span className="mt-2 text-xs text-center font-bold text-black">Agregar hoja de vida</span>
                                        </label>
                                        <input
                                            id="cv"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, "hojaVida")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-10">
                        <button
                            type="submit"
                            className="flex w-36 mb-10 justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        >
                            Registrarse
                        </button>

                    </div>

                </form>

            </div>
        </>
    )
}


export default Register
