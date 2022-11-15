import { UserType } from "../constants/index";
import {api} from "~/apis";


//update redux
export const actFetchUserInfo = (data) => {
    return async (dispatch) => {
        dispatch({type: UserType.FETCH_INFO, payload: data})
    }
}
export const actFetchDataRegister = (data) => {
    return async (dispatch) => {
        dispatch({type: UserType.FETCH_DATA_USER_REGISTER, payload: data})
    }
}


//call api
export const register = async (data) => {
    const response = await api.post("/api/user/register", data);
    if(response){
        return true;
    }
    return false;
}

export const logIn = (data) => { 
    return async (dispatch) => {
        const response = await api.post("/api/user/logIn" , data);
        if(Number(response.data.status) === 200){
            dispatch({type: UserType.LOGIN, payload: response.data})
            return true;
        };
        return false;
    }
}

export const getUser = (data) =>{
    return async (dispatch) => {
        const response = await api.post("/api/user/getInfo" , data);
        if(Number(response.data.status) === 200){
            dispatch({type: UserType.FETCH_INFO, payload: response.data})
            return true;
        };
        return false;
    }
}

export const updateUserInfo = async (data) => {
    const response = await api.post("/api/user/updateUser", data);
    if(response){
        return true;
    }
    return false;
}

export const getUserById = (params) =>{
    return async (dispatch) => {
        const response = await api.get("/api/user/getUsersById",{params});
        if(Number(response.data.status) === 200){
            dispatch({type: UserType.GET_USER_BY_ID, payload: response.data})
            return true;
        };
        return false;
    }
}


export const UpdateUserById = (params) => {
    return async (dispatch) => {
        const response = await api.get("/api/user/updateUserById",{params});
        if(Number(response.data.status) === 200){
            dispatch({type: UserType.GET_USER_BY_ID, payload: response.data})
            return true;
        };
        return false;
    }
}