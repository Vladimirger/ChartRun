import { useState } from "react";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null); // Added for error handling

    const onSubmit = async (e) => {
        e.preventDefault();

        const agree = document.getElementById("agree").checked === true;

        const data = {
            username,
            password,
            email,
            agree
        };
        const url = "http://127.0.0.1:5000/api/sign-up";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) { // Check if response is not ok
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json(); // Parse the response as JSON
            console.log(result); // Log the result for debugging

            // Handle success scenario here (e.g., show a success message)
        } catch (error) {
            console.error("Error:", error); // Log error to the console
            setError(error.message); // Set the error state to show error messages to the user
        }
    };

    return (
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
                <label>Agree to terms and conditions</label>
                <input type="checkbox" id="agree" />
            </div>
            <button type="submit">Submit</button>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
        </form>
    );
};

export default SignUp;
