import axios from "axios";

const URL = "http://localhost:5000/";

const validarCliente = async (cedula, tipo) => {
  let persona = {};
  let cliPro = {};
  try {
    const response = await axios.get(`${URL}personac/${cedula}`);
    persona = response.data;
  } catch (error) {
    console.error(error);
  }
  if (persona.persona_id) {
    try {
      const respuesta = await axios.get(
        `${URL}cliproidp/${persona.persona_id}/${tipo}`
      );

      cliPro = respuesta.data;
    } catch (error) {
      console.error(error);
    }
  }
  if (persona !== "") {
    if (cliPro !== "") {
      return true;
    } else {
      return persona.persona_id;
    }
  } else {
    return false;
  }
};

const post = async (body) => {
  try {
    const response = await axios.post(`${URL}persona`, body);
    return response.data.persona_id;
  } catch (error) {
    console.error(error);
  }
};

const postCliPro = async (idp, tipo) => {
  try {
    const response = await axios.post(`${URL}listado/${idp}/${tipo}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { validarCliente, post, postCliPro };

//persona_id
