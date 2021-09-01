import {useContext,useLayoutEffect} from 'react'
import UserContext from '../Context/User/UserContext'
import {useHistory} from 'react-router-dom'

const useAuth = () => {
    const {user} = useContext(UserContext)
    const history = useHistory()
    
    useLayoutEffect(()=>{
        !user.isAuth && history.push('/');
        if(user.isAuth){
            console.log(user.user.rol)
            console.log(history.location)
            switch  (history.location.pathname){
                case '/ventas':
                    user.user.rol === 'Contador' && history.push('/');
                    break;
                case '/inventario':
                    user.user.rol === 'Contador' && history.push('/');
                    break;
                case '/compra':
                    user.user.rol === 'Contador' && history.push('/');
                    break;
                case '/agenda':
                    user.user.rol === 'Contador' && history.push('/');
                    break;
                case '/clientes':
                    user.user.rol === 'Contador' && history.push('/');
                    break;
                case '/proveedores':
                    user.user.rol === 'Contador' && history.push('/');
                    break;
                case '/devolucion':
                    user.user.rol === 'Contador' && history.push('/');
                    break;
                case '/administracioncuentas':
                    user.user.rol !== 'Administrador' && history.push('/');
                    break;
                default:
                    break;
            }
        }
    },[user])
}

export default useAuth
