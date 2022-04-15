import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import DataProvider from './components/redux/store'
ReactDOM.render(
  <BrowserRouter>
   <DataProvider>
      <App/>
   </DataProvider>
   
  </BrowserRouter>,
  document.getElementById('root')
);


