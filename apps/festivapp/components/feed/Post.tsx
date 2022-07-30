import Link from "next/link";
import styled from "styled-components"
import { globalColors } from '../../pages/_app';
import Moment from 'react-moment';
import 'moment/locale/fr';
import Like from "./Like";
import { useCookies } from 'react-cookie';
import { useEffect, useState } from "react";

const StyledPage = styled.div`
    padding: 1rem;
    background-color: ${globalColors.white};
    border-radius: 8px;
    min-width: 500px;
    @media screen and (max-width: 1024px) {
        min-width: 90%;
    } 

    & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    & > img{
        width: 100%;
        object-fit: cover;
        aspect-ratio: 1/1;
        border-radius: 8px;
    }

    a {
        color: ${globalColors.black};
        display: flex;
        gap: 0.5rem;
        align-items: center;
        img{
            height: 30px;
        }
    }

    & > p {
        margin: 0.6rem 0px;
    }

    & > a {
        margin: 0.6rem 0px;
        opacity: 0.6;
    }
    time {
        font-size: 0.8rem;
        opacity: 0.6
    }
`

export default function Post({userLike, data}) {

    const [cookies, , ] = useCookies(['user']);
    const [likeCount, setLikeCount] = useState(data.like.length);
    const [isLiked, setIsLiked] = useState(null);

   useEffect(() => {
    const postisLiked = userLike?.some( like => like['authorId'] == cookies.user?.id);
    setIsLiked(postisLiked)
   }, [userLike, cookies.user])
   console.log(data)

  return (
    <StyledPage>
        <div>
            <Link href={`/profil/${data.author.id}`}>
                <a>
                    <img src={data.author.avatar} alt="User avatar"></img>
                    <h4>{data.author.firstName} {data.author.lastName}</h4>
                </a>
            </Link>
            <p>{data.location}</p>
        </div>
        <img src={`${data.content}`} alt="Post picture in feed"></img>
        <div>
        <Like isLiked={isLiked} 
            setIsLiked={setIsLiked} 
            likeCount={likeCount} 
            setLikeCount={setLikeCount} 
            postId={data.id} 
            userId={cookies.user?.id}/>
        <p>{likeCount} like{likeCount > 1 ? "s" : ""}</p>
        </div>
        <h4>{data.festival.name}</h4>
        <p>{data.description}</p>
        {data.comment.length ? 
        <Link href={`post/${data.id}`}>
            <a>
                <p>Afficher {data.comment.length > 1 ? `les ${data.comment.length}` : "le commentaire"}</p>
            </a>
        </Link>
         : ""}
        <Moment locale="fr" fromNow>{data.createdAt}</Moment>
    </StyledPage>
  )
}
