import styled from 'styled-components';

const StyledPage = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export default function Container({children}) {
  return (
    <StyledPage>
      {children}
    </StyledPage>
  )
}
