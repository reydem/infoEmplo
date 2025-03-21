
// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/noReclutador.tsx

import React from 'react'

function NoReclutador() {
    return (
        <>
            <div className="max-w-2xl xl:col-span-2 ">
                <div className='pb-10' >


                    <div className=" pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0 mb-3">
                        <div className="sm:grid sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="about" className="block text-lg font-bold text-gray-900">
                                Descripción de la hoja de vida:
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:gray-indigo-600"
                                    placeholder="Descripción del puesto"
                                    // value={descripcion}
                                    // onChange={(e) => setDescripcion(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="sm:grid sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="about" className="block text-lg font-bold text-gray-900">
                            Telefono de contacto:
                            </label>
                            <div className="sm:col-span-2 sm:mt-0">
                                <input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md bg-white  py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:max-w-xs sm:text-sm/6"
                                    placeholder="Telefono de contacto"
                                    // value={salario}
                                    // onChange={(e) => setSalario(e.target.value)}
                                    required
                                />
                            </div>
                            {/* {mensaje && <p className="text-sm text-red-500 mt-2">{mensaje}</p>} */}
                        </div>
                        <div className="flex flex-col items-center border-[1px] border-black rounded-[10px] shadow-custom w-24 h-24 ">
                            <label
                                htmlFor="profilePhoto"
                                className="flex flex-col items-center justify-center w-full h-full cursor-pointer border-gray-400 rounded-[10px] bg-slate-300 hover:bg-gray-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <span className="mt-2 text-xs text-center font-bold text-black">
                                    Agregar foto de la empresa
                                </span>
                            </label>
                            <input
                                id="profilePhoto"
                                type="file"
                                className="hidden"
                                accept="image/*"
                            // onChange={(e) => setImagen(e.target.files?.[0] || null)}
                            />
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md bg-gray-950 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-500"
                            >
                                {/* {vacanteToEdit && vacanteToEdit._id ? 'Guardar Cambios' : 'Publicar Vacante'} */}
                                Publicar Hoja de vida
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoReclutador
