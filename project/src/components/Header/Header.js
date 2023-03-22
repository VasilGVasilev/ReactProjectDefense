import { Link } from 'react-router-dom'


const Header = () => {
    const user = {}
    return (
      <header className='header'>
        {/* Navigation */}
        <h2 className='homeContainer'>
          <Link className="home" to="/">
            Matches
          </Link>
        </h2>
        <nav className='linksContainer'>
          <Link to="/catalog">All matches</Link>
          {/* Logged-in users */}
          <div id="user">
            <Link to="/create">Create Match</Link>
            <Link to="/logout">Logout</Link>
          </div>
          {/* Guest users */}
          <div id="guest">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </nav>
      </header>
    );
}

export default Header;