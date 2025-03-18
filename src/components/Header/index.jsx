import {
  Container,
  Content,
  BadgeIcon,
  HeaderLink,
  LinkContainer,
  Logout,
  Navigation,
  Options,
  Profile,
} from './styles';

import { UserCircle, ShoppingCart } from '@phosphor-icons/react';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import { useUser } from '../../hooks/UserContext';
import { useEffect, useState } from 'react';
import { useCart } from '../../hooks/CartContext';

export function Header() {
  const navigate = useNavigate();
  const { logout, userInfo } = useUser(); //pego o logout p sair e o userInfo para colocar o nome do usuário no header, dinamicamente.

  const { pathname } = useResolvedPath(); // o pathname mostra exatamente em q pagina estamos(caminho)

  const { cartProducts } = useCart();
  const [totalInCart, setTotalInCart] = useState(0);

  
  function logoutUser() {
    logout();
    navigate('/login');
  }  

  useEffect(() => {

    const totalItems = cartProducts.reduce((acc, item) => acc + item.quantity, 0);
    // console.log("Produtos no carrinho:", cartProducts);
    setTotalInCart(totalItems);
    console.log('Total de itens no carrinho:', totalItems);

  }, [cartProducts]); // Garante que o useEffect roda sempre que cartProducts mudar
  

  return (
    <Container>
      <Content>
        <Navigation>
          <div>
            <HeaderLink to="/" $isActive={pathname === '/'}>
              Home
            </HeaderLink>
            {/* // true se o pathname for igua a '/' */}
            <hr></hr>
            <HeaderLink to="/cardapio" $isActive={pathname === '/cardapio'}>
              Cardápio
            </HeaderLink>
            {/* // true se o pathname for igua a '/cardapio' */}
          </div>
        </Navigation>
        <Options>
          <Profile>
            <UserCircle />
            <div>
              <p>
                Olá, <span> {userInfo.name}</span>
              </p>
              <Logout onClick={logoutUser}>Sair</Logout>
            </div>
          </Profile>
          <LinkContainer>
            <HeaderLink to="/carrinho">
              <BadgeIcon badgeContent={totalInCart > 0 ? totalInCart : null}>
              {/* se a quantidade for zero  não vai mostrar nada no icone */}
                <ShoppingCart />
              </BadgeIcon>
            </HeaderLink>
          </LinkContainer>
        </Options>
      </Content>
    </Container>
  );
}
