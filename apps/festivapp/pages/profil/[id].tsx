import { useRouter } from 'next/router';
import styled from 'styled-components';
import Container from '../../components/Container';
import { getLayout } from '../../layouts/MenuLayout';
import { useState, useEffect } from 'react';
import { globalColors } from '../_app';
import Button from '../../components/Button';
import Head from 'next/head';
import Link from 'next/link';
import Skeleton from '../../components/Skeleton';
import { useCookies } from 'react-cookie';
const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  section {
    max-width: 600px;
    background-color: ${globalColors.white};
    padding: 2rem;
    border-radius: 8px;
  }
  .profil__header {
    display: flex;
    align-items: center;
    gap: 2rem;

    button {
      z-index: 1;
    }
  }

  img {
    height: 80px;
    margin-top: 1rem;
  }

  .user__stats {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 2rem 0px;

    div {
      padding: 10px;
      border-radius: 8px;
      background-color: ${globalColors.darkGrey};
    }
  }

  #profil__post {
    margin-bottom: 2rem;
    div {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 1rem;

      h4 {
        margin-top: 0.5rem;
      }

      img{
        height: 100px;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 8px;
      }
    }

    .profil__post__container {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
  }
`;

export default function Profil() {
  const [user, setUser] = useState(null);
  const [canShare, setCanShare] = useState(false);
  const [cookies, ,] = useCookies(['user']);
  const [isFollow, setIsFollow] = useState(null);
  const [followCounter, setFollowCounter] = useState(0)
  const router = useRouter()
  useEffect(() => {
    fetch(`/api/user/${router.query.id}`)
    .then(r => r.json())
    .then(data => {
      setUser(data)
      setIsFollow(data.follower.some(follow => follow['followerId'] == cookies.user?.id))
      setFollowCounter(data.follower.length)
    })
    if(navigator.share) setCanShare(true)
  }, [router])

  const handleShare = (e: Event) => {
    e.preventDefault();
    if(navigator) {
      navigator.share({
        title: `Festivapp | ${user?.firstName} ${user?.lastName}`,
        text: `Festivapp | ${user?.firstName} ${user?.lastName}`,
        url: `/profil/${user?.id}`,
      })
    }
  }

  const handleSub = async (e: any, followingId) => {
    e.preventDefault()
    setIsFollow(!isFollow)
    setFollowCounter(isFollow ? followCounter - 1 : followCounter + 1)

    await fetch(`/api/follow`, {
        method: 'POST',
        body: JSON.stringify({
            followerId: cookies.user?.id,
            followingId
        })
    })
  }

  console.log(followCounter)

  return (
    <Container>
      <Head>
        <title>Festivapp | {user?.firstName} {user?.lastName} </title>
      </Head>
      <StyledPage>
      {user ? 
        <>
          <section>
            <div className="profil__header">
              <h1>{user?.firstName} {user?.lastName}</h1>
              {user?.id == cookies.user?.id ? <Button>Modifier mon profil</Button> : <Button onClick={(e) => handleSub(e, user?.id)}>{isFollow ? "Ne plus suivre" : "Suivre"}</Button>}
            </div>
            <img src={user?.avatar} alt='User avatar'></img>
            <div className="user__stats">
                <div>
                  <h2>{followCounter || "-"}</h2>
                  <p>Abonné{followCounter > 1 ? "s" : ""}</p>
                </div>
                <div>
                  <h2>{user?.following.length}</h2>
                  <p>Abonnement{user?.following.length > 1 ? "s" : ""}</p>
                </div>
                <div>
                  <h2>{user?.post.length}</h2>
                  <p>Post{user?.post.length > 1 ? "s" : ""} publié{user?.post.length > 1 ? "s" : ""}</p>
                </div>
                <div>
                  <h2>{user?.like.length}</h2>
                  <p>Post{user?.like.length > 1 ? "s" : ""} liké{user?.like.length > 1 ? "s" : ""}</p>
                </div>
            </div>
          </section>
          <section id='profil__post'>
            <h2>{user?.id != cookies.user?.id ? `Post${user?.post.length > 1 ? "s" : ""} de ${user?.firstName}`: `Mes posts`}</h2>
            <div className='profil__post__container'>
              {user?.post.length ? user?.post.map((post, index) => (
                <Link href={`/post/${post.id}`} key={index}>
                  <a>
                    <img src={post.content} ></img>
                  </a>
                </Link>
              )) : <h4>{user?.firstName} n&apos;a encore rien publié</h4>}
            </div>
            {canShare ? <Button onClick={(e: Event) => handleShare(e)}>
              Partager ce profil
            </Button> : ""}
          </section>
        </>
        : <Skeleton width={500} height={500}></Skeleton>}
      </StyledPage>
    </Container>
  )
}

Profil.getLayout = getLayout;