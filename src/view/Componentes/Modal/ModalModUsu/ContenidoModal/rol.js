export const rolUsu = (rol) => {
  switch (rol) {
    case "Administrador":
      return 10;
    case "Vendedor":
      return 20;
    case "Contador":
      return 30;
    default:
      return 0;
  }
};

export const rolUsuNum = (num) => {
  switch (num) {
    case 10:
      return "Administrador";
    case 20:
      return "Vendedor";
    case 30:
      return "Contador";
    default:
      return 0;
  }
};
