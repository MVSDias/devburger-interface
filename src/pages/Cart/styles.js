import styled from 'styled-components';
import Texture from '../../assets/texture.svg';
import Background from '../../assets/bg-login2.svg';

export const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.secondWhite};
  min-height: 100vh; // todo espaço disponível
  background:
    linear-gradient(rgba(255, 255, 200, 0.1), rgba(255, 255, 200, 0.1)),
    url('${Background}');
  background-position: center;
  background-size: cover;
`;
export const Banner = styled.div`
  background-image: url(${Texture});
  background-image: center;
  background-size: cover;
  background-color: ${(props) => props.theme.mainBlack};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 180px;
  img {
    height: 130px;
  }
`;
export const Title = styled.div`
  text-align: center;
  font-size: 32px;
  font-weight: 800;
  color: ${(props) => props.theme.green};
  padding-bottom: 12px; // separar o nome do traço embaixo
  position: relative; // pq o traço será position absolute

  &::after {
    content: '';
    width: 70px;
    height: 4px;
    background-color: ${(props) => props.theme.green};
    position: absolute;
    bottom: 0;
    left: 50%; // centraliza o traço embaixo
    transform: translateX(-50%); // centraliza o traço embaixo
  }
`;
export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 30%;
  width: 100%;
  max-width: 1280px;
  padding: 40px;
  margin: 0 auto;
  gap: 40px;
`;

