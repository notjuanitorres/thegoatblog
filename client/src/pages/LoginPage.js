// LoginPage.js
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          setIsLoggedIn(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      
      if (response.ok) {
        window.location.href = '/';
      } else {
        setError('Invalid credentials');
      }
    } catch (e) {
      setError('Invalid credentials');
    }
  }

  if (loading) {
    return null; // or a loading spinner if you prefer
  }

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      {error && <div className="error" style={{color: 'red', marginBottom: '20px'}}>{error}</div>}
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={ev => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
      />
      <button>Login</button>
    </form>
  );
}