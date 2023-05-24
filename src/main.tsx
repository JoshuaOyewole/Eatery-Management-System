
import ReactDOM from 'react-dom/client';
import './sass/main.scss'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';
import { Provider } from 'react-redux';
//import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';


let persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      </PersistGate>
      <App />
    </Provider>
  </BrowserRouter>


);

