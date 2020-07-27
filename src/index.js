import React from 'react';
import {render} from 'react-dom';
import './tailwind.css';


import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App';
import * as serviceWorker from './serviceWorker';
// optional cofiguration

const options = {
  position: 'top right',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}



const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
)

render(<Root />, document.getElementById('root'))
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
