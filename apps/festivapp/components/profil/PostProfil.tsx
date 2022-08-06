import Link from "next/link";
import { useCookies } from "react-cookie";
import styled from "styled-components";

const StyledPage = styled.section`
    h2 {
      margin-bottom: 1rem;
    }
    div {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 1rem;

      h4 {
        margin-top: 0.5rem;
      }

      img{
        height: 100px;
        width: 100px;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 8px;
      }
    }

    .profil__post__container {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;

      img {
        will-change: transform;
        transition: transform 0.2s ease-out;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
`
export default function PostProfil({user}) {

  const [cookies, , ] = useCookies(['user']);

  return (
    <StyledPage>
        <h2>{user?.id != cookies.user?.id ? `Post${user?.post.length > 1 ? "s" : ""} de ${user?.firstName}`: `Mes posts`}</h2>
        <div className='profil__post__container'>
          {user?.post.length ? user?.post.map((post, index) => (
            <Link href={`/post/${post.id}`} key={index}>
              <a>
                <img src={post.content} alt='Post image'></img>
              </a>
            </Link>
          )) : <h4>{user?.firstName} n&apos;a encore rien publié</h4>}
        </div>
      </StyledPage>
  )
}
