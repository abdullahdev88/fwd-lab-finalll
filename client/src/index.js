/**
 * Index.js - React Application Entry Point
 * This file initializes the React application and renders
 * the root App component into the DOM
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

// Import Bootstrap CSS for responsive styling
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap Icons for icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import main App component
import App from './App';

// Get the root DOM element where React app will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component with StrictMode for development warnings
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
