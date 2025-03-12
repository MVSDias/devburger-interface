import styled from 'styled-components';
import BannerHome from '../../assets/banner-home.svg';
import Background from '../../assets/bg-login2.svg';

export const Banner = styled.div`
  background: url('${BannerHome}');
  background-position: center;
  background-size: cover;
  height: 480px;

  h1 {
    font-family: 'road rage', sans-serif;
    font-size: 80px;
    color: #f4f4f4;
    position: absolute;
    right: 14%;
    top: 20%;
  }
`;
export const Container = styled.section`
  background:
    linear-gradient(rgba(255, 255, 200, 0.1), rgba(255, 255, 200, 0.1)),
    url('${Background}');
  background-position: center;
  background-size: cover;

  height: 100%;
`;

