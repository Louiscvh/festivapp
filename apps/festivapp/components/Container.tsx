import styled from 'styled-components';

const StyledPage = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export default function Container({children}) {
  return (
    <StyledPage>
      {children}
    </StyledPage>
  )
}
