import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext.jsx"
import { CourseProvider } from "./context/CourseContext.jsx"
import { BrowserRouter as Router } from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <CourseProvider>
        <App />
      </CourseProvider>
    </AuthProvider>
  </Router>
)
