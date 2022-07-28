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
                <p>{user?.follower.length}</p>
                <p>Abonné{user?.follower.length > 1 ? "s" : ""}</p>
              </div>
              <div>
                <p>{user?.following.length}</p>
                <p>Abonnement{user?.following.length > 1 ? "s" : ""}</p>
              </div>
              <div>
                <p>{user?.post.length}</p>
                <p>Post{user?.post.length > 1 ? "s" : ""}</p>
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
                    title: true,
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