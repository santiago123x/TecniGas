export const rolUsu = (rol) => {
  switch (rol) {
    case "administrador":
      return 10;
    case "vendedor":
      return 20;
    case "contador":
      return 30;
    default:
      return 0;
  }
};

export const rolUsuNum = (num) => {
  switch (num) {
    case 10:
      return "administrador";
    case 20:
      return "vendedor";
    case 30:
      return "contador";
    default:
      return 0;
  }
};
