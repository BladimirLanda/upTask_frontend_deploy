//VIEW REGISTER AUTH
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { UserRegistrationForm } from "@/types/index"
import ErrorMessage from "@/components/ErrorMessage"
import { createAccount } from "@/api/AuthApi"

/*
watch - usReact Hook Form
Es una función que permite "observar" el valor actual de uno o varios campos 
del formulario en tiempo real, incluso sin enviar el formulario.

    'const password = watch('password');'
    -Se está obteniendo en tiempo real el valor del campo password
    -Este valor se actualiza automáticamente conforme el usuario escribe

Usos comunes:
    1) Validaciones cruzadas (como comparar password con password-confirmation)
    2) Mostrar/Ocultar inputs condicionalmente (Ejemplo: mostrar campo de empresa si userType === 'empresa')
    3) Cambiar estilos o mensajes dinámicamente

Otros métodos:
    -Observar todo el formulario
        const allValues = watch();
    -Varios campos
        const [email, password] = watch(['email', 'password']);

validate 
Es una función de validación personalizada que puedes agregar a cualquier 
campo registrado con register. Se ejecuta cuando el formulario se envía o cuando 
el campo cambia (según la configuración), y devuelve:
    1) true → si la validación pasa
    2) un string → si la validación falla (y ese string se usa como mensaje de error)

Ej.
    {...register("campo", {
        validate: value => value === "esperado" || "Mensaje de error"
    })}
*/
function RegisterView() {
    //Tanstack
    const mutation = useMutation({
        mutationFn: createAccount,
        onSuccess: (data) => {
            toast.success(data?.message);
            reset();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    //Form
    const initialValues: UserRegistrationForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

    const password = watch('password');

    const handleRegister = (formData: UserRegistrationForm) => {
        mutation.mutate(formData);
    }

    //---VIEW---//
    return (
        <>
            <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>

            <p className="mt-5 text-2xl font-light text-white">
                Llena el formulario para {''}
                <span className=" text-fuchsia-500 font-bold">crear tu cuenta</span>
            </p>

            <form
            className="space-y-8 p-10  bg-white mt-10"
            onSubmit={ handleSubmit(handleRegister) } noValidate>
                <div className="flex flex-col gap-5">
                    <label htmlFor="email" className="font-normal text-2xl">
                        Email
                    </label>

                    <input
                        type="email"
                        id="email"
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

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">
                        Nombre
                    </label>

                    <input
                        type="name"
                        placeholder="Nombre de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("name", {
                            required: "El Nombre de usuario es obligatorio",
                        })}
                    />

                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

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
                    value='Registrarme'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 
                    text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link to={'/auth/login'} className="text-center text-gray-300 font-normal">
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>

                <Link to={'/auth/forgot-password'} className="text-center text-gray-300 font-normal">
                    ¿Olvidaste la contraseña? Reestablecer
                </Link>
            </nav>
        </>
    )
}

export default RegisterView;