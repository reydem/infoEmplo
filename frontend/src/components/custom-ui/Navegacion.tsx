
import Logo from '../../assets/Logo.png';
import { Button } from '../ui';
import { Link } from 'react-router-dom';
import {
    UserIcon,
    LockClosedIcon,
    Cog8ToothIcon,
    BellAlertIcon
} from '@heroicons/react/24/outline';
function Navegacion() {
  return (
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
                            <Link to={'/configuration'}>
                                <Button color="white" className="-m-2.5 p-2.5 text-black">
                                    <UserIcon
                                        aria-hidden="true"
                                        className="w-6 h-6 font-bold"
                                        strokeWidth={2.5} // Ajusta el grosor del trazo
                                    />
                                    Información personal
                                </Button>
                            </Link>
                        </div>
                        <div className="flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                            <Link to={'/security'}>
                                <Button color="white" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
                                    <LockClosedIcon aria-hidden="true" className="size-6" />
                                    <p className='leading-tight text-left'>
                                        Inicio de sesión y seguridad
                                    </p>
                                </Button>
                            </Link>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <Link to={'/preferences'}>
                                <Button color="white" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
                                    <Cog8ToothIcon aria-hidden="true" className="size-6" />
                                    Preferencias
                                </Button>
                            </Link>
                        </div>
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <Link to={'/notifications'}>
                                <Button color="white" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
                                    <BellAlertIcon aria-hidden="true" className="size-6" />
                                    Notificaciones
                                </Button>
                            </Link>
                        </div>
                        {/* Left column area */}
                    </aside>
  )
}

export default Navegacion
