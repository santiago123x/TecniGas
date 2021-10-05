import axios from "axios";


const validarCliente = async (cedula, tipo) => {
  let persona = {};
  let cliPro = {};
  try {
    const response = await axios.get(`/personac/${cedula}`);
    persona = response.data;
  } catch (error) {
    console.error(error);
  }
  if (persona.persona_id) {
    try {
      const respuesta = await axios.get(
        `/cliproidp/${persona.persona_id}/${tipo}`
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
    const response = await axios.post(`/persona`, body);
    return response.data.persona_id;
  } catch (error) {
    console.error(error);
  }
};

const postCliPro = async (idp, tipo) => {
  let estado = "activado";
  try {
    const response = await axios.post(`/listado/${idp}/${tipo}/${estado}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const validaPut = async (oldId, newId,  tipo) =>{
  let cliPro = {};
  let persona = {};
  try {
    const response = await axios.get(`/personac/${newId}`);
    persona = response.data;
  } catch (error) {
    console.error(error);
  }
  if (persona !== ""){
    if(persona.identificacion == oldId){
      try {
        const respuesta = await axios.get(
          `/cliproidp/${persona.persona_id}/${tipo}`
        );
        cliPro = respuesta.data;
      } catch (error) {
        console.error(error);
      } if (cliPro !== "") {
            return true;
        }else {
          return false;
        }
      } else {
        return false;
      } 
  } else {
    return true;
  }
};

const put = async (id, body) => {
  try {
    const response = await axios.put(`/persona/${id}`, body);
  } catch (error) {
    console.error(error);
  }
};

const putCategoria = async (id, body) => {
  try {
    const response = await axios.put(`/categoriaUp/${id}`, body);
  } catch (error) {
    console.error(error);
  }
};

const validaActCliPro = async (cedula, tipo) => {
  let persona = {};
  let cliPro = {};
  try {
    
    const personaPut = await axios.get(`/personac/${cedula}`);
    persona = personaPut.data;
  } catch (error) {
    console.error(error);
  }

  if (persona !== ""){
    try {
      const cliproPut = await axios.get(`/cliproidp/${persona.persona_id}/${tipo}`);
      cliPro = cliproPut.data;
      if (cliPro !== ""){
        if (cliPro.estado_clpr === "desactivado"){
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      } 
    } catch (error) {
      console.error(error);
    }   
  } else {
    return false;
  }
};

const putCliPro = async (persona_id, tipo_clpr, estado_clpr) => {
  try {
    await axios.put(`/listado/${persona_id}/${tipo_clpr}/${estado_clpr}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const putCliProTipo = async (cedula, body) => {
  let persona = {};
  try {
    let response = await axios.get(`/personac/${cedula}`);
    persona = response.data;
    await axios.put(`/cedulalistclipro/${persona.persona_id}`, body);
  } catch (error) {
    console.error(error);
  }
};


export { validarCliente, post, postCliPro, validaPut, put, putCliPro, validaActCliPro, putCliProTipo,putCategoria};

//persona_id
