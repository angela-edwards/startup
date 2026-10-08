import React from 'react';
import './menu.css';
import '../style.css';

export function Menu() {
  return (
    <main className="game-menu sunny">
        <header className="menu-header">
            <h1>Divergent Threads</h1>
            <p>Welcome back!</p>
            <p>player: [username]</p>
        </header>
        <section className="menu-card">
            <h2>current weather</h2>
    
            <p id="weather-status">
                weather: [loading]
            </p>
        
        </section>

        <div className="menu-content">
            <section className="menu-card">
                <h2>story</h2>
                <p>continue your current story or start a new one.</p>
                <button id="main-story-button" className="menu-button">
                    main story
                </button>
            </section>
            <section className="menu-card">
                <h2>character</h2>
                <p>view and edit your character</p>

                <button id="character-button" className="menu-button">my character</button>
            </section>
            <section className="menu-card">
                <h2>friends</h2>
                <p>join friend's game or invite friends to play.</p>
                <button id="friends-button" className="menu-button">friends</button>
            </section>
            <section className="menu-card">
                <h2>multiplayer game</h2>
                <p>shared story games will appear here.</p>
                <p id="multiplayer-status">connection: [not connected]</p>
            </section>
        </div>
    </main>
  );
}