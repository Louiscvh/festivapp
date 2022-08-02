import styled from "styled-components"
import CheckboxFilter from "./CheckboxFilter"
import SelectFilter from "./SelectFilter"

const StyledPage = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: 1rem;
`
export default function Filters() {
    const years = ['2020', "2021", "2022"]
    const festival = ["Hellfest", "Solidays"]
  return (
    <StyledPage>
      <CheckboxFilter datas={years} title="Filter par années"></CheckboxFilter>
      <CheckboxFilter datas={festival} title="Filter par festival"></CheckboxFilter>
    </StyledPage>
  )
}
