import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // This imports your main App component

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
