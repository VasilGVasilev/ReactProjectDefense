import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    
    return(
        <section className='authFormContainer'>
            <div className='formWrapper'>
                <span className='logo'>Login</span>
                <form>
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