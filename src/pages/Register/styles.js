import styled from 'styled-components';
import Background from '../../assets/bg-login1.svg';
import BackgroundLogin from '../../assets/bg-login2.svg';
import { Link as ReactLink } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;
export const LeftContainer = styled.div`
  background: url('${Background}');
  background-position: center;
  background-size: cover;

  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 50%;
  }
`;
export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 50%;

  background: url('${BackgroundLogin}');
  background-color: #1e1e1e;

  

  p {
    font-size: 18px;
    font-weight: 800;
    color: ${(props) => props.theme.white};

    a {
      text-decoration: underline;
    }
  }
`;
export const Title = styled.h2`
  font-family: 'Road Rage', sans-serif;
  font-size: 40px;
  color:  ${(props) => props.theme.purple};
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;


  input {
    width: 100%;
    border: none;
    height: 52px;
    border-radius: 5px;
    padding: 0 16px;
  }

  label {
    font-size: 18px;
    font-weight: 600;
    color: ${(props) => props.theme.white};
  }

  p {
    font-size: 14px;
    line-height: 80%;
    color: ${(props) => props.theme.darkRed};
    font-weight: 600;
    height: 10px; // para evitar q o input suba ao mostrar a mensagem de erro.
  }
`;

export const Link = styled(ReactLink)`
text-decoration: none;
color: ${(props) => props.theme.white};
`

export const Button = styled.button``;
