import {useContext,useLayoutEffect} from 'react'
import UserContext from '../Context/User/UserContext'
import {useHistory} from 'react-router-dom'

const useAuth = () => {
    const {user} = useContext(UserContext)
    const history = useHistory()
    
    useLayoutEffect(()=>{
        !user.isAuth && history.push('/');
        if(user.isAuth){

            switch  (history.location){
                case '/ventas':
                    user.rol === 'Contador' && history.push('/');
                    break;
                case '/inventario':
                    user.rol === 'Contador' && history.push('/');
                    break;
                case '/compra':
                    user.rol === 'Contador' && history.push('/');
                    break;
                case '/agenda':
                    user.rol === 'Contador' && history.push('/');
                    break;
                case '/clientes':
                    user.rol === 'Contador' && history.push('/');
                    break;
                case '/proveedores':
                    user.rol === 'Contador' && history.push('/');
                    break;
                case '/administracioncuentas':
                    user.rol !== 'Administrador' && history.push('/');
                    break;
                default:
                    break;
            }
        }
    },[user])
}

export default useAuth
