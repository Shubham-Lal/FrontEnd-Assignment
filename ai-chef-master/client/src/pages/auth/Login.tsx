import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../components/AuthProvider";
import login from "../../utils/login";
import "./style.css";

export default function LoginPage() {
    const { isAuthenticating, setIsAuthenticated, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
        loading: false
    });
    const [loginError, setLoginError] = useState({
        username: false,
        password: false
    });

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        login({ loginData, setLoginData, setLoginError, setIsAuthenticated, setUser, navigate });
    };

    if (isAuthenticating) return null;
    return (
        <form onSubmit={handleLogin} id="form">
            <div className="form__container">
                <img
                    src="/logo-transparent.png"
                    alt="logo"
                />
                <input
                    id="username"
                    type="text"
                    value={loginData.username}
                    onChange={e => setLoginData(prev => ({
                        ...prev,
                        username: e.target.value
                    }))}
                    placeholder="Enter username"
                />
                <div
                    className="input-divider"
                    style={{
                        backgroundColor: loginError.username ? "red" : loginData.username ? "white" : "rgba(255, 255, 255, 0.25)"
                    }}
                />
                <input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={e => setLoginData(prev => ({
                        ...prev,
                        password: e.target.value
                    }))}
                    placeholder="Enter password"
                />
                <div
                    className="input-divider"
                    style={{
                        backgroundColor: loginError.password ? "red" : loginData.password ? "white" : "rgba(255, 255, 255, 0.25)"
                    }}
                />
                <button type="submit" disabled={loginData.loading}>
                    {loginData.loading ? "....." : "Login"}
                </button>
                <div className="form-divider" />
                <div className="extras">
                    <p>New here?</p>
                    <Link to='/signup'>
                        Create account
                    </Link>
                </div>
            </div>
        </form>
    )
}