import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  height: 100vh;
  background-color: ${(props) => props.theme.black};
  img {
    width: 60%;
    margin: 40px 0;
  }
`;
export const NavLinkContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: all 200ms;
  
`;
export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  text-decoration: none;
  color: ${(props) => props.theme.white};
  background: ${(props) => props.$isActive ? props.theme.purple : 'transparent'};

  &:hover {
    background-color: ${(props) => props.theme.purple};
  }
`;
export const Footer = styled.footer`
  width: 100%;
  margin-top: auto; // coloca o footer lá embaixo
`;
