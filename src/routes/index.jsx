import { Route, Routes } from 'react-router-dom';

import {
  Home,
  Cart,
  Login,
  Register,
  Menu,
  Checkout,
  CompletePayment,
  Orders,
  NewProduct,
  EditProduct,
  Products,
} from '../pages';

import { UserLayout } from '../layout/UserLayout';
import { AdminLayout } from '../layout/AdminLayout';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="/cardapio" element={<Menu />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/complete" element={<CompletePayment />} />
      </Route>
      
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="pedidos" element={<Orders />} />
        <Route path="novo-produto" element={<NewProduct />} />
        <Route path="editar-produto" element={<EditProduct />} />
        <Route path="produtos" element={<Products />} />
      </Route>
     
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
    </Routes>
  );
}
