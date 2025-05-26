import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' //npm i @tanstack/react-query
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' //npm i @tanstack/react-query-devtools
import './index.css'
import Router from './router'

/*
<Router />: Componente de rutas que se definió. Aquí es donde se establece 
toda la navegación de la app, y se carga según la URL actual.
*/

/*
TanStack Query https://tanstack.com/query/v5/docs/framework/react/overview
TanStack Query (antes conocido como React Query) es una librería para gestionar 
el estado de las peticiones asíncronas (como peticiones HTTP a una API) en aplicaciones React.
Permite fetching, caching, sincronización y actualización automática de datos remotos 
de una forma optimizada, sin tener que escribir lógica personalizada para manejar loading, 
error o cache. Se basa en queries y mutations:

✅ Gestión automática de cache
✅ Actualización de datos en segundo plano
✅ Sincronización de múltiples componentes que consumen la misma query
✅ Control de reintentos
✅ Refetch automático en foco de ventana
✅ Suspense-ready y paginación

Concepto	Qué hace
Query	    Obtiene datos desde un servidor remoto.
Mutation	Envía datos (crear, editar o eliminar) hacia un servidor remoto.

Implementación
1️⃣ Crear un QueryClient y envolver la aplicación
2️⃣ Hacer una petición con useQuery/useMutation

Resumen.
TanStack Query es una solución moderna para gestionar datos remotos en React 
de forma eficiente, reduciendo la necesidad de estados locales para peticiones 
HTTP y eliminando gran parte de la lógica repetitiva que normalmente se escribe 
con useState, useEffect y axios de forma manual.

ReactQueryDevtools: Es un componente de desarrollo que provee una herramienta 
visual tipo "inspector" para ver en tiempo real el estado de las queries y 
la caché de TanStack Query en la aplicación.
De agrega normalmente dentro del componente principal o donde esté 
tu QueryClientProvider.
-Ver todas las queries activas y en caché
-Ver las queryKey, data, status (loading, success, error)
-Forzar un refetch
-Invalidar una query
-Ver cuánto falta para que expire la caché
-Depurar errores y estados de carga en tiempo real

import.meta.env.DEV
Es una variable booleana interna de Vite que vale true cuando 
corres vite o npm run dev y false cuando haces vite build.
*/

//--Cliente
const queryCliente = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryCliente}>

      <Router />

      {import.meta.env.DEV && <ReactQueryDevtools />}

    </QueryClientProvider>
  </StrictMode>,
)
