import React from 'react';
import { createRoot } from 'react-dom'; // Import createRoot
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// Use createRoot instead of ReactDOM.render
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
