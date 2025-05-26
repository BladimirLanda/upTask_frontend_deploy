//VIEW CREATE PROJECT
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form" //npm i react-hook-form
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectApi"

/*
useForm: Es una librería para manejar formularios en React de forma sencilla, eficiente y sin tanto código.
Se basa en hooks de React para controlar los inputs, validar, obtener datos y manejar envíos de formularios.

initialValues: Un objeto con los valores iniciales del formulario. Cada propiedad representa 
un input del formulario y su valor inicial.

useForm(): Hook de react-hook-form para inicializar y controlar un formulario.

{defaultValues: initialValues}: Establece los valores iniciales de los inputs.

register: Conecta el input con react-hook-form.

handleSubmit: Gestiona la validación y el envío. En este caso gestiona el evento onSubmit.
    -Valida el formulario.
    -Si todo está bien, ejecuta handleSubmit(data).
    -Si hay errores, los guarda en formState.errors y no llama a handleForm.
    -Evita el uso de e.preventDefault() y validaciones manuales.

formState.errors: Contiene los errores de validación.

data: Contiene todos los valores del formulario.

noValidate: Atributo del formulario HTML que desactiva la validación nativa del navegador.

useNavigate: Es un hook de React Router (a partir de la versión 6) que permite navegar 
programáticamente entre rutas dentro de tu aplicación React.
Lo usas cuando se requiere redirigir al usuario a otra página desde una función JavaScript.
    -{ replace: true }: reemplaza la ruta actual en el historial del navegador 
    (como un redirect sin permitir volver con el botón de "atrás").
*/

/*
useMutation(): es un hook de TanStack Query para manejar acciones que modifican datos 
en el servidor: crear, actualizar o eliminar recursos.
A diferencia de useQuery (que es para obtener datos), useMutation se usa 
para enviar datos y manejar el resultado de esa operación.
    -mutationFn → función encargada de realizar la petición (en este caso, createProject).
    -onSuccess → función callback que se ejecuta si la mutation se resuelve correctamente.
    -onError → callback para manejar errores en caso de fallo.
    -mutation.mutateAsync() → ejecuta la mutation de forma asíncrona y permite 
    esperar su resultado con await utilizando try/catch. Se usa cuando se desea controlar 
    el flujo asíncrono con try/catch o cuando se quiere esperar a que termine la mutación antes 
    de continuar.
    -mutation.mutate() → ejecuta la mutation de forma asíncrona, pero no retorna una promesa. 
    En su lugar, recibe callbacks onSuccess y onError ya definidos en la configuración de 
    useMutation. Se usa cuando no se necesita esperar el resultado como una promesa o 
    integrarlo en una función async/await.

    Método	        Tipo	    ¿Por qué?
    mutate()	    Asíncrono	Internamente dispara la mutación de forma asíncrona (usa promesas), 
                                pero no devuelve una promesa que se pueda await. Por eso, se manejan 
                                resultados con callbacks (onSuccess, onError). 
                                (asíncrono pero sin promesa controlable)
    mutateAsync()	Asíncrono	También dispara la mutación de forma asíncrona, pero sí devuelve una 
                                promesa. Por eso se puede await y usar en try/catch, lo que permite 
                                escribir código con flujo controlado.
                                (asíncrono y controlable)
*/
function CreateProjectView() {
    //Navigate
    const navigate = useNavigate();

    //Tanstack
    const mutation = useMutation({
        mutationFn: createProject,
        onSuccess: (data) => {
            toast.success(data?.message);
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    //Form
    const initialValues : ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }
    const { register, handleSubmit, formState: { errors } } = useForm( {defaultValues: initialValues} );

    const handleForm = (formData : ProjectFormData) => {
        mutation.mutate(formData);
    }

    //---VIEW---//
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">
                    Crear Proyecto
                </h1>

                <p className="mt-5 text-2xl font-light text-gray-500">
                    Llena el formulario para crear un nuevo proyecto
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

                    <ProjectForm  register={register} errors={errors} />

                    <input 
                    type="submit" 
                    value="Crear Proyecto"
                    className="w-full p-3 uppercase font-bold cursor-pointer 
                    text-white bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors"
                    />
                </form>
            </div>
        </>
    )
}

export default CreateProjectView