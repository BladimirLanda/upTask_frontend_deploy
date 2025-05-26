//COMPONENT ADD TASKS
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { RouteParams, TaskFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@/api/TaskApi';
import { toast } from 'react-toastify';

/*
useLocation(): Es un hook de react-router-dom que permite acceder 
al objeto location actual del navegador. Ese objeto contiene información 
sobre la URL actual, por ejemplo:
{
  pathname: "/tareas",
  search: "?newTask=true",
  hash: "",
  state: null,
  key: "abc123"
}
  -location.search contiene la query string completa de la URL, es decir, 
  todo lo que está después de ?.

URLSearchParams: Instancia de admistración del query string
    -.get(): Método de obtención del valor de algún parámetro ?.
    Si en la URL está ?newTask=true, entonces modalTask tendrá el valor "true".
    Si no existe, será null.

navigate('', { replace: true })
    -Navegar a la ruta actual sin query params (porque se pasa '', o sea, vacía).
    -El { replace: true } hace que en lugar de agregar una nueva entrada al historial 
    del navegador, reemplace la entrada actual.
*/
function AddTaskModal() {
    //Parametros
    const params = useParams<RouteParams>();
    const projectId = params.projectId!;

    //Navigate
    const navigate = useNavigate();

    //Location
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalTask = queryParams.get('newTask');
    const show = modalTask ? true : false;

    //Tanstack
    const queryCliente = useQueryClient();

    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['selectProject', projectId]});

            toast.success(data?.message);
            handleCloseModal();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    //Form
    const initialValues : TaskFormData = {
        name: "",
        description: ""
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm( {defaultValues: initialValues} );

    const handleFormTask = (formData : TaskFormData) => {
        const data = {
            formData,
            projectId
        }
        mutation.mutate(data);
    }

    const handleCloseModal = () => {
        navigate('', { replace: true });
        reset();
    };

    //---VIEW---//
    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
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
                                leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden 
                                rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5">
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    <form className='mt-10 space-y-3' 
                                    onSubmit={ handleSubmit(handleFormTask) } noValidate>

                                        <TaskForm register={register} errors={errors} />

                                        <input 
                                        type="submit" 
                                        value="Guardar Tarea"
                                        className="w-full p-3 uppercase font-bold cursor-pointer 
                                        text-white bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors"
                                        />
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default AddTaskModal;