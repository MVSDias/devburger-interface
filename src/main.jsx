import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import GlobalStyles from './styles/globalStyles';
import AppProvider from './hooks';
import { Elements } from '@stripe/react-stripe-js';
import stripePromisse from './config/stripeConfig';
import { ThemeProvider } from 'styled-components';
import { standardTheme } from './styles/themes/standard';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={standardTheme}>
      <AppProvider>
        <Elements stripe={stripePromisse}>
          <RouterProvider router={router} />
          <GlobalStyles />
          <ToastContainer autoClose={2000} theme="colored" />
        </Elements>
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
);
