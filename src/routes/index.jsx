import { createBrowserRouter } from 'react-router-dom';

import { Home, Cart, Login, Register, Menu } from '../pages';
import { Header, Footer } from '../components';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: 'cardapio',
    element: (
      <>
        <Header />
        <Menu />
        <Footer />
      </>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <Register />,
  },
  {
    path: '/carrinho',
    element: <Cart />,
  },
]);
