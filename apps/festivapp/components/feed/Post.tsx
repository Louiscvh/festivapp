//Hook
import { useCookies } from 'react-cookie';
import { useEffect, useState } from "react";

//Moment
import Moment from 'react-moment';
import 'moment/locale/fr';

//Components
import Link from "next/link";
import Like from "./Like";

//Style
import styled from "styled-components"

//Variable
import { globalColors } from '../../pages/_app';

const StyledPage = styled.div`
    padding: 1rem;
    background-color: ${globalColors.white};
    border-radius: 8px;
    min-width: 500px;

    h2 {
        font-size:1rem;
    }
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
        cursor: pointer;
    }

    a {
        color: ${globalColors.black};
        display: flex;
        gap: 0.5rem;
        align-items: center;
        img{
            height: 30px;
            border-radius: 8px;
            aspect-ratio: 1/1;
            object-fit: cover;
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

    .post__location {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        svg {
            fill: ${globalColors.darkGrey};
            height: 1rem;
        }
    }
`

export default function Post({userLike, data}) {
    //Cookie
    const [cookies, , ] = useCookies(['user']);
    //State
    const [likeCount, setLikeCount] = useState(data.like.length);
    const [isLiked, setIsLiked] = useState(null);

   useEffect(() => {
    setIsLiked(userLike?.some( like => like['postId'] == data.id))
   }, [userLike, cookies.user, data.id])

  return (
    <StyledPage>
        <div>
            <Link href={`/profil/${data.author.id}`}>
                <a>
                    <img src={data.author.avatar} alt="User avatar"></img>
                    <h2>{data.author.firstName} {data.author.lastName}</h2>
                </a>
            </Link>
            <div className="post__location">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
                <p>{data.location}</p>
            </div>
        </div>
        <Link passHref href={`/post/${data.id}`}>
            <img src={`${data.content}`} alt="Post picture in feed"></img>
        </Link>
        <div>
        <Like 
            likeVisible={data.likeVisible}
            isLiked={isLiked} 
            setIsLiked={setIsLiked} 
            likeCount={likeCount} 
            setLikeCount={setLikeCount} 
            postId={data.id} 
            userId={cookies.user?.id}/>
        </div>
        <h4>{data.festival.name}</h4>
        <p>{data.description}</p>
        {data.comment.length ? 
        <Link href={`post/${data.id}`}>
            <a>
                <p>Afficher {data.comment.length > 1 ? `les ${data.comment.length} commentaires` : "le commentaire"}</p>
            </a>
        </Link>
         : ""}
        <Moment locale="fr" fromNow>{data.createdAt}</Moment>
    </StyledPage>
  )
}
