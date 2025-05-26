//API TASK
import { Project, Task, TaskEdit, TaskFormData, taskSchema } from "../types"
import api from "@/lib/axios";
import { isAxiosError } from "axios";

//--Type
type TaskAPIType = {
    formData: TaskFormData,
    projectId: Project['_id'],
    taskId: Task['_id'],
    status: Task['status']
}

//POST
export const createTask = async ( { formData, projectId } : Pick<TaskAPIType, 'formData' | 'projectId'>) => {
    try {
        const { data } = await api.post<TaskEdit>(`/projects/${projectId}/tasks`, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//GET BY ID
export const getTaskById = async( { projectId, taskId } : Pick<TaskAPIType, 'projectId' | 'taskId'>) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api(url);

        //Schema
        const response = taskSchema.safeParse(data.task);

        if(response.success) {
            return response.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//PUT
export const updateTask = async( { projectId, taskId, formData } : Pick<TaskAPIType, 'projectId' | 'taskId' | 'formData'>) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.put<TaskEdit>(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//DELETE
export const deleteTask = async( { projectId, taskId } : Pick<TaskAPIType, 'projectId' | 'taskId'>) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.delete<TaskEdit>(url);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//POST-STATUS
export const updateStatusTask = async( { projectId, taskId, status } : Pick<TaskAPIType, 'projectId' | 'taskId' | 'status'>) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`;
        const { data } = await api.post<TaskEdit>(url, { status });
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}