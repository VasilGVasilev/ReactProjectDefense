import { useNavigate } from 'react-router-dom'

import * as authService from '../../services/authService'

import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

// del session on server, on client locStorage
export const Logout = () => {
    const navigate = useNavigate();
    const { user, userLogout } = useContext(AuthContext);

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

