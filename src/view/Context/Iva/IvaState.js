import { useReducer, useEffect } from "react";
import IvaContext from "./IvaContext";
import reducer from "./IvaReducer";
import { SET_IVA } from "../types";
import axios from "axios";


const initialState = {
  iva: {},
};

const IvaState = ({ children }) => {
  const [iva, dispatchIva] = useReducer(reducer, initialState);

  const getIva = async () => {
    try {
      const res = await axios.get(`/iva`);
      const data = res.data.iva;
      dispatchIva({ type: SET_IVA, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getIva();
  }, []);

  return (
    <IvaContext.Provider
      value={{
        getIva,
        iva,
        dispatchIva,
      }}
    >
      {children}
    </IvaContext.Provider>
  );
};

export default IvaState;
