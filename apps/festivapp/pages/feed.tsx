import { getLayout } from '../layouts/MenuLayout';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Container from '../components/Container';
import Button from '../components/Button';
import { globalColors } from './_app';
import FeedContainer from '../components/FeedContainer';
import Post from '../components/feed/Post';
import Skeleton from '../components/Skeleton';
import Link from 'next/link';
import Suggestions from '../components/feed/Suggestions';
import Head from 'next/head';
import Filters from '../components/feed/Filters';
import FeedSearch from '../components/feed/FeedSearch';



  
const StyledPage = styled.div`
    .feed__header {
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media screen and (max-width: 1024px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;

        }
        & > div {
            display: flex;
            align-items: center;
            gap: 1rem;

            input{
                all: unset;
                padding: 15px 15px 15px 25px;
                background-color: ${globalColors.darkGrey};
                border-radius: 150px;
                font-family: 'Poppins', sans-serif;
                font-size: 0.8rem;
            }
        }
    }

    hr {
        border: 1px solid ${globalColors.darkGrey};
    }

    #post__container {
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }
    aside {
        position: sticky;
        top: 100px;
        min-width: 400px;
        & > div > a{
            display: flex;
            align-items: center;
            gap: 1rem;
            color: ${globalColors.black};
            background-color: ${globalColors.white};
            padding: 1rem;
            border-radius: 8px;
            width: calc(100% - 2rem);
            will-change: transform;
            transition: transform 0.2s ease-in-out;
            &:hover {
                transform: scale(1.05);
            }
            img {
                height: 50px;
                border-radius: 8px;
                aspect-ratio: 1/1;
                object-fit: cover;
            }
        }

        @media screen and (max-width: 1024px) {
            & {
                display: none;
            }
        }

        hr {
            margin-top: 2rem;
        }
    }
`

export default function Feed() {
    const [cookies, , ] = useCookies(['user']);
    const [feed, setFeed] = useState([]);
    const [user, setUser] = useState(null)
    const router = useRouter()
    const [activeFilters, setActiveFilters] = useState([])

    useEffect(() => {
        if(!cookies.user){
            router.push('/')
        } else {
            fetch(`/api/user/feed/${cookies.user?.id}`)
            .then(response => response.json())
            .then(data => setFeed(data))
        }
    }, [cookies, router])

    useEffect(() => {
        fetch(`/api/user/${cookies.user?.id}`)
        .then(response => response.json())
        .then(data => setUser(data)) 
    }, [cookies])
    console.log(feed)
  return (
    <>
        <Head>
            <title>Festivapp | Mon feed </title>
            <meta name="description" content="Page feed qui présente les différentes publications personnalisés en fonction des abonnements de l'utilisateur" />
        </Head>
        <Container>
            <StyledPage>
                <div className="feed__header">
                    <h1>Mon feed</h1>
                    <div>
                        <FeedSearch></FeedSearch>
                        <Link href="/new">
                            <a>
                                <Button>
                                    +
                                </Button>
                            </a>
                        </Link>
                    </div>
                </div>
                <hr></hr>
                <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters}/>
                <div className='feed__container'>
                    <FeedContainer>
                    {feed.length ?
                        <section id="post__container">
                             {feed.map((post, index) => (
                                <Post userLike={user?.like} data={post} key={index}></Post>
                            ))}
                        </section> : <Skeleton width={800} height={500}></Skeleton>}
                        <aside>
                            {user ? 
                            <div>
                            <Link href={`/profil/${user?.id}`}>
                                <a>
                                    <img src={user?.avatar} alt="Profil avatar"></img>
                                    <div>
                                        <h3>{user?.firstName} {user?.lastName}</h3>
                                        <p>{user?.follower.length} abonné{user?.follower.length > 1 ? "s" : ""} {user?.following.length} abonnement{user?.following.length > 1 ? "s" : ""}</p>
                                    </div>
                                </a>
                            </Link>
                            <hr></hr>
                            <Suggestions userFollow={user?.following}/>
                        </div> : <Skeleton width={300} height={50}></Skeleton>}
                            
                        </aside>
                    </FeedContainer>
                </div>
            </StyledPage>
        </Container>
    </>
  )
}

Feed.getLayout = getLayout;
