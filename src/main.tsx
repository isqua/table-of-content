import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './index.css'

const appRootElement = document.getElementById('root');

if (!appRootElement) {
  throw new Error('No app root found');
}

ReactDOM.createRoot(appRootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
