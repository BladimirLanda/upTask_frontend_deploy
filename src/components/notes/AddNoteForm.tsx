//COMPONENT NOTE FOMR
import { NoteFormData, RouteParams } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/api/NoteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

function AddNoteForm() {
    //Params
    const params = useParams<RouteParams>();
    const projectId = params.projectId!;

    //Location
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('viewTask')!;

    //Tanstack
    const queryCliente = useQueryClient();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['task', taskId]});
            
            toast.success(data?.message);
            reset();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    //Form
    const initialValues: NoteFormData = {
        content: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    
    const handleAddNote = (formData : NoteFormData) => {
        const data = {
            projectId,
            taskId,
            formData
        }

        mutation.mutate(data);
    }

    //---VIEW---//
    return (
        <form className="space-y-3" 
        onSubmit={handleSubmit(handleAddNote)} noValidate
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="content" className="font-bold">
                    Crear nota
                </label>

                <input 
                type="text" 
                id="content"
                placeholder="Contenido de la Nota"
                className="w-full p-3 border border-gray-300"
                {...register("content", {
                    required: "El Contenido de la nota es obligatorio",
                })}
                />

                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>

            <input 
            type="submit" 
            value="Crear Nota"
            className="w-full p-2 font-black text-white bg-fuchsia-600 cursor-pointer hover:bg-fuchsia-700"
            />
        </form>
    )
}

export default AddNoteForm