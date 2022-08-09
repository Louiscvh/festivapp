//Style
import styled from "styled-components"

const StyledPage = styled.div`
    max-width: 800px;
    margin: 3rem auto;
    display: flex;
    align-items: flex-start;
    gap: 2rem;
`
export default function FeedContainer({children}) {
  return (
    <StyledPage>
      {children}
    </StyledPage>
  )
}
