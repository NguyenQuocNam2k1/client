import { UserType } from "../constants/index";
import {api} from "~/apis";

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

