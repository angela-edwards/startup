import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import './character.css';

export function Character() {
  return (
    <main className="character-page">
        <div className="character-container">
            <header>
                <h1>Create your character</h1>
                <p>design your protagonist.</p>
            </header>
            <img src="blank-profile-picture-973460_1280.jpg" width="400" height="400"/>
            <form id="character-form">
                <section className="character-section">
                    <label htmlFor="character-name">character name</label>
                    <input
                        type="text"
                        id="character-name"
                        name="characterName"
                        placeholder="enter character name"
                    />

                    <label htmlFor="character-personality">personality</label>
                    <select id="character-personality" name="personality">
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
                    />

                    <label htmlFor="intelligence">intelligence</label>
                    <input
                        type="number"
                        id="intelligence"
                        name="intelligence"
                        min="1"
                        max="10"
                    />

                    <label htmlFor="charisma">charisma</label>
                    <input
                        type="number"
                        id="charisma"
                        name="charisma"
                        min="1"
                        max="10"
                    />
                </section>

                <button type="submit">create character!</button>
                <Link to="/menu" className="btn primary-button game-button">continue!</Link>
            </form>
        </div>
    </main>
  );
}