//COMPONENT TASK MODAL
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatusTask } from '@/api/TaskApi';
import { RouteParams, TaskStatus } from '@/types/index';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/es';
import NotesPanel from '../notes/NotesPanel';

function TaskModalDetails() {
    //Parametros
    const params = useParams<RouteParams>();
    const projectId = params.projectId!;

    //Navigate
    const navigate = useNavigate();

    //Location
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('viewTask')!;
    const show = taskId ? true : false;

    //Tanstack
    const queryCliente = useQueryClient();

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        retry: false,
        enabled: !!taskId //enable: Ejecución automática // !! validación Booleana directa (true/false)
    });

    const mutation = useMutation({
        mutationFn: updateStatusTask,
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['task', taskId]});
            queryCliente.invalidateQueries({queryKey: ['selectProject', projectId]});

            toast.success(data?.message);
            handleCloseModal();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus;
        const data = {
            projectId,
            taskId,
            status
        }

        mutation.mutate(data);
    }

    //Funciones
    const handleCloseModal = () => {
        navigate('', { replace: true });
    };

    if(isError) {
        /*
        toastId
        Es una clave única que se le puede asignar a cada notificación para:
        -Evitar que se dupliquen
        -Actualizar o cerrar una notificación específica después

        ✔️ Si ya existe un toast activo con ese toastId, no se crea uno nuevo.
        ✔️ Evita que se acumulen mensajes repetidos, porque react-toastify 
        detecta ese toastId y no lanza otra notificación con el mismo.
        */

        /*
        React no permite que ninguna actualización de estado (como toast.*()) deba ocurrir 
        durante el render (como <Navigate />). Solo debe ocurrir en efectos (useEffect o 
        useLayoutEffect) o en este caso retrasar la actualización.
        */
        setTimeout(() => {
            toast.error(error.message, {toastId: 'error'});
        }, 100);
        return <Navigate to={`/projects/${projectId}`} />
    }

    //---VIEW---//
    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => handleCloseModal()}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl 
                                bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>
                                        Agregada el: { formatDate(data.createdAt) }
                                    </p>

                                    <p className='text-sm text-slate-400'>
                                        Última actualización: { formatDate(data.updatedAt) }
                                    </p>

                                    <Dialog.Title as="h3"
                                        className="font-black text-4xl text-slate-600 my-5">
                                        {data.name}
                                    </Dialog.Title>

                                    <p className='text-lg text-slate-500 mb-2'>
                                        Descripción: {data.description}
                                    </p>

                                    {data.completedBy.length ? (
                                        <>
                                            <p className='my-5 font-bold text-2xl text-slate-600'>
                                                Historial de Cambios
                                            </p>

                                            <ul className='list-decimal'>
                                                {data.completedBy.map( (activityLog) => (
                                                    <li key={activityLog._id}>
                                                        <span className='font-bold text-slate-600'>
                                                            {statusTranslations[activityLog.status]} {' '}
                                                        </span>
                                                        &#40; {activityLog.user.name} &#41;
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : null}
                                    
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>
                                            Estado Actual: 
                                        </label>

                                        <select 
                                        className='w-full p-3 border border-gray-300 bg-white'
                                        defaultValue={data.status}
                                        onChange={ handleChange }>
                                            {Object.entries(statusTranslations).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <NotesPanel notes={data.notes} />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default TaskModalDetails;