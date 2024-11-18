// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Home/Home.tsx
import Logo from '../../assets/Logo.png';
import { Button } from '../ui';


function Home() {
  return (
    <div className="flex min-h-full flex-col">


      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8 border-dashed border-2 border-sky-500">
        <aside className="sticky top-8 hidden w-64 shrink-0 lg:block border-dashed border-2 border-sky-500">
          <header className="shrink-0 border-b border-gray-200 bg-white">
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
          </header>
          <h3>Navegacion</h3>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </div>
          {/* Left column area */}


        </aside>

        <main className="flex-1 border-dashed border-2 border-sky-500">{/* Main area */}</main>

        <aside className="sticky top-8 hidden w-44 shrink-0 xl:block border-dashed border-2 border-sky-500">{/* Right column area */}</aside>
      </div>
    </div>
  )
}

export default Home
