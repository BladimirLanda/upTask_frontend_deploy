//VIEW FORGOT PASSWORD
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { ForgotPasswordForm } from "../../types"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/AuthApi";
import { toast } from "react-toastify";

function ForgotPasswordView() {
    //Tanstack
    const mutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: (data) => {
            toast.success(data?.message);
            reset();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    //Form
    const initialValues: ForgotPasswordForm = {
        email: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
    
    const handleForgotPassword = (formData: ForgotPasswordForm) => {
        mutation.mutate(formData);
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Reestablecer Password</h1>

            <p className="mt-5 text-2xl font-light text-white">
                ¿Olvidaste tu password? Coloca tu email y {''}
                <span className=" text-fuchsia-500 font-bold">recibe instrucciones</span>
            </p>

            <form className="space-y-8 p-10 mt-10 bg-white"
            onSubmit={ handleSubmit(handleForgotPassword) } noValidate>
                <div className="flex flex-col gap-5">
                <label htmlFor="email" className="font-normal text-2xl">
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full p-3  border-gray-300 border"
                    {...register("email", {
                    required: "El Email de registro es obligatorio",
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
                    value='Enviar Instrucciones'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black 
                    text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link to={'/auth/register'} className="text-center text-gray-300 font-normal">
                    ¿No tienes cuenta? Crear una
                </Link>

                <Link to={'/auth/login'} className="text-center text-gray-300 font-normal">
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>
            </nav>
        </>
    )
}

export default ForgotPasswordView;