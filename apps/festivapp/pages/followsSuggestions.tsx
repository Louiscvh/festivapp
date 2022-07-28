import { getLayout } from '../layouts/MenuLayout';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../components/Container';
import Button from '../components/Button';
import { globalColors } from './_app';
import Link from 'next/link';


const StyledPage = styled.div`
    
    .suggestions__container {
        display: flex;
        gap: 30px;
        margin-top: 1rem;
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

    const handleSub = async (e: any) => {
        e.preventDefault()
    }
    console.log(suggestions)
  return (
    <Container>
        <StyledPage>
            <section>
                <h1>Pour commencer, voici quelques profils qui pourrait vous intéréssé</h1>
                <div className='suggestions__container'>
                    {suggestions.map(suggestion => (
                        <Link href={`/profil/${suggestion.id}`} key={suggestion.id}>
                            <a>
                                <img src={suggestion.avatar} alt="User avatar"></img>
                                <h2>{suggestion.firstName} {suggestion.lastName}</h2>
                                <p>{suggestion.follower.length} abonné {suggestion.following.length} abonnement</p>
                                <Button onClick={(e) => handleSub(e)}>
                                    Suivre
                                </Button>
                            </a>
                        </Link>
                    ))}
                </div>
                <Link href='/feed'>
                    <a>Suivant</a>
                </Link>
            </section>
        </StyledPage>
    </Container>
  )
}

FollowsSuggestions.getLayout = getLayout;