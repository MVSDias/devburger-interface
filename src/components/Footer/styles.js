import styled from "styled-components";

export const Container = styled.footer`
height: 49px;
background-color: #5c2569;
width: 100vw;
display: flex;
align-items: center;
justify-content: center;


p {
    color: ${(props) => props.theme.white};
    font-size: 14px;
    font-weight: 200;
}
`