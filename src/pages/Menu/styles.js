import styled from 'styled-components';
import BannerHamburger from '../../assets/banner-burger.svg';
import Background from '../../assets/bg-login2.svg';


export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.secondWhite};

  background:
    linear-gradient(rgba(255, 255, 200, 0.1), rgba(255, 255, 200, 0.1)),
    url('${Background}');
`;
export const Banner = styled.div`
  background: url('${BannerHamburger}');
  background-position: center;
  background-size: cover;
  background-color: ${(props) => props.theme.mainBlack};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  position: relative;

  h1 {
    font-family: 'road rage', sans-serif;
    font-size: 80px;
    line-height: 65px;
    color: ${(props) => props.theme.white};

    position: absolute; // defino a posição exata com top, right, left, bottom. A div q o contem precisa ser position:relative.
    top: 30%;
    right: 20%;

    span {
      display: block;
      font-size: 20px;
    }
  }
`;
export const CategoryMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 30px;
`;
export const CategoryButton = styled.button`
  text-decoration: none;
  cursor: pointer;
  background: none;
  color:${props => props.$isActiveCategory ? (props) => props.theme.purple : '#696969'};
  font-size: 24px;
  font-weight: 500;
  padding-bottom: 5px;
  border: none;
  border-bottom: ${(props) => props.$isActiveCategory && '3px solid ${(props) => props.theme.purple}'};
`;

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 40px;
  justify-content: center;
  max-width: 1280px;
  gap: 60px;
  margin: 50px auto 0;
`;
