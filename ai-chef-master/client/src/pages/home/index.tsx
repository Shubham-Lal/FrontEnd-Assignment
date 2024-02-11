import './style.css';

export default function HomePage() {
    return (
        <div id='home'>
            <div className='home__container'>
                <video src="/home.mp4" muted autoPlay loop />
            </div>
        </div>
    )
}