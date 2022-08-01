import { PrismaClient } from '@prisma/client';
import { useState } from 'react';
import { getLayout } from '../../layouts/MenuLayout';
import styled from 'styled-components';
import Container from '../../components/Container';
import UserCard from '../../components/UserCard';
import Comment from '../../components/post/Comment';
import Like from '../../components/feed/Like';
import { globalColors } from '../_app';
import Button from '../../components/Button';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const StyledPage = styled.div`
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    @media screen and (max-width: 1024px) {
        flex-direction: column;
    }

    & > div {
        width: 100%;
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
export default function Post({postData}) {
    const [post, setPost] = useState(postData)
    const [likeCount, setLikeCount] = useState(postData.like.length)
    const [isLiked, setIsLiked] = useState(null)
    const [cookies, , ] = useCookies(['user']);
    const [postComment, setPostComment] = useState(postData.comment)
    const [comment, setComment] = useState('')
    useEffect(() => {
        setIsLiked(postData.like.some( like => like['authorId'] == cookies.user?.id))
    }, [postData.like, cookies.user?.id] )

    const handleComment = async(e) => {
        e.preventDefault()
        setComment('')
        setPostComment(oldArray => [...oldArray,{content: comment, author: {firstName: cookies.user?.firstName, lastName:cookies.user?.lastName, avatar: cookies.user?.avatar}}] );
        await fetch(`/api/comment/createComment`, {
            method: 'POST',
            body: JSON.stringify({
                comment,
                postId: postData.id,
                authorId: cookies.user?.id
            })
        })
    }
  return (
    <Container>
        <StyledPage>
            <img src={post.content}></img>
            <div>
                <UserCard isFollow={postData.author.follower.some( follower => follower['followerId'] == cookies.user?.id)} data={post.author}></UserCard>
                <h3>{post.festival.name} - {post.location}</h3>
                <p>{post.description}</p>
                <Like postId={post.id} userId={cookies.user?.id} setIsLiked={setIsLiked} isLiked={isLiked} likeCount={likeCount} setLikeCount={setLikeCount}></Like>
                <section>
                    <h2>Commentaire{postComment.length > 1 ? "s" : ""} ({postComment.length})</h2>
                    <form onSubmit={(e) => handleComment(e)}>
                        <input type="text" placeholder="Commenter" value={comment} onChange={(e) => setComment(e.target.value)}></input>
                        <Button submit>
                            Publier
                        </Button>
                    </form>
                    <div>
                        {postComment.map((comment, index) => (
                            <div key={index}>
                            <Comment data={comment} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </StyledPage>
    </Container>
  )
}

export async function getStaticPaths() {
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany();
  
    return {
      paths: posts.map((post) => ({
        params: {
          id: post.id.toString()
        }
      })),
      fallback: false
    };
  }

export async function getStaticProps({ params }) {
    const prisma = new PrismaClient()

    const request = await prisma.post.findFirst({
        where: {
            id: Number(params.id),
        },
        select: {
            id: true,
            content: true,
            description: true,
            location: true,
            createdAt: true,
            festival: {
                select: {
                    name: true
                }
            },
            comment : {
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    author : {
                        select : {
                            firstName: true,
                            lastName: true,
                            avatar: true,
                            id: true
                        }
                    }
                }
            },
            like: {
                select: {
                    id: true,
                    authorId: true,
                    author: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            avatar: true,
                        }
                    }
                }
            },
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                    follower: true
                }
            },
            authorId: true
        }
    })
    const postData = JSON.parse(JSON.stringify(request))
    return {
      props : { postData },
      revalidate: 10
    }
}
    
Post.getLayout = getLayout;