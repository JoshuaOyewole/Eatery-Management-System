
import ReactDOM from 'react-dom/client';
import './sass/main.scss'
import App from './App';
//import { Provider } from 'react-redux';
import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter } from 'react-router-dom';

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

