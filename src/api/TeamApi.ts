//API TEAM
import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { Project, TeamEdit, TeamMember, TeamMemberForm, teamMemberSchemaFull, teamMembersSchema } from "../types"

//Type
type TeamFormData = {
    formData: TeamMemberForm,
    projectId: Project['_id']
}

type TeamMemberData = {
    projectId: Project['_id'],
    id: TeamMember['_id']
}

//POST (GET BY EMAIL)
export const findUserByEmail = async ({ projectId, formData } : TeamFormData) => {
    try {
        const url = `/projects/${projectId}/team/find`;
        const { data } = await api.post(url, formData);

        const response = teamMemberSchemaFull.safeParse(data);

        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//POST (ADD BY ID)
export const addUserToProject = async (  { projectId, id } : TeamMemberData ) => {
    try {
        const url = `/projects/${projectId}/team`;
        const { data } = await api.post<TeamEdit>(url, { id });

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//GET (PROJECT'S MEMBERS)
export const getProjectTeam = async (  projectId : Project['_id']) => {
    try {
        const url = `/projects/${projectId}/team`;
        const { data } = await api(url);

        const response = teamMembersSchema.safeParse(data);

        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//DELETE (REMOVE BY ID)
export const removeUserFromProject = async (  { projectId, id } : TeamMemberData ) => {
    try {
        const url = `/projects/${projectId}/team/${id}`;
        const { data } = await api.delete<TeamEdit>(url);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}