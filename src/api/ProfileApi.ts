//API PROFILE
import { isAxiosError } from "axios";
import { UpdatePasswordForm, UserEdit, UserFormData } from "../types";
import api from "@/lib/axios";

//PUT (UPDATE PROFILE)
export const updateProfile = async ( formData : UserFormData ) => {
    try {
        const { data } = await api.put<UserEdit>('/auth/profile', formData);
        
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//POST (UPDATE PASSWORD)
export const changePassword = async ( formData : UpdatePasswordForm ) => {
    try {
        const { data } = await api.post<UserEdit>('/auth/update-password', formData);
        
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}