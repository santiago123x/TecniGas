
export const validaVentas = (cliente, estado, recibido, total, rows) => {

    let result = true;

    if (cliente != "" &&
        estado != 0 &&
        ((recibido >= total && estado == 10) || (recibido < total && recibido >= 0 && estado == 20))
        && rows.length != 0){
            result=false;
        }
    //console.log(cliente != "");
    return result;
    
}