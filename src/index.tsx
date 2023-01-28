import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <Provider store={store}>
  <App/>
  </Provider>
 
);


