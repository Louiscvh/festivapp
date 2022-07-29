import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import Container from '../../components/Container';
import { getLayout } from '../../layouts/MenuLayout';
import { PrismaClient } from '@prisma/client';
import { useState, useEffect } from 'react';
import { globalColors } from '../_app';
import Button from '../../components/Button';
import Head from 'next/head';
const StyledPage = styled.header`
  .user__stats {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin: 2rem 0px;
    div {
      padding: 10px;
      border-radius: 8px;
      background-color: ${globalColors.white};
    }
  }
`;

export default function Profil({userData}) {
  const [cookie,, removeCookie] = useCookies(['user']);
  const router = useRouter()
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(userData)
  }, [userData])
  console.log(user)

  const handleShare = (e: Event) => {
    e.preventDefault();
    navigator.share({
      title: `Festivapp | ${user?.firstName} ${user?.lastName}`,
      text: 'Hello World',
      url: `/profil/${user?.id}`,
    })
  }

  return (
    <Container>
      <Head>
        <title>Festivapp | {user?.firstName} {user?.lastName} </title>
      </Head>
      <StyledPage>
        <section>
          <h1>{user?.firstName} {user?.lastName}</h1>
          <div className="user__stats">
              <div>
                <h2>{user?.follower.length}</h2>
                <p>Abonné{user?.follower.length > 1 ? "s" : ""}</p>
              </div>
              <div>
                <h2>{user?.following.length}</h2>
                <p>Abonnement{user?.following.length > 1 ? "s" : ""}</p>
              </div>
              <div>
                <h2>{user?.post.length}</h2>
                <p>Post{user?.post.length > 1 ? "s" : ""} publié{user?.post.length > 1 ? "s" : ""}</p>
              </div>
          </div>
          <Button onClick={(e: Event) => handleShare(e)}>
            Partager ce profil
          </Button>
        </section>
      </StyledPage>
    </Container>
  )
}

export async function getServerSideProps(context: { query: { id: number } }) {
    const prisma = new PrismaClient()
    const id = context.query.id

    const request = await prisma.user.findFirst({
        where: {
            id: Number(id)
        },
        select: {
            id: true,
            avatar: true,
            firstName: true,
            lastName: true,
            follower: true,
            following: true,
            post: {
                select: {
                    id: true,
                }
            }
        }
    })
    const userData = JSON.parse(JSON.stringify(request))
    return {
      props : { userData }
    }
  }
    
Profil.getLayout = getLayout;