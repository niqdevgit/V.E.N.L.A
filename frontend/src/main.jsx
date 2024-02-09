import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  </Router>
)
