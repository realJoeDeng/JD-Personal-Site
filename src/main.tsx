import React from 'react';
import ReactDOM from 'react-dom/client';
import Component from './App';
import './index.css';
import './aboutPatch';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>
);
