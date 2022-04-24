import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import store from './components/redux/store'
import { Provider } from 'react-redux';
ReactDOM.render(
  <BrowserRouter>
  
      <Provider store ={store}>
          <App/>
      </Provider>
  
   
  </BrowserRouter>,
  document.getElementById('root')
);


