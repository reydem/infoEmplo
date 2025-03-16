// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Configuration/Configuration.tsx
import { Component } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Input, InputGroup } from '../ui';
import Navegacion from '../custom-ui/Navegacion';
import UserSession from './UserSession';
import VacantesSession from './VacantesSession';


export class Configuration extends Component {



  render() {
    return (
      <div className="flex min-h-full flex-col p-20 bg-slate-300 font-nanum pb-[500px]">
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
        <div className="mx-auto flex w-full max-w-7xl items-start border-4 border-gray-400 rounded-[32px] bg-white">
          <Navegacion />

          {/* Main area */}
          <main className="flex-1 border-l-4 border-gray-400 rounded-tr-[18px] bg-transparent">
            <InputGroup className="flex-1 " >
              <MagnifyingGlassIcon className='ml-5 ' />
              <Input
                name="search"
                aria-label="Search"
                className="border-2 border-gray-400 rounded-lg my-5 mx-5 w-auto max-w-[500px] sm:leading-[0.75rem]" />
              <div className="absolute top-[5px] right-[302px] bg-white text-black font-bold">
                Comunidad
              </div>
              <div className="absolute top-[5px] right-[176px] bg-white text-black font-bold">
                Soporte
              </div>

              <div className="absolute top-[5px] right-[80px] bg-white text-black font-bold">
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
              <div className="absolute top-[5px] right-[4px] bg-white text-black font-bold">
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
           
            <div className="bg-white mx-auto max-w-7xl px-6 lg:px-2 border-t-4 border-gray-400 mb-10">
              <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 px-6 lg:px-8 xl:grid-cols-5">

                {/* Secuion de usuario obtenidos de la base de datos */}
                <UserSession />
                <VacantesSession />

              </div>
            </div>
          </main>
       

        </div>
      </div>
    )
  }
}

export default Configuration
