import { navLinks } from './navLinks';
import Logo from '../../assets/logo.svg';
import { SignOut } from '@phosphor-icons/react';
import { Container, Footer, NavLink, NavLinkContainer } from './styles';
import { useUser } from '../../hooks/UserContext';
import { useResolvedPath } from 'react-router-dom';

export function SideNavAdmin() {
  const { logout } = useUser();
  const { pathname } = useResolvedPath(); // mostra a rota atual(aonde estou)

  console.log(pathname);
  return (
    <Container>
      <img src={Logo} alt="logo-devburger" />
      <NavLinkContainer>
        {navLinks.map((link) => (
          <NavLink 
          key={link.id} 
          to={link.path}
          $isActive={pathname === link.path} // comparo minha rota atual com o link clicado. Se for igual está ativa. mando essa informação pro styled-components
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </NavLinkContainer>
      <Footer>
        <NavLink to="/login" onClick={logout}>
          <SignOut />
          <span>Sair</span>
        </NavLink>
      </Footer>
    </Container>
  );
}
