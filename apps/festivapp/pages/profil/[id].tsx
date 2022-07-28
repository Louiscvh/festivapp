import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import Container from '../../components/Container';
import { getLayout } from '../../layouts/MenuLayout';
import { PrismaClient } from '@prisma/client';
import { useState, useEffect } from 'react';
import { globalColors } from '../_app';
const StyledPage = styled.header`
  .user__stats {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-top: 2rem;
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

  return (
    <Container>
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