import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource-variable/inter'
import './styles/tokens.css'
import './styles/base.css'
import './styles/ui.css'
import './styles/layout.css'
import './styles/home.css'
import './styles/about.css'
import './styles/explore.css'
import './styles/scan.css'
import './styles/dispose.css'
import './styles/dashboard.css'
import App from './App.jsx'

// Flag that JS is available — scroll-reveal styles only apply when it is.
document.documentElement.classList.add('js')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
