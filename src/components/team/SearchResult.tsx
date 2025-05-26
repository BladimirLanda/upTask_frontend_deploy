//COMPONENT SEARCH RESULT
import { addUserToProject } from "@/api/TeamApi"
import { RouteParams, TeamApi } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

//Type
type SearchResultProps = {
    data: TeamApi,
    reset: () => void
}

function SearchResult({ data, reset } : SearchResultProps) {
    //User
    const { user } = data;

    //Params
    const params = useParams<RouteParams>();
    const projectId = params.projectId!;

    //Tanstack
    const queryCliente = useQueryClient();

    const mutation = useMutation({
        mutationFn: addUserToProject,
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['projectTeam', projectId]});
            
            toast.success(data?.message);
            reset();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleAddUserToProject = () => {
        const data = {
            projectId,
            id: user._id
        }

        mutation.mutate(data);
    }

    //---VIEW---//
    return (
        <>
            <p className="mt-10 text-center font-bold ">
                Resultado:
            </p>

            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button className="px-10 py-3 font-bold cursos-pointer text-purple-600 hover:bg-purple-100"
                onClick={ handleAddUserToProject }>
                    Agregar al Proyecto
                </button>
            </div>
        </>
    )
}

export default SearchResult