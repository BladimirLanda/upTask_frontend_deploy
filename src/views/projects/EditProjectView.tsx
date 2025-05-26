//VIEW EDIT PROJECT
import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/ProjectApi";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { RouteParams } from "@/types/index";

/*
Navigate: Componente que se usa para redirigir programáticamente a otra ruta dentro de la aplicación.
Cuando se renderiza, automáticamente cambia la URL del navegador a la ruta especificada en to 
y reemplaza el contenido mostrado por el de esa nueva ruta.

useParams(): Es un hook que permite acceder a los parámetros dinámicos de la URL actual.
Devuelve un objeto con claves que coinciden con los nombres de los parámetros de la ruta.
Los valores siempre son strings (o undefined si no existen).

queryKey['clave1', 'clave2']: Se está creando una clave compuesta que es un array con:
-El string 'editProject' → para identificar el tipo de consulta.
-El projectId → para identificar de manera única el proyecto específico que se está solicitando.

retry: React Query por defecto intenta hacer un reintento automático cuando una consulta falla 
(por ejemplo, si hay un error de red).
-El valor por defecto de retry es 3 (es decir, intenta 3 veces antes de dar error).
-false: Estás indicando que no se hagan reintentos si la consulta falla.
-En este caso es útil en caso de que la consutla falle (no encuentre el projectId) solo se intente una vez.
*/
function EditProjectView() {
    //Parametros
    const params = useParams<RouteParams>();
    const projectId = params.projectId!;

    //Tanstack
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    });

    if(isLoading) return 'Cargando...';
    if(isError) return <Navigate to='/404' />;

    //---VIEW---//
    if(data) return (
        <EditProjectForm data={data} projectId={projectId} />
    )
}

export default EditProjectView