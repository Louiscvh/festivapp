//Hooks
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

//Style
import styled from 'styled-components';

//Components
import Skeleton from '../components/Skeleton';
import Link from 'next/link';

//Function
import { getLayout } from '../layouts/MenuLayout';

const StyledPage = styled.main`
  .explore__container {
    margin: 2rem 0px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;

    @media screen and (min-width: 1000px) {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
    img {
      width: 100%;
      aspect-ratio: 1/1;
      object-fit: cover;
      border-radius: 8px;
      will-change: transform;
      transition: transform 0.2s ease-out;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
`;

export default function Explore() {
  //State
  const [explore, setExplore] = useState([]);
  //Cookie
  const [cookies] = useCookies(['user']);
  //Router
  const router = useRouter();

  useEffect(() => {
    if (!cookies.user) {
      router.push('/');
    }
    fetch('/api/post/getAll')
      .then((res) => res.json())
      .then((data) => setExplore(data));
  }, [router, cookies.user]);

  return (
    <StyledPage>
      <section>
        <h1>Explorer du contenu</h1>
        <div className="explore__container">
          {explore.length ? (
            explore.map((post, index) => (
              <Link key={index} href={`/post/${post.id}`}>
                <a>
                  <img src={post.content} alt="Post image"></img>
                </a>
              </Link>
            ))
          ) : (
            <Skeleton width={300} height={50}></Skeleton>
          )}
        </div>
      </section>
    </StyledPage>
  );
}

Explore.getLayout = getLayout;
