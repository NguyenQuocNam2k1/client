import { combineReducers } from "redux";
import {userReducer} from "./users";

const reducer = combineReducers({
    userReducer,
})

export default reducer;