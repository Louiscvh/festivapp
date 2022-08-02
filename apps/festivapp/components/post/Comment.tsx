import styled from "styled-components"
import Moment from 'react-moment';
import 'moment/locale/fr';
import { globalColors } from '../../pages/_app';
import Link from "next/link";
import Button from "../Button";

const StyledPage = styled.div`
    a {
        padding: 1rem;
        background-color: ${globalColors.white};
        border-radius: 8px;
        gap: 1rem;
        display: flex;
        color: ${globalColors.black};
        justify-content: space-between;
        align-items: flex-start;
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

        button {
            z-index: 1;
        }
}
`
export default function Comment({data, setPostComment, postComment}) {

    const handleDelete = (e, commentId) => {
        e.preventDefault()
        fetch(`/api/comment/deleteComment`, {
            method: 'POST',
            body: JSON.stringify({
                commentId
            })
        })
        const newComment = postComment.filter((comment) => comment.id !== commentId);
        setPostComment( newComment);
    }
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
                <Button onClick={(e) => handleDelete(e, data.id)}>Supprimer</Button>
            </a>
        </Link>
    </StyledPage>
  )
}
