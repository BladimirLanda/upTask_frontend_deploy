//APP LAYOUT
import { Link, Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify" //npm i react-toastify
import 'react-toastify/dist/ReactToastify.css' //css react-toastify
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"
import { useAuth } from "@/hooks/useAuth"

/*
<Outlet /> : Es un componente de react-router-dom que actúa como punto de renderizado 
para las rutas hijas dentro de una ruta padre.

react-toastify: Es una librería para React que te permite mostrar notificaciones tipo 
"toast" (esas notificaciones pequeñas y flotantes que aparecen temporalmente en una 
esquina de la pantalla) sin necesidad de escribir mucho código.
    -ToastContainer: Es el contenedor principal de las notificaciones. Este componente 
    es el que recibe, organiza y muestra todos los toasts que se generabn desde cualquier 
    parte de la app.
    -toast: Es la función que dispara una notificación. Se invoca desde cualquier parte del 
    código donde necesites mostrar un mensaje emergente.
        <button onClick={() => toast.success("¡Todo bien!")}>Success</button>
        <button onClick={() => toast.error("¡Algo salió mal!")}>Error</button>
        <button onClick={() => toast.info("Dato curioso aquí")}>Info</button>
*/
function AppLayout() {
    //Hooks
    const { data, isLoading, isError } = useAuth();

    if(isLoading) return 'Cargando...';
    if(isError) return <Navigate to='/auth/login' />;

    //---VIEW---//
    if(data) return (
        <>
            <header className="py-5 px-3 bg-gray-800">
                <div className="max-w-screen-2xl mx-auto flex flex-col justify-between items-center lg:flex-row">
                    <div className="w-64">
                        <Link to='/'>
                            <Logo />
                        </Link>
                    </div>

                    <NavMenu  name={data.name} />
                </div>
            </header>

            <section className="p-5 mt-10 max-w-screen-2xl mx-auto">
                <Outlet />
            </section>

            <footer className="py-5">
                <p className="text-center">
                    @Todos los derechos reservados {new Date().getFullYear()}
                </p>
            </footer>

            <ToastContainer 
                position="top-right" 
                autoClose={3000} 
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}

export default AppLayout