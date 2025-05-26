//COMPONENT NEW PASSWORD TOKEN
import { validateToken } from '@/api/AuthApi'
import { ConfirmToken } from '@/types/index'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from '@tanstack/react-query'
import { Dispatch } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

//Type
type NewPasswordTokenProps = {
    token: ConfirmToken['token'],
    setToken: Dispatch<React.SetStateAction<string>>
    setIsValidToken : Dispatch<React.SetStateAction<boolean>>
}

function NewPasswordToken( { token, setToken, setIsValidToken } : NewPasswordTokenProps ) {
    //Tanstack
    const mutation = useMutation({
        mutationFn: validateToken,
        onSuccess: (data) => {
            toast.success(data?.message);
            setIsValidToken(true);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    //Handles
    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token);
    }
    const handleComplete = (token: ConfirmToken['token']) => {
        mutation.mutate({ token });
    }

    //---VIEW---//
    return (
        <>
            <form className="space-y-8 p-10 rounded-lg bg-white mt-10">
                <label className="font-normal text-2xl text-center block">
                    Código de 6 dígitos
                </label>

                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
                    </PinInput>
                </div>
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link to='/auth/forgot-password' className="text-center text-gray-300 font-normal">
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    )
}

export default NewPasswordToken;