// import { UserTypes } from "../constants/action-types";
// import { setCookie } from "component/config/cookie";

const initialState = {
    dataUser: "100",
    stRegister: false,
    loading:false,
}

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        default:
            return state;
    }
}