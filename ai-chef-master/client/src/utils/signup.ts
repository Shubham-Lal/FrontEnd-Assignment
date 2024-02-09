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
    }>>
}

interface SignupResponse {
    success: boolean;
    msg: string;
}

const signup = async (
    { signupData, setSignupData, navigate }: SignupProps &
    { navigate: Function }
) => {
    if (!signupData.username.trim().length) return toast.error('Create your username');
    else if (!signupData.password.trim().length) return toast.error('Create your password');

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
            else toast.error(result.msg);
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