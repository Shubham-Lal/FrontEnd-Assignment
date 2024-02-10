import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { FaCircleChevronDown } from 'react-icons/fa6';

import { AuthContext } from '../AuthProvider';
import './style.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useContext(AuthContext);

    const [expand, setExpand] = useState<boolean>(false);
    const authToken = localStorage.getItem('token');

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser({
            id: null,
            username: null
        });
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div id='navbar'>
            <div className={`background ${expand && "expand"}`} />

            <div className='navbar__container'>
                <Link to='/' className='logo__container'>
                    <img
                        className='logo'
                        src="/logo-transparent.png"
                        alt="logo"
                    />
                </Link>
                <div className='right__container'>
                    <Link
                        to='/'
                        className='home-btn'
                    >
                        Home
                    </Link>
                    <Link
                        to='/about'
                        className='about-btn'
                    >
                        About
                    </Link>
                    <div className='divider' />
                    {!authToken && (
                        <Link
                            to='/signup'
                            className='signup-btn'
                        >
                            Get Started
                        </Link>
                    )}
                    {location.pathname !== '/dashboard' ? (
                        <Link
                            to={!!authToken ? "/dashboard" : "/login"}
                            className='login-dashboard-btn'
                        >
                            {!!authToken ? "Dashboard" : "Login"}
                        </Link>
                    ) : (
                        <button
                            title='Logout'
                            onClick={handleLogout}
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <FaUserAlt size={25} fill='white' />
                        </button>
                    )}
                    <button
                        onClick={() => setExpand(!expand)}
                        className={`expand-navbar-btn ${expand && "rotate"}`}
                    >
                        <FaCircleChevronDown size={30} fill='white' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar