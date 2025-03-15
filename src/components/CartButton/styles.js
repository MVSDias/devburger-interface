import styled from "styled-components";

export const ContainerButton = styled.button`
background-color: ${(props) => props.theme.purple};
color: ${(props) => props.theme.white};
width: 100%;
height: 52px;
border: 0;
border-radius: 5px;
font-size: 30px;

&:hover {
    background-color: #${(props) => props.theme.SecondDarkPurple};  
}
`