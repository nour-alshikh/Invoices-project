import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Provider } from 'react-redux'
import store from './rtk'
import { PersistGate } from 'redux-persist/es/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import { BrowserRouter as Router } from 'react-router-dom'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <App />
          </LocalizationProvider>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
