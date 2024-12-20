import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/back1.jpg'; // Update with your actual image name
import { color } from 'framer-motion';

export const Landing = () => {
  // Inline styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Align content to the left initially
    justifyContent: 'center',
    textAlign: 'left', // Align text to the left
    padding: '20px',
    height: '100vh', // Full viewport height
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white', // To ensure text is visible on the image
  };

  const headingStyle = {
    fontSize: '2.5rem',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Adds contrast for text on background
    color: 'black',
  };

  const paragraphStyle = {
    fontSize: '20px',
    lineHeight: '1.6',
    marginBottom: '30px',
    maxWidth: '900px',
    color: 'rgba(44, 42, 42, 0.7)', // Grey color for the paragraph text
    textShadow: 'none', // Removed text shadow for clearer text

  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-start', // Align buttons to the left
    gap: '15px',
  };

  const buttonStyle = {
    textDecoration: 'none',
    padding: '12px 25px',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#6c757d', // Grey color for the default button
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, background-color 0.3s ease',
  };

  const hoverButtonStyle = {
    backgroundColor: '#5a6268', // Darker grey color for hover state
  };

  // Adjust the content to be more to the right
  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Start from the left
    justifyContent: 'center',
    textAlign: 'left',
    paddingLeft: '50px', // Added padding to move content to the right
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={headingStyle}>Welcome to MuscleUp</h1>
        <p style={paragraphStyle}>
          At MuscleUp, we understand the importance of fueling your fitness journey with high-quality supplements.
          Explore our range of protein powders, creatine, and more to help you achieve your goals, whether you're
          building muscle, improving endurance, or maintaining peak performance.
        </p>
        <div style={buttonContainerStyle}>
          <Link
            to="/login"
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = hoverButtonStyle.backgroundColor;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = buttonStyle.backgroundColor;
            }}
          >
            Login
          </Link>
          <Link
            to="/signup"
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = hoverButtonStyle.backgroundColor;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = buttonStyle.backgroundColor;
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
