import { useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext'

import * as authService from '../../services/authService'

import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const { userLogin } = useContext(AuthContext)
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        if (password != confirmPassword) {
            return; //stops onSubmit before passing on data to service
        }

        authService.register(email, password)
            .then(authData => {
                userLogin(authData)
                navigate('/')
            })
    }
    return (
        <section className='registerFormContainer'>
            <div className='formWrapper'>
                <span className='logo'>Register</span>
                <form onSubmit={onSubmit}>
                    <input  autocomplete="off" type="email" name="email" placeholder='email' />
                    <input type="password" name="password" placeholder='password' />
                    <input type="password" name="confirm-password" placeholder='repeat password' />

                    <button>Sign up</button>
                </form>
                <p>If you already have profile click <Link to="/login">here</Link></p>
            </div>
        </section>
    )
}

export default Register;