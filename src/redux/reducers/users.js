import { UserType } from "../constants";
import { setCookie } from "-cc/cookie";

const initialState = {
  dataUser: "",
  token: "",
  userInfo: "",
  dataRegister:{
    name: "",
    password:"",
    email:"",
    avatar:{
      urlFile:"",
      urlImage: "",
    },
    sex:"female",
  }
};

export default function userReducer(state = initialState, { type, payload }) {
  let newState = { ...state };
  switch (type) {
    case UserType.LOGIN:
      setCookie("CD_token", payload.data.token, 1);
      setCookie("CD_email", payload.data.user.email, 1);
      newState.dataUser = payload.data.user;
      newState.token = payload.data.token;
      return newState;
    case UserType.FETCH_INFO:
      newState.dataUser = payload.data;
      return newState;
    case UserType.GET_THEME:
      newState.dataUser = payload.data;
      return newState;
    case UserType.GET_USER_BY_ID:
      newState.userInfo = payload.data;
      return newState;
    case UserType.FETCH_DATA_USER_REGISTER:
      newState.dataRegister = payload;
      return newState;
    default:
      return newState;
  }
}
