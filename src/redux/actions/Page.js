import { pageType } from "../constants";
import {api} from "~/apis";

//update redux
export const actFetchNewTrip = (data) => {
    return async (dispatch) => {
        dispatch({type: pageType.GET_NEW_TRIP, payload: data})
    }
}
export const actFetchTotalNoti = (data) => {
    return async (dispatch) => {
        dispatch({type: pageType.FETCH_TOTAL_NOTIFICATION, payload: data});
    }
}

export const actFetchListNoti = (data) => {
    return async (dispatch) => {
        dispatch({type: pageType.FETCH_LIST_NOTI, payload: data});
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

export const getTripsById = (params) =>{
    return async (dispatch) => {
        const response = await api.get("/api/page/getTripsById", {params});
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

export const getTripCreated = (params) =>{
    return async (dispatch) => {
        const response = await api.get("/api/page/getTripCreated",{params});
        if(Number(response.data.status) === 200){
            dispatch({type: pageType.GET_TRIP_CREATED, payload: response.data})
            return true;
        };
        return false;
    }
}

export const getNotification = (params) => {
    return async (dispatch) => {
        const response = await api.get("/api/page/getNotification",{params});
        if(Number(response.data.status) === 200){
            dispatch({type: pageType.GET_NOTIFICATION, payload: response.data})
            return true;
        };
        return false;
    }
}

export const updateNotification = async (params) => { 
    const response = await api.post("/api/page/updateNotification", params);
    if(response.data.status === 200){
        return response.data;
    }
    return false;
}