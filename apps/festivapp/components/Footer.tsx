//Components
import Link from 'next/link';

//Style
import styled from 'styled-components'

//Variable
import { globalColors } from '../pages/_app';

const StyledPage = styled.footer`
    background-color: ${globalColors.white};
    padding: 1rem;
    border-radius: 8px;
    margin: 2rem 0px;

    h5 {
        margin-bottom: 0.5rem;
    }

    a {
        color: ${globalColors.black};
    }
`

export default function Footer() {
  return (
    <StyledPage>
        <div>
            <h5>Liens utiles</h5>
            <nav>
            <ul>
                <li>
                    <Link href="/policy">
                        <a>
                        Politique de confidentialité
                        </a>
                    </Link>
                </li>
            </ul>
            </nav>
        </div>
        <div></div>
    </StyledPage>
  )
}
