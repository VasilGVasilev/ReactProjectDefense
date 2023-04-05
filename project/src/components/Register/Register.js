import { useAuthContext } from '../../contexts/AuthContext'
import { useState } from 'react'

import * as authService from '../../services/authService'

import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({});

    const { userLogin } = useAuthContext()
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();


        
        if(errors.length > 0){
            return; //stops onSubmit before passing on data to service
        }
        authService.register(values.email, values.password)
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

    const minLengthmisMatch = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length < bound,
        }));
        if (values.password != values.confirmPassword) {
            setErrors(state => ({
                ...state,
                mismatch: 'mismatch'
            }))
        }
    } 

    // Error msg disappears on retry
    const resetError = (e) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: '',
            mismatch: ''
        }));
    };

    return (
        <section className='registerFormContainer'>
            <div className='formWrapper'>
                <span className='logo'>Register</span>
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
                        value={values.password} 
                        onBlur={(e) => minLength(e, 4)}  
                        onClick={(e) => resetError(e)}
                        type="password" 
                        name="password" 
                        placeholder='password'
                    />
                    {errors.password &&
                        <p className="formError">
                            Password should be at least 4 characters long!
                        </p>
                    }
                    <input
                        onChange={changeHandler} 
                        value={values.confirmPassword}  
                        onBlur={(e) => minLengthmisMatch(e, 4)}
                        onClick={(e) => resetError(e)}
                        type="password" 
                        name="confirmPassword" 
                        placeholder='repeat password'
                    />
                    {errors.confirmPassword &&
                        <p className="formError">
                            Repeated password should be at least 4 characters long!
                        </p>
                    }
                    {errors?.mismatch &&
                        <p className="formError">
                            Repeated password should match password!
                        </p>
                    }
                    <button>Sign up</button>
                </form>
                <p>If you already have profile click <Link to="/login">here</Link></p>
            </div>
        </section>
    )
}

export default Register;