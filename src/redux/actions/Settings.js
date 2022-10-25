import * as types from "../constants";
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