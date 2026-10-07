import React from 'react';
import './style.css';

export function Loading() {
  return (
    <main className="loading-page">
        <div className="loading-content">
            <h1>Divergent Threads</h1>

            <a href="/login" className="btn primary-button game-button">Begin your story!</a>
        </div>
    </main>
  );
}