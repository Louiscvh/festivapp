import { FormEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Container from '../components/Container';
import { useRouter} from 'next/router'
import Head from 'next/head';

const StyledPage = styled.div`
  
`;

export default function Signin() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    const confirmedPass = useRef(null)
    const handleSignin = async(e: FormEvent) => {
        e.preventDefault()
        if(password == confirmedPass.current.value){
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
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
                router.push('/login')
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
                <Header />
                <Container>
                    <main>
                        <h1>Inscription</h1>
                        <form onSubmit={(e) => handleSignin(e)}>
                            <input required onChange={(e) => setFirstName(e.target.value)} type="text" name="firstname" id="firstname" placeholder='Votre prénom'/>
                            <input required onChange={(e) => setLastName(e.target.value)} type="text" name="lastname" id="lastname" placeholder='Votre nom'/>
                            <input required onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder='Votre adresse mail'/>
                            <input required onChange={(e) => setBirth(e.target.value)} type="date" name="birth" id="birth" placeholder='Votre date de naissance'/>
                            <input required onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder='Votre mot de passe'/>
                            <input ref={confirmedPass} required type="password" name="passwordConfirm" id="passwordConfirm" placeholder='Confirmer votre mot de passe'/>
                            <button type="submit">M&apos;inscrire</button>
                        </form>
                    </main>
                </Container>
            </StyledPage>
        </>
    )
}
