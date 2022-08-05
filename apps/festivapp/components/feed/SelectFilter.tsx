import styled from "styled-components"
import { globalColors } from '../../pages/_app';


export default function Filter() {


    const StyledPage = styled.select`
        all: unset;
        background-color: ${globalColors.darkGrey};
        padding: 1rem 1.5rem;
        border-radius: 150px;
        font-family: 'Poppins', arial;
        cursor: pointer;
        &:hover {
          background-color: #cdcdcd;
      }
    `
  return (
    <StyledPage>
        <option selected disabled>Filter par festival</option>
        <option>Hellfest</option>
    </StyledPage>
  )
}
