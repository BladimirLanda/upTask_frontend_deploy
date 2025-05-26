//VIEW DETAILS PROJECT
import { getFullProjectById } from "@/api/ProjectApi"
import AddTaskModal from "@/components/tasks/AddTasksModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { RouteParams } from "@/types/index";
import { isManager } from "@/utils/policies";
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

/*
useNavigate() - navigate(?): Lo que está haciendo es modificar la URL actual 
agregando o reemplazando los query parameters. Sin recargar la página 
ni cambiar de vista. Solo modifica los search params de la URL.
*/

function ProjectDetailsView() {
    //Nevegación
    const navigate = useNavigate();

    //Parametros
    const params = useParams<RouteParams>();
    const projectId = params.projectId!;

    //Tanstack
    const { data, isLoading, isError } = useQuery({
        queryKey: ['selectProject', projectId],
        queryFn: () => getFullProjectById(projectId),
        retry: false
    });

    const { data: user, isLoading: authLoading } = useAuth();

    //State
    const canEdit = useMemo(() => data?.manager === user?._id , [data, user]);

    if(isLoading && authLoading) return 'Cargando...';
    if(isError) return <Navigate to='/404' />;

    //---VIEW---//
    if(data && user) return (
        <>
            <h1 className="text-5xl font-black">
                { data.projectName }
            </h1>

            <p className="mt-5 text-2xl font-light text-gray-500">
                {data.description}
            </p>

            {isManager(data.manager, user._id) && (
                <nav className="my-5 flex gap-3">
                    <button type="button" 
                    className="px-10 py-3 text-white text-xl cursor-pointer 
                    bg-purple-400 hover:bg-purple-500 transition-colors"
                    onClick={() => navigate('?newTask=true')}> {/*Forma Abreviada*/}
                        Agregar Tarea
                    </button>

                    <Link to={'team'} className="px-10 py-3 text-white text-xl cursor-pointer 
                    bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors">
                        Colaboradores
                    </Link>
                </nav>
            )}

            <TaskList tasks={data.tasks} canEdit={canEdit} />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}

export default ProjectDetailsView