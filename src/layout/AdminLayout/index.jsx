import { Outlet, Navigate } from 'react-router-dom';
import { SideNavAdmin } from '../../components';
import { Container } from './styles';

export function AdminLayout() {
  const { admin: isAdmin } = JSON.parse(
    localStorage.getItem('devburger:userData'), // vou no localStorage, e recupero as informações de admin, converto pra objeto, pq no localStorage só string, e salvo em isAdmin
  );
  return isAdmin ? (
    <Container>
      <SideNavAdmin />
      <main>
        <section>
          <Outlet />
        </section>
      </main>
    </Container>
  ) : (
    <Navigate to="/login" /> // antes de renderizar o componente na tela faço uma verificação pra saber se é admin. Se for, vai pra Outlet e renderiza o conteúdo, se não vai pro login
  );
}
