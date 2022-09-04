//Hooks
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useState } from 'react';

//Style
import styled from 'styled-components';

//Components
import Button from './Button';
import Container from './Container';
import Link from 'next/link';

//Variables
import { globalColors, globalTransitions } from '../pages/_app'

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
    nav {
      & > button {
        display: none;
        @media screen and (max-width: 1024px) {
            display: block;
        }
      }
      ul{
        display: flex;
        gap: 2rem;
        align-items: center;
        @media screen and (max-width: 1024px) {
            display: none;
        }

        .header__profil{
          all: unset;
          background-color: ${globalColors.black};
          opacity: 1;
          border-radius: 150px;
          padding: 10px 25px;
          z-index: 1;
          color: ${globalColors.white};
        }

        & li:first-child a p{
          
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
  }
`;

const StyledMenuBurger = styled.aside`
  height: 100vh;
  width: 100vw;
  background-color: ${globalColors.white};
  z-index: 1000;
  position: fixed;
  transition: transform 0.3s ${globalTransitions.main};
  padding-top: 2rem;
  display: none;

  @media screen and (max-width: 1024px) {
          display: block;
  } 

  ul{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .header__profil{
      all: unset;
      background-color: ${globalColors.black};
      opacity: 1;
      border-radius: 150px;
      padding: 10px 25px;
      z-index: 1;
      color: ${globalColors.white};
    }
`

export default function Header() {
  //State
  const [mobileOpen, setMobileOpen] = useState(null)
  //Cookie
  const [cookie,, removeCookie] = useCookies(['user']);
  //Router
  const router = useRouter()

  /**
   * Logout function
   * @param e Event from input
   */
  const handleLogout = (e) => {
    e.preventDefault()
    setMobileOpen(false)
    removeCookie('user', { path: '/' });
    router.push('/login')
  }
  
  return (
    <>
      <StyledMenuBurger style={{transform: `translateX(${mobileOpen ? "0%" : "100%"})`}}>
        <Container>
          <nav>
            <ul>
            {cookie.user ? 
              <>
                  <li onClick={() => setMobileOpen(!mobileOpen)}>
                    <Link href={`/profil/${cookie.user?.id}`} >
                      <a>
                        <button className="header__profil">
                          Mon profil
                        </button>
                      </a>
                    </Link>
                  </li>
                  <li onClick={() => setMobileOpen(!mobileOpen)}>
                    <Link href="/explore" passHref>
                      <a>
                        <Button>
                          Explorer
                        </Button>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Button onClick={(e: MouseEvent) => handleLogout(e)}>
                      Déconnexion
                    </Button>
                  </li> 
                </>: <>
                  <li onClick={() => setMobileOpen(!mobileOpen)}>
                    <Link href={`/login`} >
                      <a>
                        <Button>
                          Se connecter
                        </Button>
                      </a>
                    </Link>
                  </li>
                  <li onClick={() => setMobileOpen(!mobileOpen)}>
                    <Link href={`/signin`} >
                      <a>
                        <button className="header__profil">
                          Inscription
                        </button>
                      </a>
                    </Link>
                  </li>
                </>}
            </ul> 
          </nav>
        </Container>
      </StyledMenuBurger>
      <Container>
        <StyledPage>
          <div className="header__container">
            <Link href="/">
              <a onClick={() => setMobileOpen(false)}>
                <img src="/icon-192x192.png" alt="Festivapp" />
              </a>
            </Link>
            <nav>
              <Button onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? "Fermer" : "Menu" }</Button>
              <ul>
              {!cookie.user ? (
                <>
                <li>
                  <Link href="/signin">
                    <a>
                      <p>Inscription</p>
                      </a>
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
                    <Link href="/explore">
                      <a>
                        <Button>
                          Explorer
                        </Button>
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
    </>
  )
}
