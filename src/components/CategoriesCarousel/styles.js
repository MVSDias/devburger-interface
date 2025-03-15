import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  .carousel-item {
    padding: 40px;
  }

  .react-multiple-carousel__arrow--right {
    right: calc(4% + 10px);
    top: 54px;
  }
  .react-multiple-carousel__arrow--left {
    left: calc(4% + 10px);
    top: 54px;
  }
`;

export const Title = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: ${(props) => props.theme.purple};
  padding: 20px 0 12px;
  position: relative;
  text-align: center;
  margin: 0 40px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 56px;
    height: 4px;
    background-color: ${(props) => props.theme.purple};
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const ContainerItems = styled.div`
  background: url('${(props) => props.imageUrl}');
  background-position: center;
  background-size: cover;

  display: flex;
  align-items: center;
  padding: 20px 10px;
  width: 100%;
  height: 250px;
  border-radius: 20px;
  cursor: grab;

 
`;

export const CategoryButton = styled(Link)`
 color: ${(props) => props.theme.white};
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 22.5px;
    font-weight: 500;
    margin-top: 50px;
    text-decoration: none;

    &:hover {
      background-color:  ${(props) => props.theme.purple};
    }

`
