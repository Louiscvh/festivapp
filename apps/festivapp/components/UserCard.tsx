import Link from "next/link"
import { useState } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components"
import { globalColors } from "../pages/_app";
import Button from "./Button"

const StyledPage = styled.a`
        cursor: pointer;
        padding: 1rem;
        color: ${globalColors.black};
        background-color: ${globalColors.white};
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        justify-content: space-between;
        width: calc(100% - 2rem);

        & > div {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        h5 {
            inline-size: max-content;
            font-size: 1rem;
            width : 100px;
            overflow:hidden;
            display:inline-block;
            text-overflow: ellipsis;
            white-space: nowrap;

            @media screen and (max-width: 1024px) {
                overflow: auto;
                text-overflow: unset;
                width : fit-content
            }
        }

        img {
            height: 50px;
            border-radius: 150px;
        }
        button {
            z-index: 0;
        }   
`
export default function UserCard({isFollow, data} : {isFollow?: boolean, data: any}) {
const [cookies, ,] = useCookies(['user']);
const [isFollowed, setIsFollowed] = useState(isFollow)
const [followCounter, setFollowCounter] = useState(data.follower.length)
const handleSub = async (e: any, followerId, followingId) => {
    e.preventDefault()
    setIsFollowed(!isFollowed)
    setFollowCounter(isFollowed ? followCounter - 1 : followCounter + 1)
    await fetch(`/api/follow`, {
        method: 'POST',
        body: JSON.stringify({
            followerId,
            followingId
        })
    })
  }
  return (
    <Link passHref href={`/profil/${data.id}`} key={data.id}>
        <StyledPage>
            <div>
                <img src={data.avatar} alt="User avatar"></img>
                <div>
                    <h5>{data.firstName + " " + data.lastName}</h5>
                    <p>{followCounter} abonné{followCounter.length > 1 ? "s" : ""}</p>
                </div>
            </div>
            <Button onClick={(e) => handleSub(e, cookies.user.id, data.id)}>
                {!isFollowed ? 'Suivre' : 'Ne plus suivre'}
            </Button>
        </StyledPage>
    </Link>
  )
}
