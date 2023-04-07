import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

const Header = () => {
    const { isAuthenticated, user } = useAuthContext();
    return (
        <header className='header'>
            <h2 className='homeContainer'>
                <Link className="home" to="/">
                    Matches
                </Link>
            </h2>
            <nav className='linksContainer'>
                {
                    isAuthenticated
                    ?
                    <div className='welcomePrompt'>{user.email}</div>
                    :
                    null
                }
                <Link to="/catalog">All matches</Link>
                {
                    isAuthenticated
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