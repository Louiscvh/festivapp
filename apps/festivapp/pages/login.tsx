import { useRouter } from 'next/router'
import { FormEvent, useState } from "react";
import Container from "../components/Container";
import styled from 'styled-components';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import { getLayout } from '../layouts/MenuLayout';
import Button from '../components/Button';

const StyledPage = styled.div`
    main {
        height: calc(100vh - 150px);
        display: flex;
        gap: 5rem;
        @media screen and (max-width: 900px) {
            flex-direction: column;
        }
        & > div {
            position: relative;
            width: 50%;
            @media screen and (max-width: 1000px) {
                width: 100%;
            }
            & > div {
                @media screen and (max-width: 1000px) {
                    position: relative;
                    left: 0;
                    top: 0;
                    transform: translate(0, 0);
                }
                position: absolute;
                width: 100%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, calc(-50% - 100px));

                h1 {
                    margin-bottom: 1rem;
                }
            }
                
            }

        aside {
            width: 50%;
            @media screen and (max-width: 1000px) {
                width: 100%;
            }

            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
                background-position: center;
                border-radius: 20px;
            }
        }
    }
    
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    input {
        border-radius: 8px;
        padding: 1rem;
        border: none;
        width: calc(100% - 2rem);
    }
  }

  .login__remember {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    label {
        width: fit-content;
        white-space: nowrap;
    }
  }
`;


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [, setCookie] = useCookies(['user']);
    const [remenber, setRemenber] = useState(false);

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
            setCookie('user', result, { path: '/', secure: true, maxAge: remenber ?  2630000 : 86400}, );
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
                        <div>
                            <div>
                                <h1>Connexion</h1>
                                <form onSubmit={(e) => handleLogin(e)}>
                                    <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="Votre email" />
                                    <input onChange={(e) => setPassword(e.target.value)} required type="password" name="email" id="password" placeholder="Votre mot de passe" />
                                    <div className="login__remember">
                                        <label htmlFor="remember">Se souvenir de moi</label>
                                        <input id="remember" type="checkbox" onChange={() => setRemenber(!remenber)} checked={remenber} />
                                    </div>
                                    <Button submit>Se connecter</Button>
                                </form>
                                </div>
                        </div>
                        <aside>
                            <img src='https://media.istockphoto.com/photos/people-with-their-arms-in-air-at-music-festival-picture-id494896581?k=20&m=494896581&s=612x612&w=0&h=PYtPlHWqBA_qllePfC8HPSJ_0RvkEbk1DlzwwZYFtak=' alt="Login img"></img>
                        </aside>
                    </main>
                    </Container>    
            </StyledPage>
        </>
    )
}

Login.getLayout = getLayout;
