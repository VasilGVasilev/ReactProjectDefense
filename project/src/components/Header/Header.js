import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

const Header = () => {
    const { user } = useAuthContext();
    return (
        <header className='header'>
            <h2 className='homeContainer'>
                <Link className="home" to="/">
                    Matches
                </Link>
            </h2>
            <nav className='linksContainer'>
                <Link to="/catalog">All matches</Link>
                {
                    user.email //if there is logged-in user show logged-in navs, if no show defualt to guest 
                        ?
                        <div id="user">
                            <Link to="/create">Create Match</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                        :
                        <div id="guest">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                }


            </nav>
        </header>
    );
}

export default Header;