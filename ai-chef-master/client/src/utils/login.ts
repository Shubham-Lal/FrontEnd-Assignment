import { toast } from "sonner";

interface LoginProps {
    loginData: {
        username: string
        password: string
        loading: boolean
    };
    setLoginData: React.Dispatch<React.SetStateAction<{
        username: string;
        password: string;
        loading: boolean;
    }>>;
}

interface LoginResponse {
    success: boolean;
    msg: string;
    data?: {
        _id: string;
        username: string;
        token: string;
    };
}

const login = async (
    { loginData, setLoginData, setIsAuthenticated, setUser, navigate }: LoginProps &
    { setIsAuthenticated: Function, setUser: Function, navigate: Function }
) => {
    if (!loginData.username.trim().length) return toast.error('Enter your username');
    else if (!loginData.password.trim().length) return toast.error('Enter your password');

    setLoginData(prev => ({
        ...prev,
        loading: true
    }));

    const CustomHeader = new Headers();
    CustomHeader.append('Content-Type', 'application/json');

    const config = {
        method: 'POST',
        headers: CustomHeader,
        body: JSON.stringify({
            username: loginData.username,
            password: loginData.password
        })
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
        .finally(() => {
            setLoginData(prev => ({
                ...prev,
                loading: false
            }));
        });
};

export default login;