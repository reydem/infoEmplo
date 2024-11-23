// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Content/Content.tsx

import { Component } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import Logo from '../../assets/Logo.png';
import { Button, Input, InputGroup } from '../ui';
import EmploymentOffer from '../custom-ui/EmploymentOffer';
import { Link } from 'react-router-dom';
import {
    SignalIcon,
    FolderIcon,
    DocumentCheckIcon,
    ChartBarIcon,
    BuildingOffice2Icon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

export class Content extends Component {
    render() {
        return (
            <div className="flex min-h-full flex-col p-20 bg-slate-300 font-nanum">
                {/* <header className="shrink-0 border-b border-gray-200 bg-white mt-10">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <img
                alt="Your Company"
                src={Logo}
                className="h-8 w-auto"
              />
              <div>
                <Button color="dark">
                  Entrar
                </Button>
              </div>
            </div>
          </header> */}
                <div className="mx-auto flex w-full max-w-7xl items-start px-0 py-0 sm:px-6 lg:px-8 border-4 border-gray-400 rounded-[32px] bg-white">
                    <aside className="sticky top-8 hidden w-64 shrink-0 lg:block ">
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            {/* Envolver el logo con el componente Link */}
                            <Link to="/">
                                <img
                                    alt="Your Company"
                                    src={Logo}
                                    className="h-10 w-auto"
                                />
                            </Link>
                            <div>
                                <div className='ml-7'>
                                        <Button color="dark">
                                            Contenido
                                        </Button>                                    
                                </div> <div className='ml-7'>
                                    <Link to="/login">
                                        <Button className='bg-purple-custom m-0 p-0'>
                                            <div className='text-[9px] '>
                                                Cerrar seccion
                                            </div>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <h2 color="white" className="-m-2.5 p-2.5 text-lg text-black font-bold hover:text-gray-300">
                                Navegacion
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
                            <Button color="white" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
                                <FolderIcon aria-hidden="true" className="size-6" />
                                Proyectos de empleo
                            </Button>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <Button color="white" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
                                <DocumentCheckIcon aria-hidden="true" className="size-6" />
                                Informacion de ofertas
                            </Button>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <Button color="white" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
                                <ChartBarIcon aria-hidden="true" className="size-6" />
                                Lanzamiento de ofertas
                            </Button>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <Button color="white" className="-m-2.5 p-2.5 text-black font-bold hover:text-gray-300">
                                <Cog6ToothIcon aria-hidden="true" className="w-6 h-6 font-bold" />
                                Lanzamiento de ofertas
                            </Button>
                        </div>
                        {/* Left column area */}
                    </aside>
                    <main className="flex-1 border-l-4 border-gray-400 bg-white">
                        <InputGroup className="flex-1 border-4 border-gray-400" >
                            <MagnifyingGlassIcon className='ml-5 ' />
                            <Input
                                name="search"
                                aria-label="Search"
                                className="border-2 border-gray-400 rounded-lg my-5 mx-5 w-auto max-w-[500px] sm:leading-[0.75rem]" />
                            <div className="absolute top-[5px] right-[150px] bg-white text-black font-bold">
                                Comunidad
                            </div>
                            <div className="absolute top-[5px] right-[30px] bg-white text-black font-bold">
                                Soporte
                            </div>

                            <div className="absolute top-[5px] right-[-50px] bg-white text-black font-bold">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                            </div>
                            <div className="absolute top-[5px] right-[-150px] bg-white text-black font-bold">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                </svg>
                            </div>

                        </InputGroup>
                        <EmploymentOffer
                            buttonText='Oferta de empleo'
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                        />
                        <EmploymentOffer
                            buttonText="Oferta de empleo"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                        />
                        <EmploymentOffer
                            buttonText="Oferta de empleo"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                        />
                        <EmploymentOffer
                            buttonText="Oferta de empleo"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                        />
                        <EmploymentOffer
                            buttonText="Oferta de empleo"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                        />
                        <EmploymentOffer
                            buttonText="Oferta de empleo"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                        />
                        <EmploymentOffer
                            buttonText="Oferta de empleo"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                        />
                        <EmploymentOffer
                            buttonText="Oferta de empleo"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                        />
                        <EmploymentOffer
                            buttonText="Oferta de empleo"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                        />
                        {/* Main area */}

                    </main>
                    <aside className="sticky top-8 hidden w-44 shrink-0 xl:block  border-4 border-gray-400 mt-[70px]">

                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
                            <div className="-m-2.5 p-2.5 flex items-center text-gray-900 text-sm">
                                <BuildingOffice2Icon
                                    aria-hidden="true"
                                    className="h-6 w-6 mr-2"
                                />
                                Empresa contratista
                            </div>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
                            <div className="-m-2.5 p-2.5 flex items-center text-gray-900 text-sm">
                                <BuildingOffice2Icon
                                    aria-hidden="true"
                                    className="h-6 w-6 mr-2"
                                />
                                Empresa contratista
                            </div>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
                            <div className="-m-2.5 p-2.5 flex items-center text-gray-900 text-sm">
                                <BuildingOffice2Icon
                                    aria-hidden="true"
                                    className="h-6 w-6 mr-2"
                                />
                                Empresa contratista
                            </div>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
                            <div className="-m-2.5 p-2.5 flex items-center text-gray-900 text-sm">
                                <BuildingOffice2Icon
                                    aria-hidden="true"
                                    className="h-6 w-6 mr-2"
                                />
                                Empresa contratista
                            </div>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
                            <div className="-m-2.5 p-2.5 flex items-center text-gray-900 text-sm">
                                <BuildingOffice2Icon
                                    aria-hidden="true"
                                    className="h-6 w-6 mr-2"
                                />
                                Empresa contratista
                            </div>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
                            <div className="-m-2.5 p-2.5 flex items-center text-gray-900 text-sm">
                                <BuildingOffice2Icon
                                    aria-hidden="true"
                                    className="h-6 w-6 mr-2"
                                />
                                Empresa contratista
                            </div>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
                            <div className="-m-2.5 p-2.5 flex items-center text-gray-900 text-sm">
                                <BuildingOffice2Icon
                                    aria-hidden="true"
                                    className="h-6 w-6 mr-2"
                                />
                                Empresa contratista
                            </div>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
                            <div className="-m-2.5 p-2.5 flex items-center text-gray-900 text-sm">
                                <BuildingOffice2Icon
                                    aria-hidden="true"
                                    className="h-6 w-6 mr-2"
                                />
                                Empresa contratista
                            </div>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
                            <div className="-m-2.5 p-2.5 flex items-center text-gray-900 text-sm">
                                <BuildingOffice2Icon
                                    aria-hidden="true"
                                    className="h-6 w-6 mr-2"
                                />
                                Empresa contratista
                            </div>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
                            <div className="-m-2.5 p-2.5 flex items-center text-gray-900 text-sm">
                                <BuildingOffice2Icon
                                    aria-hidden="true"
                                    className="h-6 w-6 mr-2"
                                />
                                Empresa contratista
                            </div>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
                            <div className="-m-2.5 p-2.5 flex items-center text-gray-900 text-sm">
                                <BuildingOffice2Icon
                                    aria-hidden="true"
                                    className="h-6 w-6 mr-2"
                                />
                                Empresa contratista
                            </div>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
                            <div className="-m-2.5 p-2.5 flex items-center text-gray-900 text-sm">
                                <BuildingOffice2Icon
                                    aria-hidden="true"
                                    className="h-6 w-6 mr-2"
                                />
                                Empresa contratista
                            </div>
                        </div>



                        {/* Right column area */}

                    </aside>
                </div>
            </div>
        )
    }
}

export default Content
