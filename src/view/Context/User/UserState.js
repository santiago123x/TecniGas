import { useReducer } from "react";
import UserContext from "./UserContext";
import reducer from "./UserReducer";

let userI = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {};
let tokenI = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;
let AuthI = userI !== {} && tokenI !== null ? true : false;

const initialState = {
  user: userI,
  token: tokenI,
  isAuth: AuthI,
};

const UserState = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider
      value={{
        user,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
