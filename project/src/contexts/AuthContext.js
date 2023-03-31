import { createContext, useContext } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage';


export const AuthContext = createContext();

// Why have provider -> not overclutter App component
export const AuthProvider = ({
    children
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {}); // 'auth' is a hardcoded key
    

    // Best Practice - wrap the state management function in a method, thus, delegating method control, not state management control
    const userLogin = (authData) => {
        setAuth(authData)
    }

    const userLogout = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider value={{
            user: auth, 
            userLogin, 
            userLogout, 
            isAuthenticated: !!auth.accessToken //!! makes the auth.accessToken a Boolean, if truthy -> false -> true; if falsy -> true -> false, thus, the double !!
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom Hook to not repeat useContext in every Component
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}
