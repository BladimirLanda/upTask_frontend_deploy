//COMPONENT NOTES PANEL
import { Task } from "@/types/index"
import AddNoteForm from "./AddNoteForm"
import NoteDetail from "./NoteDetail"

//Type
type NotesPanelProps = {
    notes: Task['notes']
}

function NotesPanel( { notes } : NotesPanelProps ) {

    //---VIEW---//
    return (
        <>
            <AddNoteForm />

            <div className="divide-y divide-gray-100 mt-10">
                {notes.length ? (
                    <>
                        <p className="my-5 font-bold text-2xl text-slate-600">
                            Notas: 
                        </p>

                        {notes.map(note => <NoteDetail key={note._id} note={note} />)}
                    </>
                ) : (
                    <p className="pt-3 text-center text-gray-500">
                        No hay notas
                    </p>
                )}
            </div>
        </>
    )
}

export default NotesPanel