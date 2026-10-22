import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';
import './character.css';

export function Character() {
  const navigate = useNavigate();

  //store values
  const [characterName, setCharacterName] = useState('');
  const [personality, setPersonality] = useState('');
  const [strength, setStrength] = useState(5);
  const [intelligence, setIntelligence] = useState(5);
  const [charisma, setCharisma] = useState(5);
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (characterName.trim() === '' || personality === '') {
        setMessage('Please enter a name and select personality.');
        return;
    }

    const character = {
        name: characterName.trim(),
        personality: personality,
        strength: Number(strength),
        intelligence: Number(intelligence),
        charisma: Number(charisma)
    };

    localStorage.setItem('character', JSON.stringify(character));

    navigate('/menu');
  }

  return (
    <main className="character-page">
        <div className="character-container">
            <header>
                <h1>Create your character</h1>
                <p>design your protagonist.</p>
            </header>
            <img src="blank-profile-picture-973460_1280.jpg" width="400" height="400"/>
            <form id="character-form" onSubmit={handleSubmit}>
                <section className="character-section">
                    <label htmlFor="character-name">character name</label>
                    <input
                        type="text"
                        id="character-name"
                        name="characterName"
                        placeholder="enter character name"
                        value = {characterName}
                        onChange={(event) => setCharacterName(event.target.value)}
                        required
                    />

                    <label htmlFor="character-personality">personality</label>
                    <select 
                        id="character-personality" 
                        name="personality"
                        value = {personality}
                        onChange={(event) => setPersonality(event.target.value)}
                        required
                    >
                        <option value="">select a personality</option>
                        <option value="brave">brave</option>
                        <option value="kind">kind</option>
                        <option value="clever">clever</option>
                        <option value="confident">confident</option>
                        <option value="quiet">quiet</option>
                    </select>
                </section>

                <section className="character-section">
                    <h2>Character Stats</h2>
                    <label htmlFor="strength">strength</label>
                    <input
                        type="number"
                        id="strength"
                        name="strength"
                        min="1"
                        max="10"
                        value = {strength}
                        onChange={(event) => setStrength(event.target.value)}
                        required
                    />

                    <label htmlFor="intelligence">intelligence</label>
                    <input
                        type="number"
                        id="intelligence"
                        name="intelligence"
                        min="1"
                        max="10"
                        value = {intelligence}
                        onChange={(event) => setIntelligence(event.target.value)}
                        required
                    />

                    <label htmlFor="charisma">charisma</label>
                    <input
                        type="number"
                        id="charisma"
                        name="charisma"
                        min="1"
                        max="10"
                        value = {charisma}
                        onChange={(event) => setCharisma(event.target.value)}
                        required
                    />
                </section>

                {message && <p role='alert'>{message}</p>}

                <button type="submit" className="btn primary-button game-button">create character!</button>
            </form>
        </div>
    </main>
  );
}