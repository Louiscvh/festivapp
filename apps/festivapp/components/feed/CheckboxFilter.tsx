import { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import { globalColors, globalTransitions } from '../../pages/_app';

const StyledPage = styled.div`
    position: relative;
    padding: 0.8rem 1.2rem;
    background-color: ${globalColors.darkGrey};
    border-radius: 150px;
    cursor: pointer;
    will-change: background-color;
    transition: background-color 0.5s ease;
    &:hover {
        background-color: #cdcdcd;
    }

    & > button {
        background: none;
        border: none;
        font-size: 0.8rem;
        cursor: pointer;
        @media screen and (max-width: 1024px) {
            font-size: 0.6rem;
        }

    }

    & > div {
        position: absolute;
        width: 100%;
        background-color: ${globalColors.darkGrey};
        top: 60px;
        border-radius: 8px;
        flex-direction: column;
        z-index: 1;
        left: 0;

        label {
            padding: 1rem;
            display: flex;
            gap: 0.5rem;
            align-items: center;
            cursor: pointer;
            border-radius: 8px;
            font-size: 0.8rem;
            will-change: background-color;
            transition: background-color 0.5s ease;
            @media screen and (max-width: 1024px) {
                font-size: 0.6rem;
            }
            &:hover {
                background-color: #cdcdcd;
            }
        }
    }
    
`
export default function CheckboxFilter({activeFilters, setActiveFilters, datas, title, fieldTarget}) {
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const [activeCount, setActiveCount] = useState(0)
  /**
    * Detect if your click outside the ref
    * @param ref Element to detect click outside
    */
   const useOutside = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false)
        }
      }
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [ref]);
  }

  useOutside(inputRef)

  const handleChange = (e, value) => {
    if(e.target.checked) {
        setActiveFilters([...activeFilters, {name: title, value}])
        setActiveCount(activeCount + 1)
    } else {
        setActiveFilters(activeFilters.filter(item => item.value !== value))
        setActiveCount(activeCount - 1)
    }
  }


  return (
    <StyledPage ref={inputRef} onClick={() => setOpen(!open)}>
        <button>{open ? "-" : "+"} Filter par {title} ({activeCount})</button>
        <div style={{display: open ? "flex" : "none"}}>
            {datas.map((data, i) => (
                <label key={i}>
                    <input type="checkbox" onChange={(e) => handleChange(e, data)}/>
                    {data}
                </label>
            ))}
        </div>
    </StyledPage>
  )
}
