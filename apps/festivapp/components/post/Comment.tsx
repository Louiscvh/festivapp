import styled from "styled-components"
import Moment from 'react-moment';
import 'moment/locale/fr';
import { globalColors } from '../../pages/_app';
import Link from "next/link";

const StyledPage = styled.div`
    a {
        padding: 1rem;
        background-color: ${globalColors.white};
        border-radius: 8px;
        gap: 1rem;
        display: flex;
        flex-direction: column;
        color: ${globalColors.black};
        & > div {
            display: flex;
            gap: 1rem;

            img {
                height: 30px;
                margin-top: 10px;
            }

            time {
                opacity: 0.5;
                font-size: 0.8rem;
            }

            p {
                margin-top: 1rem;
            }
        }
}
`
export default function Comment({data}) {
  return (
    <StyledPage>
        <Link href={`/profil/${data.author.id}`}>
            <a>
                <div>
                    <img src={data.author.avatar} alt="User comment avatar"></img>
                    <div>
                        <h4>{data.author.firstName} {data.author.lastName}</h4>
                        <Moment locale="fr" fromNow>{data.createdAt}</Moment>
                        <p>{data.content}</p>
                    </div>
                </div>
            </a>
        </Link>
    </StyledPage>
  )
}
