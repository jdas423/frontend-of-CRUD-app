import React from 'react'
import ReactDOM from 'react-dom/client'
import RouterPaths from './routerpath'
import {store} from './js/store.js'
import { Provider } from 'react-redux';
import './css/index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
    <RouterPaths />
    </Provider>
  </BrowserRouter>,
)