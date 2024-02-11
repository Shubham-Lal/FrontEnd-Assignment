import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../components/AuthProvider";
import signup from "../../utils/signup";
import "./style.css";

export default function SignupPage() {
    const { isAuthenticating } = useContext(AuthContext);
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        username: "",
        password: "",
        loading: false
    });
    const [signupError, setSignupError] = useState({
        username: false,
        password: false,
    });

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signup({ signupData, setSignupData, setSignupError, navigate })
    };

    if (isAuthenticating) return null;
    return (
        <form onSubmit={handleSignup} id="form">
            <div className="form__container">
                <img
                    src="/logo-transparent.png"
                    alt="logo"
                />
                <input
                    id="username"
                    type="text"
                    value={signupData.username}
                    onChange={e => setSignupData(prev => ({
                        ...prev,
                        username: e.target.value
                    }))}
                    placeholder="Your username"
                />
                <div
                    className="input-divider"
                    style={{
                        backgroundColor: signupError.username ? "red" : signupData.username ? "white" : "rgba(255, 255, 255, 0.25)"
                    }}
                />
                <input
                    id="password"
                    type="password"
                    value={signupData.password}
                    onChange={e => setSignupData(prev => ({
                        ...prev,
                        password: e.target.value
                    }))}
                    placeholder="Your password"
                />
                <div
                    className="input-divider"
                    style={{
                        backgroundColor: signupError.password ? "red" : signupData.password ? "white" : "rgba(255, 255, 255, 0.25)"
                    }}
                />
                <button type="submit" disabled={signupData.loading}>
                    {signupData.loading ? "....." : "Signup"}
                </button>
                <p className="terms-privacy-policy">
                    By creating an account, you agree and accept<br />
                    our <Link to='/'>Terms</Link> and <Link to='/'>Privacy Policy</Link>.
                </p>
                <div className="form-divider" />
                <div className="extras">
                    <p>Already have an account?</p>
                    <Link to='/login'>
                        Log in
                    </Link>
                </div>
            </div>
        </form>
    )
}