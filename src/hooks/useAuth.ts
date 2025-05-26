//HOOK USE AUTH
import { useQuery } from "@tanstack/react-query"
import { getUser } from "@/api/AuthApi"

export const useAuth = () => {
    /*
    refetchOnWindowFocus
    Hace que cuando el usuario cambia de pestaña o ventana y regresa 
    a la aplicación, la query se vuelva a hacer automáticamente (refetch).
    -refetchOnWindowFocus está en true, así que si no se especifica, 
    al regresar al navegador se re-consulta la API.
    -Con false, evita que al cambiar de pestaña y volver se haga otro fetch, útil si:
        -Los datos no cambian tan frecuentemente.
        -No quieres sobrecargar tu API.
        -Quieres controlar manualmente cuándo se actualiza.
    */
    //Tanstack
    const { data, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false
    });

    return { data, isLoading, isError };
}