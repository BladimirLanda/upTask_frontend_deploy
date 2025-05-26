//VIEW CONFIRM ACCOUNT AUTH
import { useState } from "react"
import { Link } from "react-router-dom"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthApi";
import { toast } from "react-toastify";

/*
@chakra-ui/pin-input
Es un componente de Chakra UI (una librería de componentes para React súper 
friendly y accesible) que permite crear un input de PIN o código de verificación, 
de esos donde se ingresan números o letras uno a uno en casillas separadas.
*/
function ConfirmAccountView() {
    //State
    const [token, setToken] = useState<ConfirmToken['token']>('');

    //Tanstack
    const mutation = useMutation({
      mutationFn: confirmAccount,
      onSuccess: (data) => {
          toast.success(data?.message);
      },
      onError: (error) => {
          toast.error(error.message);
      }
    });

    //Handles
    const handleChange = (token : ConfirmToken['token']) => {
      setToken(token);
    }

    const handleComplete = (token : ConfirmToken['token']) => {
      mutation.mutate({ token });
    }

    //---VIEW---//
    return (
      <>
        <h1 className="text-5xl font-black text-white">Confirma Cuenta</h1>

        <p className="text-2xl font-light text-white mt-5">
          Ingresa el código que recibiste {''}
          <span className=" text-fuchsia-500 font-bold">por e-mail</span>
        </p>

        <form className="space-y-8 p-10 bg-white mt-10 rounded-md">
          <label  className="font-normal text-2xl text-center block">
            Código de 6 dígitos
          </label>
          
          <div className="flex justify-center gap-5">
            <PinInput value={token} onChange={ handleChange } onComplete={ handleComplete }>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border border-gray-300 placeholder-white text-center" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border border-gray-300 placeholder-white text-center" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border border-gray-300 placeholder-white text-center" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border border-gray-300 placeholder-white text-center" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border border-gray-300 placeholder-white text-center" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border border-gray-300 placeholder-white text-center" />
            </PinInput>
          </div>
        </form>

        <nav className="mt-10 flex flex-col space-y-4">
          <Link to='/auth/request-code' className="text-center text-gray-300 font-normal">
            Solicitar un nuevo Código
          </Link>
        </nav>
      </>
    )
}

export default ConfirmAccountView;