import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';
import '../style.css';

export function Menu() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('Player');
  const [weather, setWeather] = useState('Loading weather...');
  const [weatherClass, setWeatherClass] = useState('sunny');
  const [connectionStatus, setConnectionStatus] = useState('not connected');

  useEffect(() => {
    const savedUsername = localStorage.getItem('userName');

    if (savedUsername) {
        setUsername(savedUsername);
    }

    // pretend weather data, later replace with API
    const mockWeather = {
        condition: 'Sunny',
        description: 'Sunny skies',
        background: 'sunny'
    };

    setWeather(mockWeather.description);
    setWeatherClass(mockWeather.background);

    setConnectionStatus('demo mode');
  }, []);

  const savedCharacter = localStorage.getItem('character');
  let characterName = '';

  if (savedCharacter) {
    const character = JSON.parse(savedCharacter);
    characterName = character.name;
  }

  return (
    <main className={`game-menu ${weatherClass}`}>
        <header className="menu-header">
            <h1>Divergent Threads</h1>
            <p>Welcome back, {username}!</p>

            {characterName && (<p>Character: {characterName}</p>)}
        </header>
        <section className="menu-card">
            <h2>current weather</h2>
    
            <p id="weather-status">
                weather: {weather}
            </p>
        
        </section>

        <div className="menu-content">
            <section className="menu-card">
                <h2>story</h2>
                <p>continue your current story or start a new one.</p>
                <button className="menu-button" onClick={() => navigate('/story')}>
                    main story
                </button>
            </section>
            <section className="menu-card">
                <h2>character</h2>
                <p>view and edit your character</p>

                <button className="menu-button" onClick={() => navigate('/character')}>my character</button>
            </section>
            <section className="menu-card">
                <h2>friends</h2>
                <p>join friend's game or invite friends to play.</p>
                <button className="menu-button" onClick={() => navigate('/friends')}>friends</button>
            </section>
            <section className="menu-card">
                <h2>multiplayer game</h2>
                <p>shared story games will appear here.</p>
                <p id="multiplayer-status">connection: {connectionStatus}</p>
                <button className="menu-button" onClick={() => navigate('/friends')}>explore</button>
            </section>
        </div>
    </main>
  );
}