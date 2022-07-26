import Link from 'next/link';
import styled from 'styled-components';
import { globalColors, globalTransitions } from '../pages/_app'

const StyledPage = styled.header`
  background: ${globalColors.mainGradient};
  max-height: 15px;
  overflow: hidden;
  transition: max-height 1s ease;
  padding: 10px;
  cursor: pointer;
  z-index: 100;
  position: fixed;
  width: calc(100% - 20px);
  top: 0;
  &:hover {
    max-height: 400px;
    transition: max-height 1s ease;

    .header__indicator::before{
      transform: rotate(90deg);
    }
  }

  .header__container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .header__indicator {
    display: flex;
    position: relative;
    height: 30px;
    width: 30px;
    &::before, &::after {
      content: '';
      background-color: ${globalColors.white};
      height: 15px;
      width: 3px;
      display: block;
      position: absolute;
      transition: transform 0.3s ${globalTransitions.main};
    }

    &::after {
      transform: rotate(90deg);
    }
  }
`;

export default function Header() {
  return (
    <StyledPage>
      <div className="header__container">
        <div className="header__indicator"></div>
        <nav>
          <ul>
            
            <li>
              <Link href="/">
                <a>Accueil</a>
              </Link>
            </li>
            <li>
              <Link href="/signin">
                <a>Inscription</a>
              </Link>
            </li>
              <Link href="/login">
                <a>Connexion</a>
              </Link>
          </ul>
        </nav>
      </div>
    </StyledPage>
  )
}
