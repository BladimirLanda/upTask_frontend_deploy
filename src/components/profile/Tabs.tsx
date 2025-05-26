//COMPONENT TABS
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FingerPrintIcon, UserIcon } from '@heroicons/react/20/solid'

/*
npm i @tailwindcss/forms
tailwind.config.js

    import forms from '@tailwindcss/forms'
    plugins: [ forms ],
*/

/*
sr-only
Es una clase de accesibilidad que oculta visualmente un elemento en pantalla, 
pero sigue estando disponible para los lectores de pantalla (screen readers).

aria-hidden="true"
es un atributo de accesibilidad que se usa para indicarle a los lectores de 
pantalla que ignoren un elemento y todo su contenido, como si no existiera.
Usarlo solo cuando:
-El elemento es puramente decorativo.
-La información que contiene ya está disponible de forma accesible en otro lugar.
*/

//Tabs
const tabs = [
    { name: 'Mi Cuenta', href: '/profile', icon: UserIcon },
    { name: 'Cambiar Password', href: '/profile/password', icon: FingerPrintIcon },
]

//Util
/*
(...classes: string[])
Recibe cualquier cantidad de strings como argumentos (gracias al ..., que es el rest operator).
    classNames('text-red-500', 'bg-white', 'hover:bg-gray-100')

string[]
Gracias al rest operator (...), la función permite recibir cualquier número de argumentos, 
y esos argumentos van a conformar un array dentro de la función.
    classNames('a', 'b', 'c')
    classes = ['a', 'b', 'c']

.filter(Boolean)
Filtra los elementos que sean truthy (que existan, o sea no sean undefined, null, false, 0, '' o NaN).
    ['text-red-500', false, undefined, 'hover:bg-gray-100']
    → ['text-red-500', 'hover:bg-gray-100']

.join(' ')
Une todos los elementos del array resultante con espacios entre ellos en un String .
    'text-red-500 hover:bg-gray-100'
*/
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function Tabs() {
    //Navigate
    const navigate = useNavigate()

    //Location
    const location = useLocation()

    //Function
    const currentTab = tabs.filter(tab => tab.href === location.pathname)[0].href
    
    //---VIEW---// 
    return (
        <div className='mb-10'>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>

                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-purple-800 focus:ring-purple-800"
                    onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => navigate(e.target.value) }
                    value={currentTab}
                >
                    {tabs.map((tab) => {
                        return (
                            <option 
                            key={tab.name}
                            value={tab.href}>
                                {tab.name}
                            </option>
                        )
                    })}
                </select>
            </div>

            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link
                            key={tab.name}
                            to={tab.href}
                            className={classNames(
                                location.pathname === tab.href
                                    ? 'border-purple-800 text-purple-800'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                            )}>
                                <tab.icon
                                className={classNames(
                                    location.pathname === tab.href 
                                    ? 'text-purple-800' 
                                    : 'text-gray-400 group-hover:text-gray-500',
                                    '-ml-0.5 mr-2 h-5 w-5'
                                )}
                                aria-hidden="true"/>

                                <span>{tab.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Tabs;