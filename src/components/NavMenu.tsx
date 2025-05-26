//COMPONENT NAVMENU
import { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, Transition } from '@headlessui/react' //npm i @headlessui/react 
import { Bars3Icon } from '@heroicons/react/20/solid' //npm i @heroicons/react
import { User } from '../types'
import { useQueryClient } from '@tanstack/react-query'

/*
@headlessui/react: https://headlessui.com/react/popover
Es una librería de componentes accesibles y sin estilos predefinidos para React, 
creada por los mismos que hicieron Tailwind CSS. Los componentes ya traen la lógica 
lista (por ejemplo, abrir/cerrar modales, manejar listas desplegables, etc.) pero 
sin estilos, para que puedas darles el diseño que quieras.

@heroicons/react: Es una librería de íconos en SVG para React, también creada por 
los de Tailwind Labs. Incluye íconos outline (líneas) y solid (rellenos) que se pueden 
usar como componentes React.

<Link/>: Es un componente que se usa en lugar de una etiqueta <a> en React para navegar 
entre páginas de tu app sin recargar la página completa. Link usa el sistema de rutas 
de react-router-dom para cambiar de página sin recargar, haciendo la navegación instantánea 
y manteniendo el estado de la app.
*/

//Type
type NavMenuProps = {
    name: User['name']
}

export default function NavMenu( { name } : NavMenuProps ) {
    //Navigate
    const navigate = useNavigate();

    //Tanstack
    const queryCliente = useQueryClient();

    //Functions
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN');
        queryCliente.removeQueries();
        navigate('/auth/login');
    }

    //---VIEW---//
    return (
        <Popover className="relative">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-purple-400">
                <Bars3Icon className='w-8 h-8 text-white' />
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1">
                    <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
                        <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                            <p className='text-center'>Usuario {name}</p>
                            <Link
                            to='/profile'
                            className='block p-2 hover:text-purple-950'>
                                Mi Perfil
                            </Link>

                            <Link
                            to='/'
                            className='block p-2 hover:text-purple-950'>
                                Mis Proyectos
                            </Link>

                            <button
                            className='block p-2 hover:text-purple-950'
                            type='button'
                            onClick={ logout }>
                                Cerrar Sesión
                            </button>
                        </div>
                    </Popover.Panel>
            </Transition>
        </Popover>
    )
}