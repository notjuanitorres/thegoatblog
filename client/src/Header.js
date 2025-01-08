import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      setUserInfo(null);
    });
  }

  return (
    <header>
      <Link to="/" className="logo">The GOAT Blog</Link>
      <nav>
        {userInfo?.username ? (
          <>
            <span>Hello, {userInfo.username}!</span>
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