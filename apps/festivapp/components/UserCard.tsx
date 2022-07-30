import Link from "next/link"
import { useCookies } from "react-cookie";
import styled from "styled-components"
import { globalColors } from "../pages/_app";
import Button from "./Button"

const StyledPage = styled.a`
   
        padding: 1rem;
        color: ${globalColors.black};
        background-color: ${globalColors.white};
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: space-between;
        width: calc(100% - 2rem);

        & > div {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        h3 {
            inline-size: max-content;
        }

        img {
            height: 50px;
            border-radius: 150px;
        }
        button {
            z-index: 0;
        }   
`
export default function UserCard({data}) {
const [cookies, ,] = useCookies(['user']);
const handleSub = async (e: any, followerId, followingId) => {
    e.preventDefault()
    e.target.innerHTML = 'Suivi'
    const response = await fetch(`/api/follow`, {
        method: 'POST',
        body: JSON.stringify({
            followerId,
            followingId
        })
    })
    const result = await response.json();
    alert(result)
    }
  return (
    <Link href={`/profil/${data.id}`} key={data.id}>
        <StyledPage>
            <div>
                <img src={data.avatar} alt="User avatar"></img>
                <div>
                    <h3>{data.firstName + " " + data.lastName}</h3>
                    <p>{data.follower.length} abonné</p>
                </div>
            </div>
            <Button onClick={(e) => handleSub(e, cookies.user.id, data.id)}>
                Suivre
            </Button>
        </StyledPage>
    </Link>
  )
}
