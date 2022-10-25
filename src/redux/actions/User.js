import * as types from "../constants";
import {api} from "~/apis";

export const register = async (data) => {
    const response = await api.post("/api/user/register", data);
    if(response){
        return true;
    }
    return false;
}