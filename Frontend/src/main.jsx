import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Context_Cart_Provider from './contexts/Context_Cart.jsx'
import {BrowserRouter} from 'react-router-dom';
import Context_Products_Provider from './contexts/Context_Products.jsx'
import Context_User_Provider from './contexts/Context_User.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Context_Products_Provider>
    <Context_User_Provider>
      <Context_Cart_Provider>
        <BrowserRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </Context_Cart_Provider>
    </Context_User_Provider>
  </Context_Products_Provider>
  ,
)
