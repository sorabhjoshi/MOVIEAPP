import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-nijfclxrx4sfxlnh.us.auth0.com"
    clientId="UYfRCrOAOZXLXWMc21j0fnnsjaQheULN"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
    </BrowserRouter>
    </Auth0Provider>
);

