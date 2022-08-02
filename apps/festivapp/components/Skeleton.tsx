import styled from "styled-components"

const StyledPage = styled.div`
    width: 100%;
    height: 100%;
    background-color: #E2E2E2;
    border-radius: 8px;
    animation: skeleton 1s ease-in-out infinite;
    @keyframes skeleton {
        0% {
            background-color: #E2E2E2;
        }
        50% {
            background-color: #F1F1F1;
        }
        100% {
            background-color: #E2E2E2;
        }
    }
`

export default function Skeleton({width, height}) {
  return (
    <StyledPage style={{maxWidth: `${width}px`, height: `${height}px`}}></StyledPage>
  )
}
