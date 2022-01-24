import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from "./components/context/Context"

ReactDOM.render(
    <Context>
      <App />
    </Context>,
  document.getElementById('root')
);
