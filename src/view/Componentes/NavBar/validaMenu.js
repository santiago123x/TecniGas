 export const validaRol = (rol,subMenu)=>{
    switch (subMenu){
        case 'Ventas':
            if(rol === 'Administrador' || rol === 'Vendedor'){
                return true;
            }else{
                return false;
            }
            
        case 'Inventario':
            if(rol === 'Administrador' || rol === 'Vendedor'){
                return true;
            }else{
                return false;
            }
        case 'Agenda':
            if(rol === 'Administrador' || rol === 'Vendedor'){
                return true;
            }else{
                return false;
            }
        case 'Devoluciones':
            if(rol === 'Administrador' || rol === 'Vendedor'){
                return true;
            }else{
                return false;
            }
        case 'Informes':
            if(rol === 'Administrador' || rol === 'Contador'){
                return true;
            }else{
                return false;
            }
        case 'Gestion':
            if(rol === 'Administrador' || rol === 'Vendedor'){
                return true;
            }else{
                return false;
            }    
        default:
            break;
    }
}

