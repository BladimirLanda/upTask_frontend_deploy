//VIEW DASHBOARD
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjects } from "@/api/ProjectApi";
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/policies'
import DeleteProjectModal from '@/components/projects/DeleteProjectModal'

/*
useQuery(): es un hook de TanStack Query utilizado para leer datos desde un 
servidor remoto (generalmente una API).
    -Obtener los datos
    -Manejar estado de carga (isLoading)
    -Gestionar errores
    -Mantener una cache de las respuestas
    -Gestión de estado. Todo esto sin necesidad de useState ni useEffect manuales.

queryKey: Identificador único para esta query en el cache. Debe ser un arreglo. 
Aquí se usa ['projects'] como clave.

queryFn: Función que ejecuta la petición para obtener los datos. Debe retornar una promesa. 
En este caso, getProjects es la función que hace el fetch.

{ data, isLoading }: Variables expuestas por useQuery:
    -data: contiene la respuesta de la petición cuando se resuelve.
    -isLoading: indica si la petición está en curso.
*/
function DashboardView() {
    //Navigate
    const navigate = useNavigate();

    //Location
    const location = useLocation();

    //Tanstack
    const { data: user, isLoading: authLoading } = useAuth(); //':' Renombración

    const { data, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects
    });

    if(isLoading && authLoading) return 'Cargando...';

    //---VIEW---//
    if(data && user) return (
        <>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-black">
                    Mis Proyectos
                </h1>

                <p className="mt-5 text-2xl font-light text-gray-500">
                    Maneja y administra tus proyectos
                </p>

                <nav className="my-5">
                    <Link to='/projects/create' className="px-10 py-3 text-xl font-bold cursor-pointer 
                    text-white bg-purple-400 hover:bg-purple-500 transition-colors">
                        Nuevo Proyecto
                    </Link>
                </nav>

                {data.length ? (
                    <ul role="list" className="mt-10 shadow-lg divide-y divide-gray-100 border 
                    border-gray-100 bg-white">
                        {data.map((project) => (
                            <li key={project._id} className="px-5 py-10 flex justify-between">
                                <div className="flex-auto space-y-2">
                                    <div className='mb-2'>
                                        {
                                            isManager(project.manager, user._id) ? 
                                            <p className='py-1 px-5 border-2 font-bold text-xs uppercase bg-indigo-50 
                                            text-indigo-500 border-indigo-500 rounded-lg inline-block'>
                                                Manager
                                            </p> :
                                            <p className='py-1 px-5 border-2 font-bold text-xs uppercase bg-green-50 
                                            text-green-500 border-green-500 rounded-lg inline-block'>
                                                Colaborador
                                            </p>
                                        }
                                    </div>

                                    <Link to={`/projects/${project._id}`}
                                    className="text-3xl font-bold text-gray-600 cursor-pointer 
                                    hover:underline">
                                        {project.projectName}
                                    </Link>

                                    <p className="text-sm text-gray-400">
                                        Cliente: {project.clientName}
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        {project.description}
                                    </p>
                                </div>
                                
                                <div className="shrink-0 flex items-center">
                                    <Menu as="div" className="relative flex-none">
                                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                            <span className="sr-only">opciones</span>
                                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                        </Menu.Button>

                                        <Transition as={Fragment} enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95">
                                            <Menu.Items
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right 
                                            rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 
                                            focus:outline-none">
                                                <Menu.Item>
                                                    <Link to={`/projects/${project._id}`}
                                                    className='block px-3 py-1 text-sm leading-6 
                                                    text-gray-900 hover:drop-shadow-sm'>
                                                        Ver Proyecto
                                                    </Link>
                                                </Menu.Item>

                                                {isManager(project.manager, user._id) && (
                                                    <>
                                                        <Menu.Item>
                                                            <Link to={`/projects/${project._id}/edit`}
                                                            className='block px-3 py-1 text-sm leading-6
                                                            text-gray-900 hover:drop-shadow-sm'>
                                                                Editar Proyecto
                                                            </Link>
                                                        </Menu.Item>

                                                        <Menu.Item>
                                                            <button 
                                                            type='button' 
                                                            className='block px-3 py-1 text-sm leading-6 
                                                            text-red-500 hover:drop-shadow-sm'
                                                            onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}>
                                                                Eliminar Proyecto
                                                            </button>
                                                        </Menu.Item>
                                                    </>
                                                )}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="py-20 text-center">
                        No hay proyectos aún {''}
                        <Link to='/projects/create' className="font-bold text-fuchsia-500">
                            Crear Proyecto
                        </Link>
                    </p>
                )}
            </div>

            <DeleteProjectModal />
        </>
    )
}

export default DashboardView