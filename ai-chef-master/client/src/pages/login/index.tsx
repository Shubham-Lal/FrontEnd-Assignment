import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../components/AuthProvider";
import login from "../../utils/login";

export default function LoginPage() {
    const { isAuthenticating, setIsAuthenticated, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
        loading: false
    });

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        login({ loginData, setLoginData, setIsAuthenticated, setUser, navigate });
    };

    if (isAuthenticating) return null;
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={loginData.username}
                        onChange={e => setLoginData(prev => ({
                            ...prev,
                            username: e.target.value
                        }))}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={loginData.password}
                        onChange={e => setLoginData(prev => ({
                            ...prev,
                            password: e.target.value
                        }))}
                    />
                </div>
                <button type="submit">
                    {loginData.loading ? "....." : "Login"}
                </button>
            </form>
        </div>
    )
}