import { useState } from "react";
import { useNavigate } from "react-router-dom";

import signup from "../../utils/signup";

export default function SignupPage() {
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        username: "",
        password: "",
        loading: false
    })

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signup({ signupData, setSignupData, navigate })
    };

    return (
        <div>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={signupData.username}
                        onChange={e => setSignupData(prev => ({
                            ...prev,
                            username: e.target.value
                        }))}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={signupData.password}
                        onChange={e => setSignupData(prev => ({
                            ...prev,
                            password: e.target.value
                        }))}
                    />
                </div>
                <button type="submit">
                    {signupData.loading ? "....." : "Signup"}
                </button>
            </form>
        </div>
    )
}