
import ReactDOM from 'react-dom/client';
import './sass/main.scss'
import App from './App';
import { Provider } from 'react-redux';
//import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>


);

