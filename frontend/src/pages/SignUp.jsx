import React, { useState } from 'react';
import "../styles/AuthForms.css";

const PrintText = ()=> {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>This is some sample text printed by a React component.</p>
    </div>
  );
}


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const data = {
      username,
      email,
      password,
      confirmPassword
    };

    const url = "http://127.0.0.1:5000/api/sign-up";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        console.log("Sign up successful!");     
      } 
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Create your account</h1>

        {/* Social Signup */}
        <div className="social-buttons">
          <button className="social-button google">
            <img src="/google-icon.png" alt="Google icon" />
            Sign up with Google
          </button>
          <button className="social-button github">
            <img src="/github-icon.png" alt="GitHub icon" />
            Sign up with Github
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password with visibility toggle */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Terms & Conditions */}
          <div className="form-group checkbox">
            <input type="checkbox" id="terms" name="terms" />
            <label htmlFor="terms">I accept the Terms & Conditions</label>
          </div>

          <button type="submit" className="submit-button">
            SIGN UP
          </button>

          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>

        <p className="auth-switch">
          Already have an account? <a href="/login">LOG IN</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
