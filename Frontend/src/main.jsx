import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import './index.css'
import './styles/animations.css' // Add this import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
  </React.StrictMode>,
)
