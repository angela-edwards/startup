import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

export function Loading() {
  return (
    <main className="loading-page">
        <div className="loading-content">
            <h1>Divergent Threads</h1>

            <Link to="/login" className="btn primary-button game-button">Begin your story!</Link>
        </div>
    </main>
  );
}