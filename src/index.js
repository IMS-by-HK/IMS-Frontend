import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/login';
import Main from './components/main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
