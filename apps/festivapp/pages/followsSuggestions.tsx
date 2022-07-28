import { getLayout } from '../layouts/MenuLayout';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../components/Container';
import Button from '../components/Button';
import { globalColors } from './_app';
import Link from 'next/link';
import Skeleton from '../components/Skeleton';


const StyledPage = styled.div`
    
    .suggestions__container {
        display: flex;
        gap: 30px;
        margin: 1rem 0px;
        flex-wrap: wrap;

        a {
            padding: 20px;
            color: ${globalColors.black};
            background-color: ${globalColors.white};
            border-radius: 8px;

            img {
                height: 50px;
                border-radius: 150px;
            }
            button {
                margin-top: 1rem;
                z-index: 0;
            }
        }
        
    }
`
export default function FollowsSuggestions() {
    const [cookies, ,] = useCookies(['user']);
    const [suggestions, setSuggestions] = useState([])
    const router = useRouter();
    useEffect(() => {
        if(!cookies.user){
            router.push('/login')
        } else {
            fetch(`/api/user/suggestions/${cookies.user.id}`)
            .then(response => response.json())
            .then(data => setSuggestions(data)) 
        }
       
    }, [router, cookies.user])

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
    console.log(suggestions)
  return (
    <Container>
        <StyledPage>
            <section>
                <h1>Pour commencer, voici quelques profils qui pourrait vous intéréssé</h1>
                <div className='suggestions__container'>
                    {suggestions.length ? suggestions.map(suggestion => (
                        <Link href={`/profil/${suggestion.id}`} key={suggestion.id}>
                            <a>
                                <img src={suggestion.avatar} alt="User avatar"></img>
                                <h2>{suggestion.firstName} {suggestion.lastName}</h2>
                                <p>{suggestion.follower.length} abonné {suggestion.following.length} abonnement</p>
                                <Button onClick={(e) => handleSub(e, cookies.user.id, suggestion.id)}>
                                    Suivre
                                </Button>
                            </a>
                        </Link>
                    )) : <Skeleton width={300} height={100}></Skeleton>}
                </div>
                <Link href='/feed'>
                    <a>Ignorer</a>
                </Link>
            </section>
        </StyledPage>
    </Container>
  )
}

FollowsSuggestions.getLayout = getLayout;