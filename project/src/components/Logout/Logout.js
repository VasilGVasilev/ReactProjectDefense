import { useNavigate } from 'react-router-dom'

import * as authService from '../../services/authService'

import { useEffect } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'

// del session on server, on client locStorage
export const Logout = () => {
    const navigate = useNavigate();
    const { user, userLogout } = useAuthContext();

    useEffect(()=>{
        authService.logout(user.accessToken) 
            .then(()=>{
                userLogout();
                navigate('/');
            })
            .catch(()=>{
                navigate('/');
            })
    })
    return null;
}
export default Logout;

