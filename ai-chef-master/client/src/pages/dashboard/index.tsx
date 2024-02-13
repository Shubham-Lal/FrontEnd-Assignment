import { useContext } from 'react';
import { AuthContext } from '../../components/AuthProvider';
import './style.css';

export default function DashboardPage() {
    const { isAuthenticating } = useContext(AuthContext);

    if (isAuthenticating) return null;
    return (
        <div id='dashboard'>
            <div className='dashboard__container'>
                <video src="/dashboard.mp4" muted autoPlay loop />
            </div>
        </div>
    )
}