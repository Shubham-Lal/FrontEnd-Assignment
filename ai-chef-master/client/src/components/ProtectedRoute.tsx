import { PropsWithChildren, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticating, setIsAuthenticating, isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const authToken = localStorage.getItem('token')!;
    const addressURL = location.pathname === '/dashboard' ? '/login' : location.pathname;

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
                        navigate('/dashboard', { replace: true });
                    }
                    if (!result.success) navigate('/login', { replace: true });
                })
                .catch(() => navigate('/login', { replace: true }))
                .finally(() => setIsAuthenticating(false));
        }

        if ((authToken === null || !authToken.length) && !isAuthenticated) {
            setIsAuthenticating(false);
            navigate(addressURL, { replace: true });
        }
        else if (!!authToken && isAuthenticating && !isAuthenticated) autoLogin();
        else if (!isAuthenticated) navigate(addressURL, { replace: true });

    }, [isAuthenticated, isAuthenticating, authToken, setIsAuthenticating, setIsAuthenticated, setUser, navigate, addressURL]);

    return children;
}
