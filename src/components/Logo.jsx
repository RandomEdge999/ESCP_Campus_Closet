import React from 'react';

const Logo = ({ className = "" }) => (
  <svg 
    width="40" 
    height="40" 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <circle cx="35" cy="50" r="30" stroke="currentColor" strokeWidth="10" />
    <circle cx="65" cy="50" r="30" stroke="currentColor" strokeWidth="10" />
    <circle cx="65" cy="50" r="24" stroke="transparent" fill="none" />
    <path d="M 65 20 A 30 30 0 0 1 65 80" stroke="currentColor" strokeWidth="10" fill="none" />
  </svg>
);

export default Logo;

