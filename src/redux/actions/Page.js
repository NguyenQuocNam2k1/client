import { pageType } from "../constants";
import {api} from "~/apis";

//update redux
export const actFetchNewTrip = (data) => {
    return async (dispatch) => {
        dispatch({type: pageType.GET_NEW_TRIP, payload: data})
    }
}

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

export const getTrips = (params) =>{
    return async (dispatch) => {
        const response = await api.get("/api/page/getTrip", {params});
        if(Number(response.data.status) === 200){
            dispatch({type: pageType.GET_TRIPS, payload: response.data})
            return true;
        };
        return false;
    }
}

export const getTripsById = () =>{
    return async (dispatch) => {
        const response = await api.get("/api/page/getTripsById");
        if(Number(response.data.status) === 200){
            dispatch({type: pageType.GET_TRIP_SEARCH, payload: response.data})
            return true;
        };
        return false;
    }
} 

export const getSearch = async (params) => { 
    const response = await api.get("/api/page/search", {params});
    if(response.data.status === 200){
        return response.data;
    }
    return false;
}

export const createTrip = async (params) => { 
    const response = await api.post("/api/page/createTrip", params);
    if(response.data.status === 200){
        return response.data;
    }
    return false;
}

export const getTripHistory = (params) =>{
    return async (dispatch) => {
        const response = await api.get("/api/page/getTripHistory",{params});
        if(Number(response.data.status) === 200){
            dispatch({type: pageType.GET_TRIP_HISTORY, payload: response.data})
            return true;
        };
        return false;
    }
}
