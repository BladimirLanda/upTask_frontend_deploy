//VIEW PROJECT TEAM
import { getProjectTeam, removeUserFromProject } from "@/api/TeamApi";
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { Fragment } from "react/jsx-runtime"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import AddMemberModal from "@/components/team/AddModalMember"
import { toast } from "react-toastify";
import { RouteParams } from "@/types/index";

function ProjectTeamView() {
    //Params
    const params = useParams<RouteParams>();
    const projectId = params.projectId!;

    //Navigate
    const navigate = useNavigate()

    //Tanstack
    const queryCliente = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['projectTeam', projectId],
        queryFn: () => getProjectTeam(projectId),
        retry: false
    });

    const { mutate } = useMutation({
    mutationFn: removeUserFromProject,
    onSuccess: (data) => {
        queryCliente.invalidateQueries({queryKey: ['projectTeam', projectId]});

        toast.success(data?.message);
    },
    onError: (error) => {
        toast.error(error.message);
    }
    });


    if(isLoading) return 'Cargando...';
    if(isError) return <Navigate to='/404' />;

    //---VIEW---//
    if(data) return (
        <>
        <h1 className="text-5xl font-black">
            Administrar Equipo
        </h1>

        <p className="mt-5 text-2xl font-light text-gray-500">
            Administra el equipo de trabajo para el proyecto
        </p>

        <nav className="my-5 flex flex-col sm:flex-row gap-3">
            <button type="button" 
            className="px-10 py-3 text-white text-xl cursor-pointer text-center 
            bg-purple-400 hover:bg-purple-500 transition-colors"
            onClick={() => navigate('?addMember=true')}>
                Agregar Colaborador
            </button>

            <Link to={`/projects/${projectId}`} className="px-10 py-3 text-white text-xl cursor-pointer 
            text-center bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors">
                Volver a Proyecto
            </Link>
        </nav>

        <h2 className="text-5xl font-black my-10">Miembros actuales</h2>

        {data.project_team.length ? (
            <ul role="list" className="mt-10 divide-y border shadow-lg divide-gray-100 border-gray-100 bg-white">
                {data.project_team.map((member) => (
                    <li key={member._id} className="px-5 py-10 flex justify-between gap-x-6">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto space-y-2">
                                <p className="text-2xl font-black text-gray-600">
                                    {member.name}
                                </p>

                                <p className="text-sm text-gray-400">
                                    {member.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-x-6">
                            <Menu as="div" className="relative flex-none">
                                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                        <span className="sr-only">opciones</span>
                                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                </Menu.Button>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                        <Menu.Item>
                                            <button
                                            type='button'
                                            className='block px-3 py-1 text-sm leading-6 text-red-500'
                                            onClick={() => mutate( {projectId, id: member._id  } )}
                                            >
                                                Eliminar del Proyecto
                                            </button>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className='text-center py-20'>No hay miembros en este equipo</p>
        )}

        <AddMemberModal />
        </>
    )
}

export default ProjectTeamView