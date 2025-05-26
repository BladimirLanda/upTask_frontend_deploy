//COMPONENT TASK CARD
import { deleteTask } from "@/api/TaskApi"
import { RouteParams, TaskProject } from "@/types/index"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Fragment } from "react/jsx-runtime"
import { useDraggable } from '@dnd-kit/core';

//Type
type TaskCardProps = {
    task: TaskProject,
    canEdit: boolean
}

function TaskCard( { task, canEdit } : TaskCardProps ) {
    //Parametros
    const params = useParams<RouteParams>();
    const projectId = params.projectId!;

    //Navigate
    const navigate = useNavigate();

    //Location
    const location = useLocation();

    //dnd-kit
    /*
    Elemento "arrastable" (draggable)
    Propiedad	¿Qué hace?
    attributes	Son props que hay que pasarle al elemento HTML para que sea accesible  
                (por ejemplo role, aria- attributes).
    listeners	Son eventos de arrastrar (drag-start, drag-move, drag-end) que se deben 
                asociar al componente interactivo, normalmente con ...listeners en el 
                elemento que dispara el arrastre.
    setNodeRef	Es una referencia (ref) que se conecta con el DOM del elemento draggable 
                para que dnd-kit pueda rastrear su posición. Se usa así: ref={setNodeRef}.
    transform	Es un objeto que representa la posición actual del elemento mientras se 
                arrastra ({ x, y }). Se puede usar para aplicar un style tipo 
                transform: translate(x, y) durante el drag.
    */
    const { attributes, listeners, setNodeRef, transform } = useDraggable( {id: task._id} );

    const style = transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        width: "300px",
        padding: "1.25rem ",
        borderWith: "1px",
        borderColor: "rgb(203 213 225 / var(--tw-border-opacity))",
        backgroundColor: "#FFF",
        display: "flex"
    } : undefined;

    //Tanstack
    const queryCliente = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['selectProject', projectId]})

            toast.success(data?.message);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    //---VIEW---//
    return (
        <li className={`p-5 flex justify-between gap-3 border border-s-teal-500 bg-white hover:shadow-md ${transform && "bg-blue-100 opacity-50"}`}>
            <div className="min-w-0 flex flex-col gap-y-4 cursor-move"
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                style={style}
            >
                <p className="text-xl font-bold text-left text-slate-600" >
                    {task.name}
                </p>
                
                <p className="text-slate-500">
                    {task.description}
                </p>
            </div>

            <div className="flex shrink-0  gap-x-6">
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </Menu.Button>

                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md 
                            bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <Menu.Item>
                                {/*location.pathname = más especifico*/}
                                <button type='button' 
                                className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}>
                                    Ver Tarea
                                </button>
                            </Menu.Item>

                            {canEdit && (
                                <>
                                    <Menu.Item>
                                        <button type='button' 
                                        className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                        onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}> 
                                            Editar Tarea
                                        </button>
                                    </Menu.Item>

                                    <Menu.Item>
                                        <button type='button' 
                                        className='block px-3 py-1 text-sm leading-6 text-red-500'
                                        onClick={() => mutation.mutate({ projectId, taskId: task._id })}>
                                            Eliminar Tarea
                                        </button>
                                    </Menu.Item>
                                </>
                            )}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </li>
    )
}

export default TaskCard;