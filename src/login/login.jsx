import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import '../style.css';

export function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  
  async function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email.trim() || !password) {
        setMessage('Please enter your email and password.');
        return;
    }
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email.trim(),
                password: password
            })
        })
        if (!response.ok) {
            setMessage('invalid email or password.');
            return ;
        }
        const user = await response.json();

        localStorage.setItem('userName', user.username);

        const characterResponse = await fetch('/api/characters/me', {
            credentials: 'include'
        });

        if (characterResponse.ok) {
            navigate('/menu');
        } else if (characterResponse.status == 404) {
            navigate('/character');
        } else {
            setMessage('unable to retrieve your character.');
        }
    } catch (error) {
        console.error('Login error:', error);
        setMessage('unable to connect to the server.');
    }
  }
  // account creation
  async function handleSignup(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!username.trim() || !email.trim() || !password) {
        setMessage('Please fill in all the fields.');
        return;
    }

    try {
        const response = await fetch('/api/auth/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username: username.trim(),
                email: email.trim(),
                password: password
            })
        });

        const result = await response.json();

        if (!response.ok) {
            setMessage(result.msg || 'unable to create account.');
            return;
        }

        localStorage.setItem('userName', result.username);

        const account = {
            username: result.username,
            email: result.email
        };

        localStorage.setItem('account', JSON.stringify(account));

        navigate('/character');
    } catch (error) {
        console.error('Signup error:', error);
        setMessage('unable to connect to the server.');
    }
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
                    <label htmlFor="login-email" className="form-label">Email</label>
                    <input
                        type="text"
                        id="login-email"
                        name="email"
                        className="form-control"
                        placeholder="enter your email"
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