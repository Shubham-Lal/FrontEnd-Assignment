import { toast } from "sonner";

interface SignupProps {
    signupData: {
        username: string;
        password: string;
        loading: boolean;
    };
    setSignupData: React.Dispatch<React.SetStateAction<{
        username: string;
        password: string;
        loading: boolean;
    }>>;
    setSignupError: React.Dispatch<React.SetStateAction<{
        username: boolean;
        password: boolean;
    }>>;
    navigate: (path: string) => void;
}

interface SignupResponse {
    success: boolean;
    username?: boolean;
    password?: boolean;
    msg: string;
}

const signup = async ({
    signupData, setSignupData,
    setSignupError,
    navigate
}: SignupProps) => {
    setSignupError({
        username: false,
        password: false
    });

    if (!signupData.username.trim().length) {
        setSignupError(prev => ({
            ...prev,
            username: true
        }))
        toast.error('Create your username');
        return;
    }
    else if (!signupData.password.trim().length) {
        setSignupError(prev => ({
            ...prev,
            password: true
        }))
        toast.error('Create your password');
        return;
    }

    setSignupData(prev => ({
        ...prev, loading: true
    }));

    const CustomHeader = new Headers();
    CustomHeader.append('Content-Type', 'application/json');

    const config = {
        method: 'POST',
        headers: CustomHeader,
        body: JSON.stringify({
            username: signupData.username.trim(),
            password: signupData.password.trim()
        })
    }

    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/signup`, config)
        .then(response => response.json())
        .then((result: SignupResponse) => {
            if (result.success) {
                toast.success(result.msg);
                navigate('/login');
            }
            else {
                if (result.username) {
                    setSignupError(prev => ({
                        ...prev,
                        username: true
                    }))
                }
                else if (result.password) {
                    setSignupError(prev => ({
                        ...prev,
                        password: true
                    }))
                }
                toast.error(result.msg);
            }
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setSignupData(prev => ({
                ...prev,
                loading: false
            }));
        });
};

export default signup;