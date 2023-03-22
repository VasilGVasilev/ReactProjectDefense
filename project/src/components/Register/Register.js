import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    return(
        <section className='authFormContainer'>
            <div className='formWrapper'>
                <span className='logo'>Register</span>
                <form>
                    <input type="email" name="email" placeholder='email'/>
                    <input type="password" name="password" placeholder='password'/>
                    <input type="password" name="confirm-password" placeholder='repeat password'/>
                    
                    <button>Sign up</button>
                </form>
                <p>If you already have profile click <Link to="/login">here</Link></p>
            </div>
        </section>
    )
} 

export default Register;