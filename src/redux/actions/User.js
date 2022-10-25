import * as types from "../constants";
import {api} from "~/apis";

export const register = async (data) => {
    const response = await api.post("/api/user/register", data);
    if(response){
        return true;
    }
    return false;
}

export const logIn = async (data, dispatch) => { 
    const response = await api.post("/api/user/logIn" , data);
    console.log(response);
    if(response.status === 200){
        dispatch({ type: types.Login, payload: response.data });
        return true;
    };
    return false;
}
