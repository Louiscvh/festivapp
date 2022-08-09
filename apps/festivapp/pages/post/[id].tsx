//Hook
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

//Style
import styled from 'styled-components';

//Components
import UserCard from '../../components/UserCard';
import Comment from '../../components/post/Comment';
import Like from '../../components/feed/Like';
import Button from '../../components/Button';
import Skeleton from '../../components/Skeleton';

//Functions & variable
import { getLayout } from '../../layouts/MenuLayout';
import { globalColors } from '../_app';

const StyledPage = styled.main`
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    @media screen and (max-width: 1024px) {
        flex-direction: column;
    }

    & > div {
        width: 50%;
        @media screen and (max-width: 1024px) {
            width: 100%;
        }
    }

    & > div > h3 {
        margin-top: 2rem;
    }

    & > div > p {
        margin-bottom: 1rem;
    }
    & > img {
        width: 50%;
        height: auto;
        border-radius: 8px;
        aspect-ratio: 1/1;
        object-fit: cover;
        @media screen and (max-width: 1024px) {
            width: 100%;
        }
    }

    .post__options {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    section {
        margin-top: 2rem;
        h2 {
            margin-bottom: 1rem;
        }

        & > div {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1rem;
        }

        form {
            margin-bottom: 1rem;
            display: flex;
            gap: 1rem;
            justify-content: space-between;
            input{
                all: unset;
                padding: 1rem;
                background-color: ${globalColors.white};
                border-radius: 8px; 
                font-family: 'Poppins';
                font-size: 0.8rem;
                width: 100%;
            }
        }
    }
`
export default function Post() {
    //States
    const [post, setPost] = useState(null)
    const [likeCount, setLikeCount] = useState(null)
    const [isLiked, setIsLiked] = useState(null)
    const [postComment, setPostComment] = useState(null)
    const [comment, setComment] = useState('')
    //Cookie
    const [cookies] = useCookies(['user']);
    //Router
    const router = useRouter()
 
    useEffect(() => {
        if(!cookies.user){
            router.push('/')
        }
        const fetchData = async () => {
            fetch(`/api/post/${router.query.id}`)
            .then(r => r.json())
            .then(data => {
                setPost(data)
                setPostComment(data.comment.sort((a, b) => { return b.id - a.id; }))
                setLikeCount(data.like.length)
                setIsLiked(data?.like?.some(like => like['authorId'] == cookies.user?.id))
            })
            }
        fetchData()
    }, [router, cookies.user?.id, cookies.user])

    /**
     * Comment a post
     * @param e Event from input
     */
    const handleComment = async(e) => {
        e.preventDefault()
        setComment('')
        setPostComment(oldArray => [{content: comment, author: {id: cookies.user?.id, firstName: cookies.user?.firstName, lastName:cookies.user?.lastName, avatar: cookies.user?.avatar}}, ...oldArray] );
        await fetch(`/api/comment/createComment`, {
            method: 'POST',
            body: JSON.stringify({
                comment,
                postId: post.id,
                authorId: cookies.user?.id
            })
        })
    }
    /**
     * Delete a post
     * @param e Event from input
     * @param id Id of the post to delete
     */
    const handleDelete = (e, postId) => {
        e.preventDefault()
        fetch(`/api/post/deletePost/`, {
            method: 'POST',
            body: JSON.stringify({
                postId
            })
        })
        router.push('/feed')
    }
  return (
        <StyledPage>
            {post ?
            <>
                <img src={post.content} alt="Picture of post"></img>
                <div>
                    <UserCard isFollow={post.author?.follower.some( follower => follower['followerId'] == cookies.user?.id)} data={post.author}></UserCard>
                    <h3>{post.festival?.name} - {post.location}</h3>
                    <p>{post.description}</p>
                    <div className="post__options">
                        <Like likeVisible={post.likeVisible} postId={post.id} userId={cookies.user?.id} setIsLiked={setIsLiked} isLiked={isLiked} likeCount={likeCount} setLikeCount={setLikeCount}></Like>
                        {post.author?.id == cookies.user?.id && <Button onClick={(e) => handleDelete(e, post.id)}>Supprimer mon post</Button>}
                    </div>
                    <section>
                        <h2>Commentaire{postComment?.length > 1 ? "s" : ""} ({postComment?.length})</h2>
                        <form onSubmit={(e) => handleComment(e)}>
                            <input type="text" placeholder="Commenter" value={comment} onChange={(e) => setComment(e.target.value)}></input>
                            <Button submit>
                                Publier
                            </Button>
                        </form>
                        <div>
                            {postComment?.map((comment, index) => (
                                <div key={index}>
                                <Comment data={comment} setPostComment={setPostComment} postComment={postComment}/>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </> 
            : <Skeleton width={700} height={500}></Skeleton>}
        </StyledPage>
  )
}
    
Post.getLayout = getLayout;