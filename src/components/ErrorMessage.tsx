//COMPONENT ERROR MESSAGE
import { ReactNode } from "react"

//Type
type ErrorMessageType = {
    children: ReactNode
}

function ErrorMessage( { children } : ErrorMessageType ) {

    //---VIEW---//
    return (
        <div className="my-4 text-center font-bold uppercase text-sm bg-red-100 text-red-600">
            {children}
        </div>
    )
}

export default ErrorMessage