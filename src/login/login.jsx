import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import '../style.css';

export function Login() {
  return (
    <main className="login-page">
        <div className="login-container">
            <header>
                <h1>Divergent Threads</h1>
            </header>
            <section className="mb-3">
                <h2>Login</h2>
                <form id="login-form">
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
                <form id="signup-form">
                    <label htmlFor="signup-username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="signup-username"
                        name="username"
                        className="form-control"
                        placeholder="choose a username"
                    />

                    <label htmlFor="signup-email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="signup-email"
                        name="email"
                        className="form-control"
                        placeholder="enter your email"
                    />
                    <label htmlFor="signup-password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="signup-password"
                        name="password"
                        className="form-control"
                        placeholder="create a password"
                    />
                    <button type="submit" className="game-button gold-button">
                        create account
                    </button>
                    <Link to="/character" className="btn primary-button game-button">continue!</Link>
                </form>
            </section>
        </div>
    </main>
  );
}