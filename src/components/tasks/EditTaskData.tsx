//COMPONENT TASK EDIT DATA
import { getTaskById } from "@/api/TaskApi";
import { RouteParams } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal";

/*
useQuery() - enabled
La opción enabled permite habilitar o deshabilitar una query de manera condicional.
    -Si enabled: true → la query se ejecuta automáticamente cuando el componente se monta 
    o cuando cambia alguna queryKey.
    -Si enabled: false → no se ejecuta automáticamente, y sólo se podrá disparar manualmente 
    si se usa refetch().
*/
function EditTaskData() {
    //Paremtros
    const params = useParams<RouteParams>();
    const projectId = params.projectId!;

    //Location
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('editTask')!;

    //Tanstack
    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        retry: false,
        enabled: !!taskId //!! validación Booleana directa
    });

    if(isError) return <Navigate to='/404' />;

    //---VIEW---//
    if(data) return (
        <EditTaskModal data={data} taskId={taskId} />
    )
}

export default EditTaskData