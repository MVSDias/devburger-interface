import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 280px) 1fr;

  main {
    display: flex;
    flex-direction: column;
    flex: 1; // pra ocupar todo espaço disponível
    height: 110vh;
    width: 100%;
    background: ${(props) => props.theme.secondWhite};
    overflow-y: auto; // se precisar ter rolagem vertical
  }

  section {
    margin: 0 auto;
    padding: 40px 20px;
    max-width: 100%;
  }
`;
