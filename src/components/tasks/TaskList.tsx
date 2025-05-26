//COMPONENT TASK LIST
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { Project, RouteParams, TaskProject, TaskStatus } from "@/types/index"
import TaskCard from "./TaskCard"
import { statusTranslations } from "@/locales/es"
import DropTask from "./DropTask"
import { toast } from "react-toastify"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateStatusTask } from "@/api/TaskApi"
import { useParams } from "react-router-dom"

/*
dnd-kit
-DndContext
Es un componente proveedor (provider) de React que encierra toda la zona 
donde se usarán funcionalidades de drag & drop.
Proporciona el contexto necesario a los componentes hijos (useDraggable, 
useDroppable, etc.) para que puedan comunicarse entre sí, saber cuándo 
empieza un drag, cuándo termina, qué elemento está siendo arrastrado, 
y qué droppables hay disponibles.
*/

//Type
type TaskListProp = {
    tasks: TaskProject[],
    canEdit: boolean
}

type StatusGroups = {
    [key: string] : TaskProject[]
}

//Valores Iniciales
const initialStatusGroups : StatusGroups = {
    pending: [],
    on_hold: [],
    inProgress: [],
    underReview: [],
    completed: []
}

const statusStyles : { [key : string] : string } = {
    pending: 'border-t-slate-500',
    on_hold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500'
}

/*
structuredClone: Es una función nativa de JavaScript que permite clonar profundamente un valor.
✔️ Clona objetos, arreglos, mapas, sets, fechas, blobs, ArrayBuffers, e incluso objetos anidados.
✔️ Copia todos los niveles de anidamiento (deep clone).
✔️ No mantiene referencias compartidas entre el original y la copia
*/
function TaskList( { tasks, canEdit } : TaskListProp ) {
    //Parametros
    const params = useParams<RouteParams>();
    const projectId = params.projectId!;

    //Tanstack
    const queryCliente = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateStatusTask,
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['selectProject', projectId]});

            toast.success(data?.message);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    //Handles (dnd-kit)
    const handleDragEnd = (e : DragEndEvent) => {
        const { over, active } = e;

        if(over && over.id) {
            const taskId = active.id.toString();
            const status = over.id as TaskStatus;

            mutation.mutate( {projectId, taskId, status} );

            /*
            .setQueryData([query en caché], callback(Data Previa))
            Es un método de queryClient que permite actualizar directamente los datos 
            almacenados en caché para una query específica, sin necesidad de hacer 
            una petición al servidor.
            */
            queryCliente.setQueryData(['selectProject', projectId], (prevData : Project) => {
                 // se actualiza el status de una tarea específica en prevData.tasks
                const updatedTask = prevData.tasks.map((task) => {
                    if(task._id === taskId) {
                        return {
                            ...task,
                            status
                        }
                    }
                    return task;
                });

                // se regresa el nuevo objeto con tasks actualizado
                return {
                    ...prevData,
                    tasks: updatedTask
                }
            });
        }
    }

    //Lógica
    const groupedTasks = tasks.reduce((acc, task) => {        
        acc[task.status].push(task);
        return acc;
    }, structuredClone(initialStatusGroups));

    //---VIEW---//
    return (
        <>
            <h2 className="my-10 text-5xl font-black">
                Tareas
            </h2>

            <div className='pb-28 flex gap-5 overflow-x-scroll 2xl:overflow-auto'>
                <DndContext onDragEnd={handleDragEnd}>
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                            <h3 className={`p-3 border-t-8 capitalize text-xl font-light border 
                                border-slate-300 bg-white ${statusStyles[status]}`}>
                                {statusTranslations[status]}
                            </h3>

                            <DropTask status={status} />

                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="pt-3 text-gray-500 text-center">No Hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </>
    )
}

export default TaskList