import { pageType } from "../constants";

const initialState = {
    listUserSuggest: "",
    listUserOld: "",
    listTrip: "",
}

export default function pageReducer(state = initialState, { type, payload }){
    let newState = {...state};
    switch (type) {
        case pageType.GET_USERS :
            newState.listUserOld = payload.data.listUserOld;
            newState.listUserSuggest = payload.data.listUserSuggest;
            return newState;
        case pageType.GET_TRIPS:
            newState.listTrip = payload.data;
            return newState;    
        default:
            return newState;
    }
}