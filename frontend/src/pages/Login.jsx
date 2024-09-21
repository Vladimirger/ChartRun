import React, { useState } from 'react';
import '../styles/AuthForms.css';

const LoginPage = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Submit handler for form submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    const data = {
        username,
        password
    };

    const url = 'http://127.0.0.1:5000/api/login';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    console.log(data);
    const response = await fetch(url, options);
    console.log(response.message);

    if (response.status === 200) {
      // handle success
    } else {
      // handle error
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>LOG IN</h1>
        {/* Social sign-in buttons */}
        <div className="social-buttons">
          <button className="social-button google">
            <img src="/google-icon.png" alt="Google icon" />
            Sign in with Google
          </button>
          <button className="social-button github">
            <img src="/github-icon.png" alt="GitHub icon" />
            Sign in with GitHub
          </button>
        </div>

        {/* Login form */}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-button">LOG IN</button>
        </form>

        <p className="auth-switch">
          Don't have an account? <a href="/signup">SIGN UP</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
