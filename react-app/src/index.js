import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from "./store/configureStore"
import { Provider } from 'react-redux';


const initialState = {}

const store = configureStore(initialState);

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
     <App />
  </Provider>
   ,
  // </React.StrictMode>,
  document.getElementById('root')
);
