import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize the navigate function

    async function register(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 200) {
            alert('Registration successful.');
            navigate('/'); // Redirect to the home page
        } else {
            alert('Registration failed.');
        }
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
            />
            <button>Register</button>
        </form>
    );
}
