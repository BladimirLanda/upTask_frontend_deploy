//ROUTER REACT
import { BrowserRouter, Routes, Route } from 'react-router-dom' //npm i react-router-dom
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProjectView from './views/projects/CreateProjectView'
import EditProjectView from './views/projects/EditProjectView'
import ProjectDetailsView from './views/projects/ProjectDetailsView'
import AuthLayout from './layouts/AuthLayout'
import LoginView from './views/auth/LoginView'
import RegisterView from './views/auth/RegisterView'
import ConfirmAccountView from './views/auth/ConfirmAccountView'
import RequestNewCodeView from './views/auth/RequestNewCodeView'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'
import ProjectTeamView from './views/projects/ProjectTeamView'
import ProfileView from './views/profile/ProfileView'
import ChangePasswordView from './views/profile/ChangePasswordView'
import ProfileLayout from './layouts/ProfileLayout'
import NotFound from './views/error/NotFound'

/*
Router(): Función de JS que define el componente de React  y se encarga de configurar 
las rutas de la aplicación.

<BrowserRouter>: Un componente de react-router-dom que permite manejar la navegación 
y las rutas en una aplicación de React basada en el historial del navegador.

<Routes>: Contenedor de las distintas rutas de la aplicación. Dentro de este componente
van todas las rutas (<Route>), y es el encargado de renderizar la vista correspondiente 
según la URL actual.

<Route element={ <AppLayout /> }>: Una ruta que usa el componente 'AppLayout' como 
layout para las rutas hijas. No tiene path aquí porque está actuando como un envoltorio.

<Route index path='/' element={ <DashboardView /> } />: Una ruta hija de la anterior.
    -index: Significa que se renderizará en la URL base de este layout ('/').
    -path='/': La ruta raíz de la app.
    -element={ <DashboardView /> }: Componente que se va a mostrar cuando se visite esta ruta.

'*': En React Router (v6 en adelante), el * en una ruta significa "cualquier ruta que no 
haya sido emparejada antes", es decir, actúa como un catch-all o ruta comodín.
Cuando el usuario entra a una ruta que no coincide con ninguna de las anteriores, se 
renderiza la que tenga path="*".
Es la forma estándar de manejar páginas 404 en React Router.
*/
function Router() {
    //Router
    return (
        <BrowserRouter>
            <Routes>
                <Route element={ <AppLayout /> }>
                    <Route index path='/' element={ <DashboardView /> } />
                    <Route path='/projects/create' element={ <CreateProjectView /> } />
                    <Route path='/projects/:projectId' element={ <ProjectDetailsView /> } />
                    <Route path='/projects/:projectId/edit' element={ <EditProjectView /> } />
                    <Route path='/projects/:projectId/team' element={ <ProjectTeamView /> } />

                    <Route element={ <ProfileLayout /> } >
                        <Route path='/profile' element={ <ProfileView /> } />
                        <Route path='/profile/password' element={ <ChangePasswordView /> } />
                    </Route>
                </Route>

                <Route element={ <AuthLayout /> }>
                    <Route path='/auth/login' element={ <LoginView />} />
                    <Route path='/auth/register' element={ <RegisterView />} />
                    <Route path='/auth/confirm-account' element={ <ConfirmAccountView />} />
                    <Route path='/auth/request-code' element={ <RequestNewCodeView />} />
                    <Route path='/auth/forgot-password' element={ <ForgotPasswordView /> } />
                    <Route path='/auth/new-password' element={ <NewPasswordView /> } />
                </Route>

                <Route element={ <AuthLayout /> } >
                    <Route path='*' element={ <NotFound /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;