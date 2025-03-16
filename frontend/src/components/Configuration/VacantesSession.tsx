import React, { PureComponent } from 'react'

export class VacantesSession extends PureComponent {
    render() {
        return (
            <>
                <div className="max-w-2xl xl:col-span-2 ">
                    <form className='pb-10'>
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
                                                defaultValue={''}
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
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">

                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md bg-gray-950 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default VacantesSession
