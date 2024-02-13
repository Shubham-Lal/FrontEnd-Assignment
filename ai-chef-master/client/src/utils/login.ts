import { toast } from "sonner";

interface LoginProps {
    loginData: {
        username: string;
        password: string;
        loading: boolean;
    };
    setLoginData: React.Dispatch<React.SetStateAction<{
        username: string;
        password: string;
        loading: boolean;
    }>>;
    setLoginError: React.Dispatch<React.SetStateAction<{
        username: boolean;
        password: boolean;
    }>>;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setUser: (user: { id: string; username: string }) => void;
    navigate: (path: string) => void;
}

interface LoginResponse {
    success: boolean;
    username?: boolean;
    password?: boolean;
    msg: string;
    data?: {
        _id: string;
        username: string;
        token: string;
    };
}

const login = async ({
    loginData, setLoginData,
    setLoginError,
    setIsAuthenticated, setUser,
    navigate
}: LoginProps) => {
    setLoginError({
        username: false,
        password: false
    });

    if (!loginData.username.trim().length) {
        setLoginError(prev => ({
            ...prev,
            username: true
        }));
        toast.error('Enter your username');
        return;
    }
    else if (!loginData.password.trim().length) {
        setLoginError(prev => ({
            ...prev,
            password: true
        }));
        toast.error('Enter your password');
        return;
    }

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
                if (result.username) {
                    setLoginError(prev => ({
                        ...prev,
                        username: true
                    }));
                }
                else if (result.password) {
                    setLoginError(prev => ({
                        ...prev,
                        password: true
                    }));
                }
                toast.error(result.msg);
            }
        })
        .catch(err => {
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