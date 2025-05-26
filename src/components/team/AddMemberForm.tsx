//COMPONENT MEMBER FORM
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import ErrorMessage from "../ErrorMessage"
import { RouteParams, TeamMemberForm } from "@/types/index"
import { findUserByEmail } from "@/api/TeamApi"
import SearchResult from "./SearchResult"

export default function AddMemberForm() {
    //Params
    const params = useParams<RouteParams>()
    const projectId = params.projectId!

    //Navigate
    const navigate = useNavigate()

    //Tanstack
    const mutation = useMutation({
        mutationFn: findUserByEmail
    });

    //Form
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const handleSearchUser = async (formData : TeamMemberForm) => {
        const data = {
            projectId,
            formData
        }

        mutation.mutate(data);
    }

    const resetData = () => {
        reset();
        mutation.reset();  // Resetea estado de la mutación (status, data, error, isLoanding, IsSuccess, etc...)

        navigate('', { replace: true });
    }

    //---VIEW---//
    return (
        <>
            <form className="mt-10 space-y-5"
            onSubmit={handleSubmit(handleSearchUser)} noValidate>
                <div className="flex flex-col gap-3">
                    <label htmlFor="name" className="font-normal text-2xl">
                        E-mail de Usuario
                    </label>

                    <input
                        id="name"
                        type="text"
                        placeholder="E-mail del usuario a Agregar"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />

                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value='Buscar Usuario'
                />
            </form>

            <div className="mt-10 text-center">
                {mutation.isPending && <p>Cargando...</p>}
                {mutation.isError && <p className="font-bold bg-red-500 text-white">{mutation.error.message}</p>}
                {mutation.data && <SearchResult data={mutation.data} reset={resetData} />}
            </div>
        </>
    )
}