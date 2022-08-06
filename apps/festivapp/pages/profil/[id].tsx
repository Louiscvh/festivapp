import { useRouter } from 'next/router';
import styled from 'styled-components';
import Container from '../../components/Container';
import { getLayout } from '../../layouts/MenuLayout';
import { useState, useEffect } from 'react';
import { globalColors } from '../_app';
import Button from '../../components/Button';
import Head from 'next/head';
import Skeleton from '../../components/Skeleton';
import { useCookies } from 'react-cookie';
import EditProfil from '../../components/profil/EditProfil';
import PostProfil from '../../components/profil/PostProfil';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  button {
      z-index: 1;
    }
  section {
    max-width: 700px;
    width: calc(100% - 4rem);
    background-color: ${globalColors.white};
    padding: 2rem;
    border-radius: 8px;
  }
  .profil__header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 2rem;
    @media screen and (min-width: 1024px) {
      flex-direction: row;
      align-items: center;
      gap: 2rem;
      margin-bottom: 0rem;
  } 
  }

  .profil__details > div{
    display: flex;
    align-items: center;
    gap: 2rem;
    @media screen and (max-width: 1024px) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    } 
  }

  img {
    height: 80px;
    width: 80px;
    border-radius: 8px;
    object-fit: cover;
    @media screen and (max-width: 1024px) {
      margin-top: 1rem;
    } 
  }

  .user__stats {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 2rem 0px;

    div {
      padding: 10px;
      border-radius: 8px;
      background-color: ${globalColors.darkGrey};
    }
  }

  
`;

export default function Profil() {
  const [user, setUser] = useState(null);
  const [canShare, setCanShare] = useState(false);
  const [cookies, ,removeCookie] = useCookies(['user']);
  const [isFollow, setIsFollow] = useState(null);
  const [followCounter, setFollowCounter] = useState(0)
  const [editOpen, setEditOpen] = useState(false);

  const [picture, setPicture] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [bio, setBio] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(user?.lastName)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')


  const router = useRouter()
  useEffect(() => {
    if(!cookies.user){
      router.push('/')
    }
    fetch(`/api/user/${router.query.id}`)
    .then(r => r.json())
    .then(data => {
      setUser(data)
      setBio(data?.bio)
      setFirstName(data?.firstName)
      setLastName(data?.lastName)

      setIsFollow(data.follower.some(follow => follow['followerId'] == cookies.user?.id))
      setFollowCounter(data.follower.length)
    })
    if(navigator.share) setCanShare(true)
  }, [router, cookies.user?.id, user?.bio, user?.firstName, user?.lastName])
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

  const handleSub = async (e, followingId) => {
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

  const handleDelete = (e, userId) => {
    e.preventDefault()
    fetch('/api/user/deleteUser', {
      method: "POST",
      body: JSON.stringify({
        userId
      })
    })
    removeCookie('user', { path: '/' });
    router.push('/')
  }
  console.log(bio)
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
              <h1>{firstName} {lastName}</h1>
              {user?.id == cookies.user?.id ? <Button onClick={() => setEditOpen(!editOpen)}>Modifier mon profil</Button> : <Button onClick={(e) => handleSub(e, user?.id)}>{isFollow ? "Unfollow" : "Follow"}</Button>}
            </div>
            <div className="profil__details">
              <div>
                <img src={picture ? picture?.picturePreview : user?.avatar } alt='User avatar'></img>
                <div className="user__stats">
                    <div>
                      <h2>{followCounter}</h2>
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
              </div>
              {bio ?  <q>{bio}</q> : null}
            </div>
          </section>
          {editOpen ? <EditProfil setEditOpen={setEditOpen} password={password} setPassword={setPassword} passwordConfirm={passwordConfirm} setPasswordConfirm={setPasswordConfirm} setFirstName={setFirstName} firstName={firstName} bio={bio} setBio={setBio} avatar={avatar} setAvatar={setAvatar} picture={picture} setPicture={setPicture} lastName={lastName} setLastName={setLastName} user={user}></EditProfil> : <PostProfil user={user}></PostProfil>}
          
          {canShare ? <Button onClick={(e: Event) => handleShare(e)}>
              Partager ce profil
            </Button> : ""}
              {user?.id == cookies.user?.id &&
              <Button onClick={(e) => handleDelete(e, user?.id)}>
                Supprimer mon compte
              </Button>}
        </>
        : <Skeleton width={500} height={500}></Skeleton>}
      </StyledPage>
    </Container>
  )
}

Profil.getLayout = getLayout;