import styled from "styled-components"
import Moment from 'react-moment';
import 'moment/locale/fr';
import { globalColors } from '../../pages/_app';
import Link from "next/link";

const StyledPage = styled.div`
    a {
        padding: 10px;
        background-color: ${globalColors.white};
        border-radius: 8px;
        gap: 1rem;
        display: flex;
        flex-direction: column;
        color: ${globalColors.black};
        & > div {
            display: flex;
            align-items: center;
            gap: 1rem;

            img {
                height: 30px;
            }
        }
}
`
export default function Comment({data}) {
  return (
    <StyledPage>
        <Link href={`/profil/${data.id}`}>
            <a>
                <div>
                    <img src={data.author.avatar}></img>
                    <div>
                        <h4>{data.author.firstName} {data.author.lastName}</h4>
                        <Moment locale="fr" fromNow>{data.createdAt}</Moment>
                    </div>
                </div>
                <p>{data.content}</p>
            </a>
        </Link>
    </StyledPage>
  )
}
