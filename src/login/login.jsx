import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import '../style.css';

export function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    if (!username.trim() || !password) {
        setMessage('Please enter your username and password.');
        return;
    }
    
    // temp demo login
    localStorage.setItem('userName', username.trim());

    navigate('/character');
  }

  // account creation
  function handleSignup(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!username.trim() || !email.trim() || !password) {
        setMessage('Please fill in all the fields.');
        return;
    }

    // save basic profile info, not password
    const account = {
        username: username.trim(),
        email: email.trim()
    };

    localStorage.setItem('account', JSON.stringify(account));
    localStorage.setItem('userName', username.trim());

    navigate('/character');
  }

  return (
    <main className="login-page">
        <div className="login-container">
            <header>
                <h1>Divergent Threads</h1>
            </header>
            {message && <p role='alert'>{message}</p>}
            <section className="mb-3">
                <h2>Login</h2>
                <form id="login-form" onSubmit={handleLogin}>
                    <label htmlFor="login-username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="login-username"
                        name="username"
                        className="form-control"
                        placeholder="enter your username"
                        required
                    />

                    <label htmlFor="login-password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        className="form-control"
                        placeholder="enter your password"
                        required
                    />

                    <button type="submit" className="game-button primary-button">Login</button>
                </form>
            </section>

            <section>
                <h2>Create an account</h2>
                <form id="signup-form" onSubmit={handleSignup}>
                    <label htmlFor="signup-username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="signup-username"
                        name="username"
                        className="form-control"
                        placeholder="choose a username"
                        required
                    />

                    <label htmlFor="signup-email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="signup-email"
                        name="email"
                        className="form-control"
                        placeholder="enter your email"
                        required
                    />
                    <label htmlFor="signup-password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="signup-password"
                        name="password"
                        className="form-control"
                        placeholder="create a password"
                        required
                    />
                    <button type="submit" className="game-button gold-button">
                        create account
                    </button>
                </form>
            </section>
        </div>
    </main>
  );
}