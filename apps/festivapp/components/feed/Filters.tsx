import { useState } from "react"
import styled from "styled-components"
import CheckboxFilter from "./CheckboxFilter"
import SelectFilter from "./SelectFilter"

const StyledPage = styled.div`
    
    display: flex;
    align-items: center;
    gap: 0.6rem;
    .filters__container, .filters__active {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-top: 1rem;
    }
`
export default function Filters({activeFilters, setActiveFilters}) {
    const years = ['2020', "2021", "2022"]
    const festival = ["Hellfest", "Solidays"]

    const handleRemoveFilter = (e, filter) => {
      console.log(filter)
      e.preventDefault()
      const newActiveFilter = activeFilters.filter(active => active.value != filter)
      setActiveFilters(newActiveFilter)
    }
  return (
    <StyledPage>
      <div className="filters__container">
        <CheckboxFilter activeFilters={activeFilters} setActiveFilters={setActiveFilters} datas={years} title="années" fieldTarget='createAt'></CheckboxFilter>
        <CheckboxFilter activeFilters={activeFilters} setActiveFilters={setActiveFilters} datas={festival} title="festival" fieldTarget='festival.name'></CheckboxFilter>
      </div>
      <div className="filters__active">
        {activeFilters.map((filter, index) => (
          <p onClick={(e) => handleRemoveFilter(e, filter.value)} key={index}>{filter.value} X</p>
        ))}
      </div>
    </StyledPage>
  )
}
