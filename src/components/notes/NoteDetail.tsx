//COMPONENT NOTE DETAILS
import { deleteNote } from "@/api/NoteApi"
import { useAuth } from "@/hooks/useAuth"
import { Note, RouteParams } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

//Type
type NoteDetailProps = {
    note: Note
}

function NoteDetail( { note } : NoteDetailProps ) {
    //Params
    const params = useParams<RouteParams>();
    const projectId = params.projectId!;

    //Location
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('viewTask')!;

    //Hook
    const { data, isLoading } = useAuth();

    //Tanstack
    const queryCliente = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['task', taskId]});
            
            toast.success(data?.message);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    
    //State
    const canDelete = useMemo(() => data?._id === note.createdBy._id ,[data]);

    if(isLoading) return 'Cargando...';

    //---VIEW---//
    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content}
                </p>

                <p className="text-xs text-slate-500">
                    { formatDate(note.createdAt) }
                </p>
            </div>

            <div className="flex justify-between items-cente gap-3">
                <p className="py-1 px-4 border-2 font-bold text-sm uppercase bg-fuchsia-50 
                text-fuchsia-600 border-fuchsia-600 rounded-lg inline-block'">
                    {note.createdBy.name}
                </p>

                {canDelete && (
                    <button 
                    type="button"
                    className="w-7 h-7 font-bold flex items-center justify-center text-lg text-red-600"
                    onClick={() => mutate( { projectId, taskId, noteId: note._id} )}>
                        x
                    </button>
                )}
            </div>
        </div>
    )
}

export default NoteDetail