//COMPONENT EDIT PROJECT FORM
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { updateProject } from '@/api/ProjectApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Project, ProjectFormData } from '@/types/index'
import ProjectForm from './ProjectForm'

//Type
type EditProjectFormProps = {
    data: ProjectFormData,
    projectId: Project['_id'];
}

/*
useQueryClient(): Es un hook de React Query (TanStack Query) que permite acceder 
al QueryClient desde cualquier componente o hook personalizado.}
El QueryClient es el motor central de React Query:
    -Maneja la caché
    -Administra las queries, mutations y su estado
    -Permite invalidar, refetch, resetear o actualizar queries manualmente

.invalidateQueries(): “Marca como obsoleta cualquier query que tenga la key ['key'] en caché”.
    -No borra la cache inmediatamente.
    -La próxima vez que se renderice un componente que usa esa query, o cuando se haga un 
    refetch automático/manual, se volverá a ejecutar queryFn para obtener datos frescos.

-Otros:
.refetchQueries(): Forza un refetch inmediato de las queries que coinciden con la key
.removeQueries(): Elimina queries de la caché (las borra)
.resetQueries(): Resetea su estado a idle y borra data/error
*/
function EditProjectForm( { data, projectId } : EditProjectFormProps ) {
    //Navigate
    const navigate = useNavigate();

    //Tanstack
    const queryCliente = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateProject,
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['projects']});
            queryCliente.invalidateQueries({queryKey: ['editProject', projectId]});

            toast.success(data?.message);
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    //Form
    const initialValues : ProjectFormData = {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }
    const { register, handleSubmit, formState: { errors } } = useForm( {defaultValues: initialValues} );

    const handleForm = (formData : ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutation.mutate(data);
    }

    //---VIEW---//
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">
                    Editar Proyecto
                </h1>

                <p className="mt-5 text-2xl font-light text-gray-500">
                    Llena el formulario para editar el proyecto
                </p>

                <nav className="my-5">
                    <Link  to='/' className="px-10 py-3 text-xl font-bold cursor-pointer 
                    text-white bg-purple-400 hover:bg-purple-500 transition-colors">
                        Volver a Proyectos
                    </Link>
                </nav>

                <form 
                className="p-10 mt-10 shadow-lg rounded-lg bg-white"
                onSubmit={ handleSubmit(handleForm) } noValidate> {/*data => handleForm(data)*/}

                    <ProjectForm register={register} errors={errors} />

                    <input 
                    type="submit" 
                    value="Guardar Cambios"
                    className="w-full p-3 uppercase font-bold cursor-pointer 
                    text-white bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors"
                    />
                </form>
            </div>
        </>
    )
}

export default EditProjectForm