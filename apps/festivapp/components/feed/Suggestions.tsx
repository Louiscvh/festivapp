import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import styled from "styled-components"
import Skeleton from "../Skeleton";
import UserCard from "../UserCard";

const StyledPage = styled.div`

.suggestions__container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  section > h3{
    margin: 1rem 0px;
  }
`

export default function Suggestions() {
    const [suggestions, setSuggestions] = useState([]);
    const [cookies, ,] = useCookies(['user']);
    useEffect(() => {
        fetch(`/api/user/suggestions/${cookies.user?.id}/3`)
        .then(response => response.json())
        .then(data => setSuggestions(data)) 
    }, [cookies])
    console.log(suggestions)
  return (
    <StyledPage>
        <section>
          <h3>Suggestions</h3>
          <div className="suggestions__container">
            {suggestions.length ?
              suggestions.map(suggestion => (
                <UserCard data={suggestion} key={suggestion.id}></UserCard>
              ))
              : <Skeleton width={300} height={50}></Skeleton>
            }
          </div>
        </section>
    </StyledPage>
  )
}