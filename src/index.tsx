import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './sass/main.scss'
import App from './App';
import {AuthProvider} from "react-auth-kit";
import { Provider } from 'react-redux';
import store from './redux/store';

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
    <Provider store={store}>
    <App />
    </Provider>
    
    </BrowserRouter>
  </AuthProvider>


);

