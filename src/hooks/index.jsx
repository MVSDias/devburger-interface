import { CartProvider } from './CartContext';
import { UserProvider } from './UserContext';

const AppProvider = ({ children }) => {
  // children representa os contextos que chegarão aqui
  // esse appprovider será usado no main.jsx envolvendo toda minha app p os contextos ficarem  disponiveis nela toda

  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  );
};

export default AppProvider;
