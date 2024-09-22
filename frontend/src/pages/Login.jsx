import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForms.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Submit handler for form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password
    };

    const loginUrl = 'http://127.0.0.1:5000/api/login';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const loginResponse = await fetch(loginUrl, options);
      const loginResult = await loginResponse.json();

      if (loginResponse.status === 200) {
        console.log('Login successful:', loginResult.message);

        // Call flow logic in the backend
        const flowResponse = await fetch('http://127.0.0.1:5000/api/home', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const flowResult = await flowResponse.json();
        if (flowResponse.status === 200 && flowResult.redirectTo) {
          // Redirect based on backend flow response
          navigate(flowResult.redirectTo);
        }
      } else {
        console.error('Login failed:', loginResult.message);
        alert('Login failed: ' + loginResult.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
      <h1>Sign in to your account</h1>
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

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                {showPassword ? '-' : '+'}
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
