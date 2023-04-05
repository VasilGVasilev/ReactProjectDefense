import { useAuthContext } from '../../contexts/AuthContext'
import { useState } from 'react'

import * as authService from '../../services/authService'

import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({});

    const { userLogin } = useAuthContext()
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        if(errors.length > 0){
            return;
        }
        authService.login(values.email, values.password)
            .then(authData => {
                userLogin(authData)
                navigate('/')
            })
    }

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value //we target by name due to state with multiple values, thus, need for constant //reusable
        }));
    };

    // Data validation

    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length < bound,
        }));
    };

    const validEmail = (e) => {
        const regex = /^(.+)@(.+)\.(.+)$/g;
        const found = values[e.target.name].match(regex);

        if(!found){
            setErrors(state => ({
                ...state,
                [e.target.name]: values[e.target.name]
            }));
        }
    };

    // Error msg disappears on retry
    const resetError = (e) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: ''
        }));
    
    };

    return(
        <section className='loginFormContainer'>
            <div className='formWrapper'>
                <span className='logo'>Login</span>
                <form onSubmit={onSubmit}>
                    <input  
                        onChange={changeHandler} 
                        value={values.email}
                        onBlur={(e) => validEmail(e)}  
                        onClick={(e) => resetError(e)} 
                        autoComplete="off" 
                        type="email" 
                        name="email" 
                        placeholder='email'
                    />
                    {errors.email &&
                        <p className="formError">
                            Enter valid email!
                        </p>
                    }
                    <input
                        onChange={changeHandler}
                        onBlur={(e) => minLength(e, 4)}  
                        onClick={(e) => resetError(e)} 
                        value={values.password}  
                        type="password" 
                        name="password" 
                        placeholder='password'
                    />
                    {errors.password &&
                        <p className="formError">
                            Password should be at least 4 characters long!
                        </p>
                    }
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