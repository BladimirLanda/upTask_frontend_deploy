//API NOTE
import { isAxiosError } from "axios";
import { Note, NoteEdit, NoteFormData, Project, Task } from "../types";
import api from "@/lib/axios";

//Type
type NoteAPIType = {
    projectId: Project['_id'],
    taskId: Task['_id'],
    noteId: Note['_id'],
    formData: NoteFormData,
}

//POST (ADD BY ID)
export const createNote = async ( { projectId, taskId, formData } : Pick<NoteAPIType, 
    'projectId' | 'taskId' | 'formData'> ) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`;
        const { data } = await api.post<NoteEdit>(url, formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//DELETE (REMOVE BY ID)
export const deleteNote = async ( { projectId, taskId, noteId } : Pick<NoteAPIType, 
    'projectId' | 'taskId' | 'noteId'> ) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
        const { data } = await api.delete<NoteEdit>(url);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}