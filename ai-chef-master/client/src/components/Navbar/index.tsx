import { useContext, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { FaCircleChevronUp } from 'react-icons/fa6';

import { AuthContext } from '../AuthProvider';
import './style.css';
import useClickOutside from '../../hooks/useClickOutside';

const Navbar = () => {
    const menuRef = useRef(null);
    const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

    const [expand, setExpand] = useState<boolean>(false);
    const [menu, setMenu] = useState<boolean>(false);
    const authToken = localStorage.getItem('token');

    useClickOutside(menuRef, () => setMenu(false), toggleButtonRef.current || undefined);

    return (
        <>
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
                                className={`signup-btn ${location.pathname === '/signup' && "active"}`}
                            >
                                Get Started
                            </Link>
                        )}
                        {location.pathname !== '/dashboard' ? (
                            <Link
                                to={!!authToken ? "/dashboard" : "/login"}
                                className={`login-dashboard-btn ${location.pathname === '/login' && "active"}`}
                            >
                                {!!authToken ? "Dashboard" : "Login"}
                            </Link>
                        ) : (
                            <button
                                ref={toggleButtonRef}
                                title='Logout'
                                onClick={() => setMenu(!menu)}
                                style={{ display: "flex", alignItems: "center" }}
                            >
                                <FaUserAlt size={25} fill='white' />
                            </button>
                        )}
                        <button
                            onClick={() => setExpand(!expand)}
                            className={`expand-navbar-btn ${expand && "rotate"}`}
                        >
                            <FaCircleChevronUp size={30} fill='white' />
                        </button>
                    </div>
                </div>
            </div>
            {menu && <Menu menuRef={menuRef} />}
        </>
    )
}

interface MenuProps {
    menuRef: React.RefObject<HTMLDivElement>;
}

const Menu: React.FC<MenuProps> = ({ menuRef }) => {
    const navigate = useNavigate();
    const { setIsAuthenticated, user, setUser } = useContext(AuthContext);

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
        <div className='menu__container'>
            <div className='profile__menu' ref={menuRef}>
                <p>Hello, {user.username}</p>
                <button
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar