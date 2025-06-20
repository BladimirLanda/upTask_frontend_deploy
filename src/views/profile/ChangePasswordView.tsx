//VIEW CHANGE PASSWORD
import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import { UpdatePasswordForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { changePassword } from "@/api/ProfileApi";

function ChangePasswordView() {
    //Tanstack
    const mutation = useMutation({
        mutationFn: changePassword,
        onSuccess: (data) => {
            toast.success(data?.message);
            reset();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    //Form
    const initialValues : UpdatePasswordForm = {
        current_password: '',
        password: '',
        password_confirmation: ''
    }

    const { register, handleSubmit, reset ,watch, formState: { errors } } = useForm({ defaultValues: initialValues })

    const password = watch('password');

    const handleChangePassword = (formData : UpdatePasswordForm) => { 
        mutation.mutate(formData);
    }

    return (
        <>
            <div className="mx-auto max-w-3xl">
                <h1 className="text-5xl font-black ">Cambiar Password</h1>

                <p className="text-2xl font-light text-gray-500 mt-5">
                    Utiliza este formulario para cambiar tu password
                </p>

                <form className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
                onSubmit={handleSubmit(handleChangePassword)} noValidate>
                <div className="mb-5 space-y-3">
                    <label 
                    htmlFor="current_password"
                    className="text-sm uppercase font-bold">
                        Password Actual
                    </label>

                    <input
                        id="current_password"
                        type="password"
                        placeholder="Password Actual"
                        className="w-full p-3 border border-gray-200"
                        {...register("current_password", {
                            required: "El password actual es obligatorio",
                        })}
                    />

                    {errors.current_password && (
                        <ErrorMessage>{errors.current_password.message}</ErrorMessage>
                    )}
                </div>

                <div className="mb-5 space-y-3">
                    <label
                    htmlFor="password"
                    className="text-sm uppercase font-bold">
                        Nuevo Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        placeholder="Nuevo Password"
                        className="w-full p-3  border border-gray-200"
                        {...register("password", {
                            required: "El Nuevo Password es obligatorio",
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

                <div className="mb-5 space-y-3">
                    <label
                    htmlFor="password_confirmation"
                    className="text-sm uppercase font-bold">
                        Repetir Password
                    </label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="w-full p-3  border border-gray-200"
                        {...register("password_confirmation", {
                            required: "Este campo es obligatorio",
                            validate: value => value === password || 'Los Passwords no son iguales'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Cambiar Password'
                    className="bg-fuchsia-600 w-full p-3 text-white uppercase 
                    font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                />
                </form>
            </div>
        </>
    )
}

export default ChangePasswordView;