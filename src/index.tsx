import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './sass/main.scss'
import App from './App';
import {AuthProvider} from "react-auth-kit";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AuthProvider
  authType={'cookie'}
  authName={"_auth"}
  cookieDomain={window.location.hostname}
  cookieSecure={false}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>


);

