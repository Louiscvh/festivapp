import { getLayout } from '../layouts/MenuLayout';
import styled from 'styled-components';
import Container from '../components/Container';
import { useEffect, useState } from 'react';
import Skeleton from '../components/Skeleton';
import Link from 'next/link';

const StyledPage = styled.main`
    .explore__container {
        margin: 2rem 0px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;

        @media screen and (min-width: 1000px) {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }
        img{
            width: 100%;
            aspect-ratio: 1/1;
            object-fit: cover;
            border-radius: 8px;
        }
    }
`

export default function Explore() {

    const [explore, setExplore] = useState([]);

    useEffect(() => {
        fetch('/api/post/getAll')
        .then(res => res.json())
        .then(data => setExplore(data))
    }, [])
  return (
    <Container>
        <StyledPage>
            <section>
                <h1>Explorer du contenu</h1>
                <div className="explore__container">
                    {explore.length ? 
                        explore.map((post, index) => (
                            <Link key={index} href={`/post/${post.id}`}>
                                <a>
                                    <img src={post.content}></img>
                                </a>
                            </Link>
                        ))
                        : <Skeleton width={300} height={50}></Skeleton>
                    }
                </div>
            </section>
        </StyledPage>
    </Container>
  )
}

Explore.getLayout = getLayout;
