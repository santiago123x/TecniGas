import { SET_IVA } from "../types";

const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_IVA:
      return {
        ...state,
        iva: payload,
      };
    default:
      return state;
  }
};

export default reducer;
