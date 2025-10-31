import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ModelDataContext from './contexts/ModelDataContext.jsx'
import AuthProvider from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <ModelDataContext>
      <App />
    </ModelDataContext>
  </AuthProvider>
)



