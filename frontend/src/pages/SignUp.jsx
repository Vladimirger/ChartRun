import { useState } from "react";
import "../styles/SignUp.css";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(null); // Added for error handling

    const onSubmit = async (e) => {
        e.preventDefault();


        const data = {
            username,
            password,
            confirmPassword,
            email,
        };
        const url = "http://127.0.0.1:5000/api/sign-up";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(url, options)
        console.log("ASD")
        console.log(response.status)
    };

    return (
        <div className="screen">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                    {error && <div style={{color: 'red'}}>{error}</div>} {/* Display error message */}
                </form>
            </div>
        </div>
    );
};

export default SignUp;
