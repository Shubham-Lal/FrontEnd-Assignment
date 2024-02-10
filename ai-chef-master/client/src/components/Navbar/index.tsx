import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCircleChevronDown } from 'react-icons/fa6';
import './style.css';

const Navbar = () => {
    const [expand, setExpand] = useState<boolean>(false);
    const authToken = localStorage.getItem('token');

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
                    <Link
                        to='/signup'
                        className='signup-btn'
                    >
                        {!authToken && "Get Started"}
                    </Link>
                    <Link
                        to={!!authToken ? "/dashboard" : "/login"}
                        className='login-dashboard-btn'
                    >
                        {!!authToken ? "Dashboard" : "Login"}
                    </Link>
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