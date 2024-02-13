import { PropsWithChildren, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from './AuthProvider';

export default function ProtectedRoute({ children }: PropsWithChildren) {
    const { isAuthenticating, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPage, setShowPage] = useState('');
    const addressURL = location.pathname === '/dashboard' ? '/login' : location.pathname;

    useEffect(() => {
        if (isAuthenticating) setShowPage('loading');
        else if (!isAuthenticated) setShowPage('auth-page');
        else if (isAuthenticated) setShowPage('dashboard-page');

        if (showPage === 'auth-page') {
            navigate(addressURL, { replace: true });
        }
        else if (showPage === 'dashboard-page') {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticating, isAuthenticated, showPage, navigate, addressURL]);

    if (showPage === 'loading') return null;
    return children;
}
