import React from 'react'
import ReactDOM from 'react-dom/client'

import styles from './App.module.css'
import App from './App.tsx'

const appRootElement = document.getElementById('root')

if (!appRootElement) {
    throw new Error('No app root found')
}

appRootElement.classList.add(styles.app)

ReactDOM.createRoot(appRootElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
