import { pageType } from "../constants";

const initialState = {
  listUserSuggest: "",
  listUserOld: "",
  listTrip: "",
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
  },
};

export default function pageReducer(state = initialState, { type, payload }) {
  let newState = { ...state };
  switch (type) {
    case pageType.GET_USERS:
      newState.listUserOld = payload.data.listUserOld;
      newState.listUserSuggest = payload.data.listUserSuggest;
      return newState;
    case pageType.GET_TRIPS:
      newState.listTrip = payload.data;
      return newState;  
    case pageType.GET_NEW_TRIP:
      console.log(payload.data);
        newState.newTrip = payload.data;
        return newState;  
    default:
      return newState;
  }
}
