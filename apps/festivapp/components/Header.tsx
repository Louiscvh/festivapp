import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { globalColors } from '../pages/_app'
import Button from './Button';
import Container from './Container';

const StyledPage = styled.header`
  padding: 10px;
  z-index: 100;
  position: fixed;
  width: 90%;
  top: 0;
  background-color: ${globalColors.lightGrey};
  &:hover {
    max-height: 400px;
    transition: max-height 1s ease;

    .header__indicator::before{
      transform: rotate(90deg);
    }
  }

  .header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      height: 50px;
    }

    nav ul{
      display: flex;
      gap: 2rem;
      align-items: center;

      .header__profil{
        all: unset;
        background-color: ${globalColors.black};
        opacity: 1;
        border-radius: 150px;
        padding: 10px 25px;
        z-index: 1;
        color: ${globalColors.white};
      }

      & li:first-child a{
        
        color: ${globalColors.black};
        opacity: 0.6;
        font-weight: 500;
        transition: opacity 0.3s ease;
        will-change: color;
        &:hover {
          opacity: 1;
        }
      } 
    }
  }
`;

export default function Header() {
  const [cookie,, removeCookie] = useCookies(['user']);
  const router = useRouter()
  
  const handleLogout = (e) => {
    e.preventDefault()
    removeCookie('user', { path: '/' });
    router.push('/login')
  }
  return (
    <Container>
      <StyledPage>
        <div className="header__container">
          <Link href="/">
            <a>
              <img src="https://upload.wikimedia.org/wikipedia/fr/thumb/f/fd/Festival_de_Cannes_Logo.svg/2560px-Festival_de_Cannes_Logo.svg.png" alt="Festivapp" />
            </a>
          </Link>
          <nav>
            <ul>
            {!cookie.user ? (
              <>
              <li>
                <Link href="/signin">
                  <a>Inscription</a>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <a>
                    <Button color='black'>
                      Connexion
                    </Button>
                  </a>
                </Link>
              </li>
              </>
              ) : (
              <>
                <li>
                  <Link href={`/profil/${cookie.user?.id}`} >
                    <a>
                      <button className="header__profil">
                        Mon profil
                      </button>
                    </a>
                  </Link>
                </li>
                <li>
                  <Button onClick={(e: MouseEvent) => handleLogout(e)}>
                    Déconnexion
                  </Button>
                </li>
              </>
              )}
            </ul>
          </nav>
        </div>
      </StyledPage>
    </Container>
  )
}
