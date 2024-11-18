// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Home/Home.tsx
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { SignalIcon, FolderIcon, DocumentCheckIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Logo from '../../assets/Logo.png';
import { Button, Input, InputGroup } from '../ui';
import EmploymentOffer from '../custom-ui/EmploymentOffer';


function Home() {
  return (
    <div className="flex min-h-full flex-col">
      {/* <header className="shrink-0 border-b border-gray-200 bg-white">
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
      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8 border-dashed border-2 border-sky-500">
        <aside className="sticky top-8 hidden w-64 shrink-0 lg:block border-dashed border-2 border-sky-500">
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
        <main className="flex-1 border-dashed border-2 border-sky-500">
          <InputGroup >
            <MagnifyingGlassIcon />
            <Input name="search" placeholder="Search&hellip;" aria-label="Search" />
          </InputGroup>
          <EmploymentOffer
            buttonText="Ver empleo disponible"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          />
          {/* Main area */}

        </main>
        <aside className="sticky top-8 hidden w-44 shrink-0 xl:block border-dashed border-2 border-sky-500">{/* Right column area */}</aside>
      </div>
    </div>
  )
}

export default Home
