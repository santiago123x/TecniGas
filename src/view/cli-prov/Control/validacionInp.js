const validarTelefono = (tel) => {
  if ((tel.length < 7 || tel.length > 12) && tel.length !== 0) {
    return true;
  } else {
    return false;
  }
};

const validarEmail = (email) => {
  if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    ) &&
    email.length !== 0
  ) {
    return true;
  } else {
    return false;
  }
};

const validaTodo = (data) => {
  let bool = false;
  Object.keys(data).forEach((dat) => {
    if (data[dat].length == 0) {
      bool = true;
    }
  });
  console.log(bool);
  return bool;
};

const validaMenor0 = (numero) => {
  let bool = false;
  if (numero !== "") {
    if (numero < 0) {
      bool = true;
    }
  }
  return bool;
};

export {
  validarTelefono,
  validarEmail,
  validaTodo,
  validaMenor0,
};
