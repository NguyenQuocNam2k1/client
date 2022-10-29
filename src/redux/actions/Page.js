import { pageType } from "../constants";
import axios from "axios";
import {api} from "~/apis";

//update redux

//call api
export const getUsers = (params) =>{
    return async (dispatch) => {
        const response = await api.get("/api/user/getUsers", {params});
        if(Number(response.data.status) === 200){
            dispatch({type: pageType.GET_USERS, payload: response.data})
            return true;
        };
        return false;
    }
}

export const getTrips = () =>{
    return async (dispatch) => {
        const response = await api.get("/api/page/getTrip");
        if(Number(response.data.status) === 200){
            dispatch({type: pageType.GET_TRIPS, payload: response.data})
            return true;
        };
        return false;
    }
}

