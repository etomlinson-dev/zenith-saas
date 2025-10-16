import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system" 
        enableSystem
        storageKey="zenith-theme"
        disableTransitionOnChange={false}
      >
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
