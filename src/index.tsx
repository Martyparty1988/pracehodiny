import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppLayout from './AppLayout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppLayout />
  </React.StrictMode>
);
