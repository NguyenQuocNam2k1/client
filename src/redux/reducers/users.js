import * as types from "../constants";

const initialState = {
    dataUser: '',
}

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.Login:
            console.log(payload);
            break;
        default:
            return state;
    }
}