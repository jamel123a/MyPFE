import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import store from './components/redux/store'
import { Provider } from 'react-redux';
ReactDOM.render(
  <React.StrictMode>

  <BrowserRouter>
  
      <Provider store ={store}>
          <App/>
      </Provider>
  
   
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


