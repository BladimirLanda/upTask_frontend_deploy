//API PROJECT
import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { dashboardProjectSchema, editProjectSchema, Project, ProjectEdit, ProjectFormData, projectSchema } from "@/types/index"

//--Type
type ProjectAPIType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}

//POST
export const createProject = async (formData : ProjectFormData) => {
    try {
        const { data } = await api.post<ProjectEdit>("/projects", formData)
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//GET ALL
export const getProjects = async () => {
    try {
        const { data } = await api("/projects");
        /*
        .safeParse(): Validación de un valor contra un esquema definido.
        Si el objeto contiene más propiedades de las que el esquema define, 
        por defecto Zod las ignora y solo valida las que están en el esquema.
        */
        const response = dashboardProjectSchema.safeParse(data.projects);

        if(response.success) {
            return response.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//GET BY ID (Edit)
export const getProjectById = async (projectId : Project['_id']) => {
    try {
        const { data } = await api(`/projects/${projectId}`);
        
        const response = editProjectSchema.safeParse(data.project);

        if(response.success) {
            return response.data;
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//GET BY ID (Detail)
export const getFullProjectById = async (projectId : Project['_id']) => {
    try {
        const { data } = await api(`/projects/${projectId}`);
        
        const response = projectSchema.safeParse(data.project);

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
export const updateProject = async ( { formData, projectId } : ProjectAPIType) => {
    try {
        const { data } = await api.put<ProjectEdit>(`/projects/${projectId}`, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//DELETE
export const deleteProject = async (projectId : Project['_id']) => {
    try {
        const { data } = await api.delete<ProjectEdit>(`/projects/${projectId}`);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}
