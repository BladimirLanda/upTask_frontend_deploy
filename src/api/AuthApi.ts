//API AUTH
import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { AuthAction, AuthToken, CheckPassword, CheckPasswordForm, ConfirmToken, ForgotPasswordForm, 
    NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, 
    userSchema } from "../types"

//POST - CREATE
export const createAccount = async (formData : UserRegistrationForm) => {
    try {
        const url = '/auth/create-count';
        const { data } = await api.post<AuthAction>(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//POST - CONFIRM
export const confirmAccount = async (formData : ConfirmToken) => {
    try {
        const url = '/auth/confirm-account';
        const { data } = await api.post<AuthAction>(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//POST - REQUEST NEW TOKEN
export const requestConfirmationCode = async (formData : RequestConfirmationCodeForm) => {
    try {
        const url = '/auth/request-code';
        const { data } = await api.post<AuthAction>(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//POST - LOGIN
export const authenticateUser = async (formData : UserLoginForm) => {
    try {
        const url = '/auth/login';
        const { data } = await api.post<AuthToken>(url, formData);

        //LS
        localStorage.setItem('AUTH_TOKEN', data.token);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//POST - LOGIN
export const forgotPassword = async (formData : ForgotPasswordForm) => {
    try {
        const url = '/auth/forgot-password';
        const { data } = await api.post<AuthAction>(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}
    
//POST - TOKEN REST PASSWORD
export const validateToken = async (formData : ConfirmToken) => {
    try {
        const url = '/auth/validate-token';
        const { data } = await api.post<AuthAction>(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//POST - UPDATE PASSWORD
export const updatePasswordWithToken = async ({formData, token} : {formData: NewPasswordForm, token: ConfirmToken['token']}) => {
    try {
        const url = `/auth/update-password/${token}`;
        const { data } = await api.post<AuthAction>(url, formData);
        
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//GET - USER AUTHENTICATED
export const getUser = async () => {
    try {
        const { data } = await api('/auth/user');

        const response = userSchema.safeParse(data);
        
        if(response.success) {
            return response.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}

//POST - CHECK PASSWORD
export const checkPassword = async (formData : CheckPasswordForm) => {
    try {
        const url = '/auth/check-password';
        const { data } = await api.post<CheckPassword>(url, formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors);
        }
    }
}