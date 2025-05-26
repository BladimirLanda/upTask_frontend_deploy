//VIEW NEW PASSWORD
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import { ConfirmToken } from "@/types/index";
import { useState } from "react";

function NewPasswordView() {
    //State
    const [token, setToken] = useState<ConfirmToken['token']>('');
    const [isValidToken, setIsValidToken] = useState(false);

    //---VIEW---//
    return (
        <>
            <h1 className="text-5xl font-black text-white">Reestablecer Password</h1>

            <p className="mt-5 text-2xl font-light text-white">
                Ingresa el código que recibiste {''}
                <span className=" text-fuchsia-500 font-bold">por email</span>
            </p>

            {!isValidToken ? 
            <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} /> :
            <NewPasswordForm token={token} />}
        </>
    )
}

export default NewPasswordView;