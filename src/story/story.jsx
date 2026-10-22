import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import './story.css';
import '../style.css';

const storyScenes = {
    beginning: {
        title: 'Who am I?',
        text: 'You wake up in a dark room. A screen on the wall tells you exactly who you are supposed to be.',
        choices: [
            {
                text: 'Follow the instructions on the screen.',
                nextScene: 'follow'
            },
            {
                text: 'Ignore the screen and explore the room.',
                nextScene: 'explore'
            }
        ]
    },

    follow: {
        title: 'The Perfect Role',
        text: 'You follow the instructions and enter a bright hallway. Everyone smiles at you, but their expressions seem rehearsed. You notice a locked door marked with a symbol you have never seen before.',
        choices: [
            {
                text: 'Ask someone about the locked door.',
                nextScene: 'question'
            },
            {
                text: 'Try to find another way inside.',
                nextScene: 'secret'
            }
        ]
    },

    explore: {
        title: 'Behind the Walls',
        text: 'not written yet',
        choices: [
            {
                text: 'Take the note and leave quickly.',
                nextScene: 'secret'
            },
            {
                text: 'Wait and see who enters.',
                nextScene: 'question'
            }
        ]
    },

    question: {
        title: 'Uncomfortable Answers',
        text: 'to be written',
        choices: [
            {
                text: 'Follow them.',
                nextSCene: 'secret'
            },
            {
                text: 'Investigate the symbol yourself.',
                nextScene: 'ending'
            }
        ]
    },

    secret: {
        title: 'The Hidden Truth',
        text: 'to be written',
        choices: [
            {
                text: 'Keep searching.',
                nextScene: 'ending'
            },
            {
                text: 'Leave before anyone finds you.',
                nextScene: 'question'
            }
        ]
    },

    ending: {
        title: 'Your Story Has Begun',
        text: 'to be written',
        choices: []
    }
};

export function Story() {
    //load saved scene or start at beginning
    const [currentState, setCurrentScene] = useState(() => {
        const savedScene = localStorage.getItem('dtCurrentScene');

        if (savedScene && storyScenes[savedScene]) {
            return savedScene;
        }

        return 'beginning';
    });

    //keeps track of scenes
    const [visitedSCenes, setVisitedSCenes] = useState(() => {
        const savedScenes = localStorage.getItem('dtVistedScenes');

        if (savedScenes) {
            return JSON.parse(savedScenes);
        }
        return ['beginning'];
    });

    useEffect(() => {
        localStorage.setItem('dtCurrentScene', currentScene);
        localStorage.setItem('dtVisitedScenes', JSON.stringify(visistedScenes));
    }, [currentScene, visitedScenes]);

    //move to scene selected by player
    function chooseScene(nextScene) {
        setCurrentScene(nextScene);

        if (!visitedScenes.includes(nextScene)) {
            setVisistedScenes([...visitedScenes, nextScene]);
        }
    }

    //restart
    function restartStory() {
        setCurrentScene('beginning');
        setVisitedSCenes(['beginning']);
    }

    const scene = storyScenes[currentScene];

    return (
        <main className="story-page container py-4">
            <h1>Divergent Threads</h1>
            <p>Discover the truth behind your assigned role.</p>

            <section className="story-container">
                <h2>{scene.title}</h2>
                <p>{scene.text}</p>

                {scene.choices.length > 0 ? (
                    <div className="story-choices">
                        {scene.choices.map((choice, index) => (
                            <button
                                key={index}
                                className="btn btn-primary m-2"
                                onClick={() => chooseScene(choice.nextScene)}
                            >
                                {choice.text}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div>
                        <p>You have reached the end of this chapter!</p>

                        <button className="btn btn-primary" onClick={restartStory}>Play again</button>
                    </div>
                )}

                <p>
                    Scenes discovered: {visitedScenes.length}
                </p>
            </section>

            <Link to="/menu" className="btn btn-secondary mt-3">
                Return to menu
            </Link>
        </main>
    );
}