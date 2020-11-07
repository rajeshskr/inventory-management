import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { initialize } from './localforageUtils';
import DataProvider from './localforageUtils/DataProvider';

initialize().then(() => {
  ReactDOM.render((
    <DataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataProvider>
  ), document.getElementById('root'));
});

serviceWorker.unregister();
