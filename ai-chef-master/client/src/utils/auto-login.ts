import { Dispatch, SetStateAction, useEffect } from "react";

interface useAutoLoginProps {
    isAuthenticating: boolean
    setIsAuthenticating: Dispatch<SetStateAction<boolean>>
    isAuthenticated: boolean
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
    setUser: React.Dispatch<React.SetStateAction<{
        id: string | null
        username: string | null
    }>>
}

export default function useAutoLogin({ isAuthenticating, setIsAuthenticating, isAuthenticated, setIsAuthenticated, setUser }: useAutoLoginProps) {
    const authToken = localStorage.getItem('token')!;

    useEffect(() => {
        const autoLogin = async () => {
            const CustomHeader = new Headers();
            CustomHeader.append('Content-Type', 'application/json');

            CustomHeader.append('Authorization', authToken);
            const config = {
                method: 'GET',
                headers: CustomHeader,
            }

            await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auto-login`, config)
                .then(response => response.json())
                .then(result => {
                    if (result.success && result.data) {
                        setUser({
                            id: result.data._id,
                            username: result.data.username
                        });
                        setIsAuthenticated(true);
                    }
                    if (!result.success) {
                        localStorage.removeItem('token');
                    }
                })
                .catch(() => {
                    localStorage.removeItem('token');
                })
                .finally(() => setIsAuthenticating(false));
        }

        if ((authToken === null || authToken === undefined || !authToken.length) && !isAuthenticated) {
            setIsAuthenticating(false);
        }
        else if (!!authToken && isAuthenticating && !isAuthenticated) {
            autoLogin();
        }
        else if (!isAuthenticated) {
            setIsAuthenticating(false);
        }
    }, [authToken, isAuthenticated, isAuthenticating, setIsAuthenticated, setIsAuthenticating, setUser]);
}
