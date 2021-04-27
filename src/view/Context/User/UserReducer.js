import { LOGIN, LOGOUT } from "../types";

const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", JSON.stringify(payload.token));
      return {
        ...state,
        isAuth: true,
        user: payload.user,
        token: payload.token,
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isAuth: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default reducer;
