import { settingType} from "../constants";
import axios from "axios";
import {api} from "~/apis";

export const saveImage = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file);
    const response = await api.post("/api/upload/image", formData , {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
    if(response.data){
        return response.data;
    }
    return false;
}

export const deleteImage = async (data) => {
    const response = await api.post("api/upload/deleteImage",data);
    if(response.data){
        console.log(response.data);
    };
    return false;
}

export const actGetTheme = (data) => {
    return async (dispatch) => {
        dispatch({type: settingType.GET_THEME, payload: data})
    }
}

export const saveTheme = async (data) => { 
    const response = await api.post("/api/user/saveTheme", data);
    if(response.data.status === 200){
        return true;
    }
    return false;
}
