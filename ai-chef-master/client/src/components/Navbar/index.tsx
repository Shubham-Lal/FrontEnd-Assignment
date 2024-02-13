import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { FaCircleChevronUp } from 'react-icons/fa6';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { AuthContext } from '../AuthProvider';
import useClickOutside from '../../hooks/useClickOutside';
import './style.css';

const Navbar = () => {
    const location = useLocation();
    const { isAuthenticating, isAuthenticated } = useContext(AuthContext);

    const menuRef = useRef(null);
    const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

    const [expand, setExpand] = useState<boolean>(false);
    const [menu, setMenu] = useState<boolean>(false);

    useClickOutside(menuRef, () => setMenu(false), toggleButtonRef.current || undefined);

    useEffect(() => {
        AOS.init();
    }, []);

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
                        {!isAuthenticating && (
                            <>
                                <div className='divider' />
                                {!isAuthenticated ? (
                                    <>
                                        <Link
                                            to='/signup'
                                            className={`nav-btn ${location.pathname === '/signup' && "active"}`}
                                            onClick={() => setExpand(false)}
                                        >
                                            Get Started
                                        </Link>

                                        <Link
                                            to='/login'
                                            className={`nav-btn ${location.pathname === '/login' && "active"}`}
                                            onClick={() => setExpand(false)}
                                        >
                                            Login
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to='/dashboard'
                                            className={`nav-btn ${location.pathname === '/dashboard' && "active"}`}
                                            onClick={() => setExpand(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            ref={toggleButtonRef}
                                            onClick={() => setMenu(!menu)}
                                            style={{ display: "flex", alignItems: "center" }}
                                        >
                                            <FaUserAlt size={25} fill='white' />
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => setExpand(!expand)}
                                    className={`expand-navbar-btn ${expand && "rotate"}`}
                                >
                                    <FaCircleChevronUp size={30} fill='white' />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {!isAuthenticating && expand && <ExpandMenu setExpand={setExpand} />}
            </div>

            {!isAuthenticating && menu && <Menu menuRef={menuRef} setMenu={setMenu} />}
        </>
    )
}

interface ExpandMenuProps {
    setExpand: React.Dispatch<React.SetStateAction<boolean>>
}

const ExpandMenu: React.FC<ExpandMenuProps> = ({ setExpand }) => {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);

    const [visible, setVisible] = useState(false);

    setTimeout(() => setVisible(true), 200);

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser({
            id: null,
            username: null
        });
        localStorage.removeItem('token');
        navigate('/');
        setExpand(false);
    }

    if (!visible) return null
    return (
        <div className='expand__container'>
            <Link
                to='/'
                data-aos="fade-left"
                className={`${location.pathname === '/' && "underline"}`}
                onClick={() => setExpand(false)}
            >
                Home
            </Link>
            <Link
                to='/about'
                data-aos="fade-right"
                className={`${location.pathname === '/about' && "underline"}`}
                onClick={() => setExpand(false)}
            >
                About
            </Link>
            {isAuthenticated && (
                <button data-aos="fade-up" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </div>
    )
}

interface MenuProps {
    menuRef: React.RefObject<HTMLDivElement>;
    setMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu: React.FC<MenuProps> = ({ menuRef, setMenu }) => {
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
        setMenu(false);
    }

    return (
        <div className='menu__container'>
            <div data-aos="fade-up" className='profile__menu' ref={menuRef}>
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