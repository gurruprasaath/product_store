import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../style.css";

const Navbar = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-title">
          <Link to="/">Product Store 🛒</Link>
        </div>
        <div className="navbar-buttons">
          <Link to="/create">
            <button className="create-btn">+</button>
          </Link>
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark Mode' : '🌞 Light Mode'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
