import { useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext'

import * as authService from '../../services/authService'

import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const { userLogin } = useContext(AuthContext)
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');

        authService.login(email, password)
            .then(authData => {
                userLogin(authData)
                navigate('/')
            })
            .catch(()=>{
            })
    }
    return(
        <section className='loginFormContainer'>
            <div className='formWrapper'>
                <span className='logo'>Login</span>
                <form onSubmit={onSubmit}>
                    <input type="email" name="email" placeholder='email'/>
                    <input type="password" name="password" placeholder='password'/>
                    <button>Sign in</button>
                </form>
                <p>            
                    If you don't have profile click <Link to="/register">here</Link>
                </p>
            </div>
        </section>
    );
};

export default Login;