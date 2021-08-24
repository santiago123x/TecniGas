import {useContext,useEffect} from 'react'
import UserContext from '../Context/User/UserContext'
import {useHistory} from 'react-router-dom'

const useAuth = () => {
    const {user} = useContext(UserContext)
    const history = useHistory()
    
    useEffect(()=>{
        !user.isAuth && history.push('/')
    },[user])
}

export default useAuth
