import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = () => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Not authenticated');
      })
      .then(userInfo => {
        setUsername(userInfo.username);
      })
      .catch(() => {
        setUsername(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      setUsername(null);
    });
  }

  if (loading) {
    return (
      <header>
        <Link to="/" className="logo">The GOAT Blog</Link>
        <nav>Loading...</nav>
      </header>
    );
  }

  return (
    <header>
      <Link to="/" className="logo">The GOAT Blog</Link>
      <nav>
        {username ? (
          <>
            <span>Hello, {username}!</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}