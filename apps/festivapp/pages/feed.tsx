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

const StyledPage = styled.div`
    .feed__header {
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        div {
            display: flex;
            align-items: center;
            gap: 1rem;

            input{
                all: unset;
                padding: 15px 15px 15px 25px;
                background-color: ${globalColors.darkGrey};
                border-radius: 150px;
                font-family: 'Poppins', sans-serif;
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
        div {
            display: flex;
            align-items: center;
            gap: 1rem;

            img {
                height: 50px;
            }
        }
    }
`

export default function Feed() {
    const [cookies, , ] = useCookies(['user']);
    const [feed, setFeed] = useState([]);
    const router = useRouter()
    useEffect(() => {
        if(!cookies.user){
            router.push('/')
        } else {
            fetch(`/api/user/feed/${cookies.user.id}`)
            .then(response => response.json())
            .then(data => setFeed(data)) 
        }
    }, [cookies, router])

  return (
    <>
        <Container>
            <StyledPage>
                <div className="feed__header">
                    <h1>Mon Feed</h1>
                    <div>
                        <input type="text" name="" id="" placeholder='Rechercher' />
                        <Button>
                            +
                        </Button>
                    </div>
                </div>
                <hr></hr>
                <div className='feed__container'>
                    <FeedContainer>
                        <section id="post__container">
                            {feed.map((post, index) => (
                                <Post data={post} key={index}></Post>
                            ))}
                        </section>
                        <aside>
                            <div>
                                <img src='img/user.webp'></img>
                                <h3>Louis Cavecchi</h3>
                                <div className="suggetions__container">
                                    
                                </div>
                            </div>
                        </aside>
                    </FeedContainer>
                </div>
            </StyledPage>
        </Container>
    </>
  )
}

Feed.getLayout = getLayout;
