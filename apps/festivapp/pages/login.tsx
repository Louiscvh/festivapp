import { useRouter } from 'next/router'
import { FormEvent, useState } from "react";
import Container from "../components/Container";
import styled from 'styled-components';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import { getLayout } from '../layouts/MenuLayout';
import Button from '../components/Button';

const StyledPage = styled.div`
  
`;


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [, setCookie] = useCookies(['user']);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()
        const response = await fetch(`/api/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        })
        const result = await response.json();
        if(response.ok){
            setCookie('user', result, { path: '/', secure: true }, );
            router.push('/feed')
        } else {
            alert(result)
        }
    }
    return (
        <>
            <Head>
                <title>Festivapp - Connexion</title>
            </Head>
            <StyledPage>
                <Container>
                    <main>
                        <h1>Connexion</h1>
                        <form onSubmit={(e) => handleLogin(e)}>
                            <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="Votre email" />
                            <input onChange={(e) => setPassword(e.target.value)} required type="password" name="email" id="password" placeholder="Votre mot de passe" />
                            <Button submit>Se connecter</Button>
                        </form>
                    </main>
                </Container>    
            </StyledPage>
        </>
    )
}

Login.getLayout = getLayout;
