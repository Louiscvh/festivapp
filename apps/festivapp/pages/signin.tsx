import { FormEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import Container from '../components/Container';
import { useRouter} from 'next/router'
import Head from 'next/head';
import { getLayout } from '../layouts/MenuLayout';
import Button from '../components/Button';
import { useCookies } from 'react-cookie';
import {useEffect} from 'react'
const StyledPage = styled.div`
    main {
        height: calc(100vh - 200px);
        display: flex;
        gap: 5rem;
        margin-bottom: 1rem;
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
                position: relative;
                width: 100%;
                left: 50%;
                transform: translateX(-50%);

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
    gap: 1.2rem;
    input {
        border-radius: 8px;
        padding: 1rem;
        border: none;
        width: calc(100% - 2rem);
    }

    button {
        margin-bottom: 5rem;
        @media screen and (max-width: 1000px) {
            margin-bottom: 1rem;
        }
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
export default function Signin() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['user']);
    const router = useRouter()
    const confirmedPass = useRef(null)

    useEffect(() => {
        if(cookies.user) {
            router.push('/feed')
        }
    }, [router, cookies.user])

    const handleSignin = async(e: FormEvent) => {
        e.preventDefault()
        if(password == confirmedPass.current.value){
            const response = await fetch(`/api/signin`, {
                method: 'POST',
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    birth,
                    password
                })
            })
            const result = await response.json();
            if(response.ok){
                setCookie('user', result, { path: '/' });
                router.push('/followsSuggestions')
            } else {
                alert(result)
            }
        } else {
            alert('Les mots de passe ne correspondent pas') 
        }
    }
    return (
        <>
            <Head>
                <title>Festivapp - Inscription</title>
            </Head>
            <StyledPage>
                <Container>
                    <main>
                        <div>
                            <div>
                                <h1>Inscription à Festivapp</h1>
                                <form onSubmit={(e) => handleSignin(e)}>
                                    <label>Votre prénom</label>
                                    <input required onChange={(e) => setFirstName(e.target.value)} type="text" name="firstname" id="firstname" placeholder='John'/>
                                    <label>Votre nom</label>
                                    <input required onChange={(e) => setLastName(e.target.value)} type="text" name="lastname" id="lastname" placeholder='Doe'/>
                                    <label>Votre email</label>
                                    <input required onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder='johndoe@gmail.com'/>
                                    <label htmlFor="birth">Votre date de naissance</label>
                                    <input required onChange={(e) => setBirth(e.target.value)} type="date" name="birth" id="birth" placeholder='Votre date de naissance'/>
                                    <label>Votre mot de passe</label>
                                    <input required onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder='Votre mot de passe'/>
                                    <label>Confirmer votre mot de passe</label>
                                    <input ref={confirmedPass} required type="password" name="passwordConfirm" id="passwordConfirm" placeholder='Confirmer votre mot de passe'/>
                                    <Button submit>M&apos;inscrire</Button>
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

Signin.getLayout = getLayout;
