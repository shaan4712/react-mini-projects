import { useState } from 'react';

const DarkModeApp = () => {
  const [darkMode, setDarkMode] = useState(false);

  const containerStyle = {
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: darkMode ? '#333333' : '#ffffff',
    color: darkMode ? '#ffffff' : '#333333',
    transition: 'all 0.3s ease'
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: darkMode ? '#ffffff' : '#333333',
    color: darkMode ? '#333333' : '#ffffff',
    transition: 'all 0.3s ease'
  };

  const contentStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px'
  };

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <button 
          style={buttonStyle} 
          onClick={handleToggle}
        >
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
        
        <h1 style={{ marginTop: '20px' }}>
          Welcome to My App
        </h1>
        <p>
          This is a simple dark mode implementation in React.
        </p>
      </div>
    </div>
  );
};

export default DarkModeApp;