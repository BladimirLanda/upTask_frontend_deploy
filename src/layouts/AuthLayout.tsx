//AUTH LAYOUT
import Logo from "@/components/Logo"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify";

function AuthLayout() {

    //---VIEW---//
    return (
        <>
            <div className="min-h-screen bg-gray-800">
                <div className="w-full max-w-[450px] py-10 mx-auto px-4 lg:py-20">
                    <Logo />

                    <div className="mt-10">

                        <Outlet />
                        
                    </div>
                </div>
            </div>

            <ToastContainer 
                position="top-right" 
                autoClose={3000} 
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}

export default AuthLayout;