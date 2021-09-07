import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (API, recarga, validar, metodo, body) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const axConfig = async () => {
    try {
      const response = await axios({
        method: metodo,
        url: API,
        data: body,
      });
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(!loading);
    }
  };

  useEffect(() => {
    if (
      (metodo === "post" || metodo === "put" || metodo === "delete") &&
      validar
    ) {
      axConfig();
    } else if (metodo === "get" || metodo === undefined) {
      axConfig();
    } else {
      setLoading(!loading);
    }
  }, [API, recarga, metodo, body]);

  return { data, error, loading };
};

export default useAxios;

/*
  const axGet = async () => {
    try {
      const response = await axios.get(API);
      setPeticion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const axPost = async () => {
    try {
      const response = await axios.post(API, body);
    } catch (error) {
      console.error(error);
    }
  };

  const axPut = async () => {
    try {
      const response = await axios.put(API, body);
    } catch (error) {
      console.error(error);
    }
  };

  const axDel = async () => {
    try {
      const response = await axios.delete(API);
    } catch (error) {
      console.error(error);
    }
  };
*/

/*
    if (metodo === "get") {
      axGet();
    } else if (metodo === "post") {
      axPost();
    } else if (metodo === "put") {
      axPut();
    } else if (metodo === "del") {
      axDel();
    } else {
      setPeticion("Inserte un metodo valido");
    }*/
