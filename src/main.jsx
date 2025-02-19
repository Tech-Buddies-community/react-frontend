import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { store } from './store.js';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

console.log(`APP RUN ON PORT '${import.meta.env.VITE_APP_PORT}'`);
console.log(`LISTEN ON BACKEND URL '${import.meta.env.VITE_API_URL}'`);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <App />
      <ToastContainer position='top-right' />
  </Provider>
);