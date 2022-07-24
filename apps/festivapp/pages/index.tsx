import styled from 'styled-components';
import Container from '../components/Container';
import Header from '../components/Header';

const StyledPage = styled.div`
  
`;

export function Index() {
  return (
    <StyledPage>
      <Header />
      <Container>
        <h1>Hello World</h1>
      </Container>
    </StyledPage>
  );
}

export default Index;
