import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import { HashRouter } from 'react-router-dom'


const root = createRoot(document.getElementById('root'));
  root.render(
    <StrictMode>
  <HashRouter>
  <AppContextProvider>
    <App />
    </AppContextProvider>
  </HashRouter>
  </StrictMode>
);
