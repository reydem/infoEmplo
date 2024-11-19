// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Home/Home.tsx
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import Logo from '../../assets/Logo.png';
import { Button, Input, InputGroup } from '../ui';
import EmploymentOffer from '../custom-ui/EmploymentOffer';
import {
  SignalIcon,
  FolderIcon,
  DocumentCheckIcon,
  ChartBarIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';

function Home() {
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
            <img
              alt="Your Company"
              src={Logo}
              className="h-10 w-auto"
            />
            <div>
              <Button color="dark">
                Entrar
              </Button>
            </div>
          </div>
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Button color="white" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
              <SignalIcon aria-hidden="true" className="size-6" />
              Navegacion
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
          {/* Left column area */}
        </aside>
        <main className="flex-1 border-l-4 border-gray-400 bg-white">
          <InputGroup className="flex-1 border-4 border-gray-400" >
            <MagnifyingGlassIcon className='ml-5' />
            <Input name="search" placeholder="Search&hellip;" aria-label="Search" className="border-2 border-gray-400 rounded-lg my-5 mx-5 w-auto max-w-screen-md" />
            <div className="absolute top-[5px] right-[-80px] bg-white text-black font-bold">
              Comunidad
            </div>
            <div className="absolute top-[5px] right-[-150px] bg-white text-black font-bold">
              Soporte
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
          {/* Main area */}

        </main>
        <aside className="sticky top-8 hidden w-44 shrink-0 xl:block  border-4 border-gray-400 mt-20">

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

export default Home
