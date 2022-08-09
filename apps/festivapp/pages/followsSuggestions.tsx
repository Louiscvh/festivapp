//Hook
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//Functions & variables
import { getLayout } from '../layouts/MenuLayout';
import { globalColors } from './_app';

//Style
import styled from 'styled-components';

//Components
import Skeleton from '../components/Skeleton';
import UserCard from '../components/UserCard';
import Link from 'next/link';

const StyledPage = styled.main`
  margin-bottom: 1rem;
  .suggestions__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin: 1rem 0px 2rem 0px;
  }

  section > a {
    background-color: ${globalColors.black};
    border-radius: 150px;
    color: ${globalColors.white};
    padding: 1rem 1.5rem;
  }
`;
export default function FollowsSuggestions() {
  //State
  const [suggestions, setSuggestions] = useState([]);

  //Cookie & router
  const [cookies, ,] = useCookies(['user']);
  const router = useRouter();

  useEffect(() => {
    if (!cookies.user) {
      router.push('/');
    } else {
      fetch(`/api/user/suggestions/${cookies.user?.id}/10`)
        .then((response) => response.json())
        .then((data) => setSuggestions(data));
    }
  }, [router, cookies.user]);

  return (
    <StyledPage>
      <section>
        <h1>
          Pour commencer, voici quelques profils qui pourrait vous intéréssé
        </h1>
        <div className="suggestions__container">
          {suggestions.length ? (
            suggestions.map((suggestion, i) => (
              <UserCard
                isFollow={suggestion.follower.some(
                  (follow) => follow['followerId'] == cookies.user?.id
                )}
                data={suggestion}
                key={i}
              />
            ))
          ) : (
            <Skeleton width={300} height={100}></Skeleton>
          )}
        </div>
        <Link href="/feed">
          <a className="suggestions__next">Ignorer</a>
        </Link>
      </section>
    </StyledPage>
  );
}

FollowsSuggestions.getLayout = getLayout;
