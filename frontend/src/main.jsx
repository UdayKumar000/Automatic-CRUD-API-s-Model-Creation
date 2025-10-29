import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ModelDataContext from './contexts/ModelDataContext.jsx'

createRoot(document.getElementById('root')).render(
  <ModelDataContext>
    <App />
  </ModelDataContext>
)
