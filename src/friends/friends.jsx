import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './friends.css';
import '../style.css';

const startingFriends = [
    {
        id: 1,
        name: 'Alex',
        online: true
    },
    {
        id: 2,
        name: 'Jordan',
        online: true
    },
    {
        id: 3,
        name: 'Taylor',
        online: false
    }
];

export function Friends() {
    const [friends] = useState(startingFriends);

    const [selectedFriend, setSelectedFriend] = useState(startingFriends[0]);

    const [messageInput, setMessageInput] = useState('');

    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('dtMessages');

        if (savedMessages) {
            return JSON.parse(savedMessages);
        }

        return [
            {
                id: 1,
                friendId: 1,
                from: 'Alex',
                text: 'Hello'
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('dtMessages', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        if (!selectedFriend.online) {
            return;
        }

        const timer = setInterval(() => {
            const replies = [
                'I wonder what happens next',
                'yo this is crazy'
            ];

            const randomNumber = Math.floor(Math.random() * replies.length);

            const newMessage = {
                id: Date.now(),
                friendId: selectedFriend.id,
                from: selectedFriend.name,
                text: replies[randomNumber]
            };

            setMessages(previousMessages => [
                previousMessages, newMessage
            ]);
        }, 15000);

        return () => clearInterval(timer);
    }, [selectedFriend]);

    function sendMessage(event) {
        event.preventDefault();
        if (messageInput.trim() === '') {
            return;
        }

        const newMessage = {
            id: Date.now(),
            friendId: selectedFriend.id,
            from: 'You',
            text: messageInput
        };

        setMessages(previousMessages => [
            previousMessages, newMessage
        ]);
        
        setMessageInput('');
    }

    const chatMessages = messages.filter(message => {
        return message.friendId === selectedFriend.id;
    });

    return (
        <main className="friends-page container py-4">
            <h1>Friends</h1>
            
            <div className='row'>
                <section className="col-md-4 mb-3">
                    <h2>your friends</h2>

                    <div className="list-group">
                        {friends.map(friend => (
                            <button
                                key={friend.id}
                                className={'list-group-item list-group-item-action' + (selectedFriend.id === friend.id ? 'active' : '')}
                                onClick={() => setSelectedFriend(friend)}
                            >
                                {friend.name}
                                <span className="ms-2">{friend.online ? 'Online' : 'OFfline'}</span>
                            </button>
                        ))}
                    </div>
                </section>
            
                <section className="col-md-8">
                    <h2>Chat with {selectedFriend.name}</h2>

                    <div className="chat-messages">
                        {chatMessages.map(message => (
                            <div 
                                key={message.id} 
                                className="chat-message"
                            >
                                <strong>{message.from}: </strong>
                                {message.text}
                            </div>
                        ))}
                    </div>

                    {!selectedFriend.online && (
                        <p>this friend is offline.</p>
                    )}

                    <form onSubmit={sendMessage}>
                        <label htmlFor="messageInput">your message</label>

                        <input
                            id="messageInput"
                            type="text"
                            className="form-control"
                            value={messageInput}
                            onChange={event => setMessageInput(event.target.value)
                            }
                            placeholder="write a message..."
                        />

                        <button
                            type="submit"
                            className="btn btn-primary mt-2"
                        >send</button>
                    </form>
                </section>
            </div>
            <p className="mt-3">multiplayer is simulated for this page</p>

            <Link to="/menu" className="btn btn-secondary">return to menu</Link>

        </main>
    )
}