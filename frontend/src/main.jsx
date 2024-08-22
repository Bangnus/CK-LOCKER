import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './routers';
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from '@material-tailwind/react';


ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
</Provider>,
)
