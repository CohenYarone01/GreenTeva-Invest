import React from 'react'
import ReactDOM from 'react-dom/client'
import { FormspreeProvider } from '@formspree/react';
import App from './App.jsx'
import './index.css'

// Votre ID de projet fourni
const PROJECT_ID = "2925975540080835716";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FormspreeProvider project={PROJECT_ID}>
      <App />
    </FormspreeProvider>
  </React.StrictMode>,
)