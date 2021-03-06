import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.sass';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import store from './redux/store';
import 'emoji-mart/css/emoji-mart.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

