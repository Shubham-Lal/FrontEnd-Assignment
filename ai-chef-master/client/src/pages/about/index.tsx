import './style.css';

export default function AboutPage() {
    return (
        <div id='about'>
            <div className='about__container'>
                <h1>About</h1>
                <div className='about-divider' />
                <div className='info'>
                    <p>
                        Embark on a culinary journey with us at AI Chef Master,
                        where our mission is to craft an AI-powered cooking platform that elevates convenience,
                        sparks creativity, and enhances the culinary experience for individuals globally.
                    </p>
                    <p>
                        Fueled by a team of passionate innovators, we are committed to delivering an unparalleled
                        cooking adventure through the seamless integration of modern technologies and intuitive interfaces.
                    </p>
                    <p>Join us in redefining the art of cooking!</p>
                    <p>#CulinaryInnovation #AICookingPlatform</p>
                </div>
            </div>
        </div>
    )
}