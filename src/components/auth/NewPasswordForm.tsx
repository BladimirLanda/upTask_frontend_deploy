//COMPONENT NEW PASSWORD FORM
import type { ConfirmToken, NewPasswordForm } from "../../types"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { updatePasswordWithToken } from "@/api/AuthApi"

//Type
type NewPasswordFormProps = {
    token: ConfirmToken['token']
}

function NewPasswordForm( { token } : NewPasswordFormProps ) {
    //Navigate
    const navigate = useNavigate();

    //Tanstack
    const mutation = useMutation({
        mutationFn: updatePasswordWithToken,
        onSuccess: (data) => {
            toast.success(data?.message);
            reset();
            navigate('/auth/login');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    //Form
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const password = watch('password');

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData,
            token
        }
        mutation.mutate(data);
    }

    //---VIEW---//
    return (
        <>
            <form className="space-y-8 p-10  bg-white mt-10"
                onSubmit={handleSubmit(handleNewPassword)} noValidate>
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "El Password es obligatorio",
                            minLength: {
                                value: 8,
                                message: 'El Password debe ser mínimo de 8 caracteres'
                            }
                        })}
                    />

                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">
                        Repetir Password
                    </label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password_confirmation", {
                            required: "Repetir Password es obligatorio",
                            validate: value => value === password || 'Los Passwords no son iguales'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Establecer Password'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 
                    text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}

export default NewPasswordForm;