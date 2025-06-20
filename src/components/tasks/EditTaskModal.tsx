//COMPONENT TASK EDIT
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteParams, Task, TaskFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '@/api/TaskApi';
import { toast } from 'react-toastify';

//Type
type EditTaskModalProps = {
    data: Task,
    taskId: Task['_id']
}

function EditTaskModal( { data, taskId } : EditTaskModalProps ) {
    //Parametros
    const params = useParams<RouteParams>();
    const projectId = params.projectId!;

    //Navigate
    const navigate = useNavigate();

    //Tanstack
    const queryCliente = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateTask,
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['task', taskId]});
            queryCliente.invalidateQueries({queryKey: ['selectProject', projectId]})

            toast.success(data?.message);
            handleCloseModal();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    //Form
    const initialValues : TaskFormData = {
        name: data.name,
        description: data.description
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm( {defaultValues: initialValues} );

    const handleEditTask = (formData : TaskFormData) => {
        const data = {
            projectId,
            taskId,
            formData
        }
        mutation.mutate(data);
    }

    const handleCloseModal = () => {
        navigate('', { replace: true });
        reset();
    };

    //---VIEW---//
    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => handleCloseModal() }>
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
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden 
                            rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-4xl  my-5">
                                    Editar Tarea
                                </Dialog.Title>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-fuchsia-600">este formulario</span>
                                </p>

                                <form className="mt-10 space-y-3" 
                                onSubmit={ handleSubmit(handleEditTask) } noValidate>

                                    <TaskForm register={register} errors={errors} />

                                    <input
                                        type="submit"
                                        className="p-3 w-full bg-fuchsia-600 hover:bg-fuchsia-700 
                                        text-white font-black text-xl cursor-pointer"
                                        value='Guardar Tarea'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default EditTaskModal;