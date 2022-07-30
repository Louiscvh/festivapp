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
import UserCard from '../components/UserCard';


const StyledPage = styled.div`
    margin-bottom: 1rem;    
    .suggestions__container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        margin: 1rem 0px;
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
            fetch(`/api/user/suggestions/${cookies.user?.id}/10`)
            .then(response => response.json())
            .then(data => setSuggestions(data)) 
        }
       
    }, [router, cookies.user])

      return (
    <Container>
        <StyledPage>
            <section>
                <h1>Pour commencer, voici quelques profils qui pourrait vous intéréssé</h1>
                <div className='suggestions__container'>
                    {suggestions.length ? suggestions.map((suggestion, i) => (
                        <UserCard data={suggestion} key={i} />
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