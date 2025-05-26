//AXIOS
import axios from 'axios'

/*
Intancia Axios: Instancia personalizada con una base URL predeterminada, 
que comunmente viene de una variable de entorno.

-axios.create(): Crea una instancia de Axios con una configuración base (como baseURL, headers, etc.)
-baseURL: Define la URL base que se va a usar en todas las peticiones hechas con esa instancia.
-import.meta.env.VITE_API_URL: Accede a una variable de entorno definida en un archivo .env en tu proyecto Vite

----------//--------------------

Interceptores
Los interceptores en Axios son funciones que permiten interceptar y modificar:

    -Las peticiones antes de que se envíen al servidor
    -Las respuestas antes de que lleguen a donde se consumen

Es como poner un "guardia" o "filtro" antes de que la solicitud salga, o antes
de que la respuesta se procese.

📍 Tipos de interceptores:
    Request Interceptor
    → Se ejecuta antes de enviar la solicitud
    Ejemplo clásico: agregar un token JWT al header.

    Response Interceptor
    → Se ejecuta antes de devolver la respuesta al frontend
    Ejemplo clásico: capturar errores globalmente o refrescar tokens.

*/
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(config => {
    //Token
    const token = localStorage.getItem('AUTH_TOKEN');

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;