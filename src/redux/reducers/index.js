import { combineReducers } from "redux";
import  userReducer  from "./users";     
import pageReducer from "./page";

const reducer = combineReducers({
    users: userReducer,
    pages: pageReducer,
})

export default reducer;