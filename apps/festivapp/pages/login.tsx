import { useRouter } from 'next/router'
import { FormEvent, useState } from "react";
import Container from "../components/Container";
import styled from 'styled-components';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import { getLayout } from '../layouts/MenuLayout';
import Button from '../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

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
                transform: translate(-50%, -50%) ;

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

    div {
        width: 100%;
        position: relative;
        button {
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            background: none;
            position: absolute;
            right: 0.7rem;
            top: 50%;
            padding: 1rem;
            transform: translateY(-50%);
        }
    }
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

    input {
        width: fit-content;
    }
  }
`;


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['user']);
    const [remember, setRemember] = useState(false);
    const [passVisible, setPassVisible] = useState(false);

    useEffect(() => {
        if(cookies.user) {
            router.push('/feed')
        }
    }, [router, cookies.user])
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
            setCookie('user', result, { path: '/', secure: true, maxAge: remember ?  2630000 : 86400}, );
            router.push('/feed')
        } else {
            toast.error(result, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }
    return (
        <>
            <Head>
                <title>Festivapp - Connexion</title>
            </Head>
            <StyledPage>
                <ToastContainer />
                <Container>
                    <main>
                        <div>
                            <div>
                                <h1>Connexion à Festivapp</h1>
                                <form onSubmit={(e) => handleLogin(e)}>
                                    <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="Votre email" />
                                    <div>
                                        {passVisible ? 
                                            <button type="button" onClick={() => setPassVisible(!passVisible)}>
                                                <svg  width="16" height="16" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.359 9.738C15.06 8.22 16 6.5 16 6.5C16 6.5 13 1 7.99996 1C7.03955 1.00331 6.09002 1.20342 5.20996 1.588L5.97996 2.359C6.6274 2.12315 7.31091 2.00168 7.99996 2C10.12 2 11.879 3.168 13.168 4.457C13.7883 5.08069 14.3444 5.76513 14.828 6.5C14.77 6.587 14.706 6.683 14.633 6.788C14.298 7.268 13.803 7.908 13.168 8.543C13.003 8.708 12.831 8.871 12.651 9.029L13.359 9.738Z" fill="#1F1616"></path><path d="M11.2974 7.67587C11.5205 7.05171 11.5618 6.37701 11.4165 5.73029C11.2712 5.08356 10.9452 4.49139 10.4765 4.02269C10.0078 3.55398 9.41566 3.22801 8.76893 3.0827C8.12221 2.93738 7.44751 2.97871 6.82335 3.20187L7.64635 4.02487C8.03066 3.96986 8.4225 4.00511 8.79083 4.12783C9.15915 4.25055 9.49383 4.45736 9.76834 4.73188C10.0429 5.0064 10.2497 5.34107 10.3724 5.7094C10.4951 6.07772 10.5304 6.46956 10.4754 6.85387L11.2974 7.67587ZM8.35435 8.97487L9.17635 9.79687C8.5522 10.02 7.8775 10.0613 7.23077 9.91604C6.58405 9.77073 5.99188 9.44475 5.52317 8.97605C5.05447 8.50734 4.72849 7.91517 4.58318 7.26845C4.43787 6.62172 4.4792 5.94702 4.70235 5.32287L5.52535 6.14587C5.47035 6.53018 5.5056 6.92202 5.62832 7.29034C5.75104 7.65866 5.95785 7.99334 6.23237 8.26786C6.50688 8.54237 6.84156 8.74918 7.20988 8.8719C7.5782 8.99462 7.97004 9.02987 8.35435 8.97487Z" fill="#1F1616"></path><path d="M3.35 3.97C3.17 4.13 2.997 4.292 2.832 4.457C2.21165 5.08069 1.65552 5.76512 1.172 6.5L1.367 6.788C1.702 7.268 2.197 7.908 2.832 8.543C4.121 9.832 5.881 11 8 11C8.716 11 9.39 10.867 10.02 10.64L10.79 11.412C9.90994 11.7965 8.9604 11.9967 8 12C3 12 0 6.5 0 6.5C0 6.5 0.939 4.779 2.641 3.262L3.349 3.971L3.35 3.97ZM13.646 12.854L1.646 0.853996L2.354 0.145996L14.354 12.146L13.646 12.854Z" fill="#1F1616"></path></svg>
                                            </button>
                                            :
                                            <button type="button" onClick={() => setPassVisible(!passVisible)}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8C16 8 13 2.5 8 2.5C3 2.5 0 8 0 8C0 8 3 13.5 8 13.5C13 13.5 16 8 16 8ZM1.173 8C1.65651 7.26512 2.21264 6.58069 2.833 5.957C4.12 4.668 5.88 3.5 8 3.5C10.12 3.5 11.879 4.668 13.168 5.957C13.7884 6.58069 14.3445 7.26512 14.828 8C14.77 8.087 14.706 8.183 14.633 8.288C14.298 8.768 13.803 9.408 13.168 10.043C11.879 11.332 10.119 12.5 8 12.5C5.88 12.5 4.121 11.332 2.832 10.043C2.21165 9.41931 1.65552 8.73487 1.172 8H1.173Z" fill="#1F1616"></path><path d="M8 5.5C7.33696 5.5 6.70107 5.76339 6.23223 6.23223C5.76339 6.70107 5.5 7.33696 5.5 8C5.5 8.66304 5.76339 9.29893 6.23223 9.76777C6.70107 10.2366 7.33696 10.5 8 10.5C8.66304 10.5 9.29893 10.2366 9.76777 9.76777C10.2366 9.29893 10.5 8.66304 10.5 8C10.5 7.33696 10.2366 6.70107 9.76777 6.23223C9.29893 5.76339 8.66304 5.5 8 5.5ZM4.5 8C4.5 7.07174 4.86875 6.1815 5.52513 5.52513C6.1815 4.86875 7.07174 4.5 8 4.5C8.92826 4.5 9.8185 4.86875 10.4749 5.52513C11.1313 6.1815 11.5 7.07174 11.5 8C11.5 8.92826 11.1313 9.8185 10.4749 10.4749C9.8185 11.1313 8.92826 11.5 8 11.5C7.07174 11.5 6.1815 11.1313 5.52513 10.4749C4.86875 9.8185 4.5 8.92826 4.5 8Z" fill="#1F1616"></path></svg>
                                            </button>
                                        }
                                        <input onChange={(e) => setPassword(e.target.value)} required type={passVisible ? "text" : "password"} name="email" id="password" placeholder="Votre mot de passe" />
                                    </div>
                                    <div className="login__remember">
                                        <label htmlFor="remember">Se souvenir de moi</label>
                                        <input id="remember" type="checkbox" onChange={() => setRemember(!remember)} checked={remember} />
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
