import Link from "next/link";
import styled from "styled-components"
import { globalColors } from '../../pages/_app';

const StyledPage = styled.div`
    padding: 1rem;
    background-color: ${globalColors.white};
    border-radius: 8px;
    
    & > img{
        width: 100%;
        object-fit: cover;
        aspect-ratio: 1/1;
        border-radius: 8px;
    }

    a {
        color: ${globalColors.black};
        margin-bottom: 1rem;
        display: flex;
        gap: 0.5rem;
        align-items: center;
        img{
            height: 30px;
        }
    }
`

export default function Post({data}) {
    console.log(data)
  return (
    <StyledPage>
        <Link href={`/profil/${data.author.id}`}>
            <a>
                <img src={data.author.avatar} alt="User avatar"></img>
                <p>{data.author.firstName} {data.author.lastName}</p>
            </a>
        </Link>
        <img src={`${data.content}`} alt="Post picture in feed"></img>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
    </StyledPage>
  )
}
