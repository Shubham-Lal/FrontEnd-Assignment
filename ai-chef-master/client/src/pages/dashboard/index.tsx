import './style.css';

export default function DashboardPage() {
    return (
        <div id='dashboard'>
            <div className='dashboard__container'>
                <video src="/dashboard.mp4" muted autoPlay loop />
            </div>
        </div>
    )
}