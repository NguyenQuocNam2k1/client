import { pageType } from "../constants";

const initialState = {
  listUserSuggest: "",
  resultTripSearch : "",
  listTrip: "",
  listTripHistory: "",
  listTripCreated: [],
  newTrip: {
    author_info: "",
    title: "",
    hashtags: "",
    xe_di: "o_to_6",
    loai_xe: "",
    number_member: "",
    phone_number: "",
    cost: 0,
    start_place: "",
    end_place: "",
    rules: "",
    start_at: "",
    url_image: "",
    count_like: 0,
    trip_info: ""
  },
  listNotification: "",
  totalNotification: 0,
};

export default function pageReducer(state = initialState, { type, payload }) {
  let newState = { ...state };
  switch (type) {
    case pageType.GET_USERS:
      // newState.listUserOld = payload.data.listUserOld;
      newState.listUserSuggest = payload.data.listUserSuggest;
      return newState;
    case pageType.GET_TRIPS:
      newState.listTrip = payload.data;
      return newState;  
    case pageType.GET_NEW_TRIP:
        newState.newTrip = payload.data;
        return newState;  
    case pageType.GET_TRIP_HISTORY:
        newState.listTripHistory = payload.data;
        return newState; 
    case pageType.GET_TRIP_SEARCH:
        newState.resultTripSearch = [payload.data];
        return newState;
    case pageType.GET_TRIP_CREATED:
        newState.listTripCreated = payload.data;
        return newState;
    case pageType.GET_NOTIFICATION:
        newState.listNotification = payload.data.listNoti;
        newState.totalNotification = payload.data.total;
        return newState;  
    case pageType.FETCH_TOTAL_NOTIFICATION:
        newState.totalNotification = 0;
        return newState;   
    case pageType.FETCH_LIST_NOTI:
        newState.listNotification = payload;
        return newState;         
    default:
      return newState;
  }
}
