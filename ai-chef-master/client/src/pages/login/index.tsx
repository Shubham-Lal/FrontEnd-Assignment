import { useContext, useState } from "react";
import { AuthContext } from "../../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LoginResponse {
    success: boolean;
    msg: string;
    data?: {
        _id: string;
        username: string;
        token: string;
    };
}

export default function LoginPage() {
    const { setIsAuthenticated, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username.trim().length) return;
        else if (!password.trim().length) return;

        setLoading(true);

        const CustomHeader = new Headers();
        CustomHeader.append('Content-Type', 'application/json')
        const config = {
            method: 'POST',
            headers: CustomHeader,
            body: JSON.stringify({ username, password })
        }

        await fetch(`${import.meta.env.VITE_SERVER_URL}/api/login`, config)
            .then(response => response.json())
            .then((result: LoginResponse) => {
                if (result.success && result.data) {
                    toast.success(result.msg);
                    setIsAuthenticated(true);
                    setUser({
                        id: result.data._id,
                        username: result.data.username
                    });
                    window.localStorage.setItem("token", result.data.token);
                    navigate('/dashboard');
                }
                else {
                    toast.error(result.msg);
                    setIsAuthenticated(false);
                }
            })
            .catch(err => {
                setIsAuthenticated(false);
                window.localStorage.removeItem("token");
                console.log(err);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">
                    {loading ? "....." : "Login"}
                </button>
            </form>
        </div>
    )
}