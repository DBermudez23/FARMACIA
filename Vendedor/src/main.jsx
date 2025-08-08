import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import VendedorContextProvider from './context/VendedorContext.jsx';
import AppContextProvider from './context/AppContext.jsx';


createRoot(document.getElementById('root')).render(
  <VendedorContextProvider>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </VendedorContextProvider>,
)
