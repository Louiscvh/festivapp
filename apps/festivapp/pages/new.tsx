import Container from '../components/Container';
import { getLayout } from '../layouts/MenuLayout';
import styled from 'styled-components';
import Button from '../components/Button';
import { globalColors } from './_app';
import { PrismaClient } from '@prisma/client';
import { useState } from 'react';
import NewPreview from '../components/new/NewPreview';
import { InferGetStaticPropsType } from 'next';
import { json } from 'stream/consumers';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

const StyledPage = styled.div`
margin-bottom: 2rem;
main {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
}

form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    & > label {
        border: 2px dashed #cacaca;
        padding: 1rem;
        border-radius: 8px;
        cursor: pointer;
        position: relative;
        @media screen and (max-width: 1024px) {
            width: 100%;
        }

        img {
            width: 50px;
            aspect-ratio: 1/1;
            object-fit: cover;
            border-radius: 8px;
            @media screen and (max-width: 1024px) {
                width: 100%;
            }
        }

        input {
            display: none;
        }
    }

    & > input, & > select, & > textarea {
        all: unset;
        background-color: ${globalColors.white};
        border-radius: 8px;
        padding: 1rem;
        font-family: 'Poppins', sans-serif;
        width: calc(100% - 2rem);
        @media screen and (max-width: 1024px) {
            width: 100%;
        }
    }

    .new__visible {
        display: flex;
        gap: 0.5rem;
    }
}
`
export default function New({festivals}: InferGetStaticPropsType<typeof getStaticProps>) {
    const [cookies, setCookies ,] = useCookies(['user'])
    const [picture, setPicture] = useState(null);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('')
    const [festival, setFestival] = useState(null);
    const [likeVisible, setLikeVisible] = useState('true');

    const router = useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        const formData = new FormData()
        formData.append('file', picture?.pictureAsFile)
        formData.append('upload_preset', 'fbbgz8oc')

        const request = await fetch('https://api.cloudinary.com/v1_1/dymgd55eu/image/upload', {
            method: "POST",
            body: formData
        }).then(r => r.json())
        if(request.secure_url) {
            try {
                await fetch('/api/post/createPost', {
                    method: 'POST',
                    body: JSON.stringify({
                        description,
                        content: request.secure_url,
                        location,
                        userId: cookies.user?.id,
                        festival
                    })
                })
                router.push('/feed')
            } catch(e) {
                alert(e)
            }
        }
    }

    return (
    <StyledPage>
        <Container>
            <main>
                <section>
                    <h1>Ajouter un post</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label>
                             {!picture ? "Ajouter une photo" : <img src={picture?.picturePreview}></img>}
                            <input required type="file" accept="image/*" 
                            onChange={(e) => setPicture({
                                picturePreview: URL.createObjectURL(e.target.files[0]),
                                pictureAsFile: e.target.files[0],
                            })}></input>
                        </label>
                        <input required type="text" placeholder='Ajouter un lieu' onChange={(e) => setLocation(e.target.value)}></input>
                        <textarea placeholder='Ajouter une description' onChange={(e) => setDescription(e.target.value)}></textarea>
                        <select required onChange={(e) => setFestival(e.target.options[e.target.selectedIndex].value)}>
                            <option selected disabled value="">Choisissez un festival</option>
                            {festivals.map((festival, i) => (
                                <option key={i} value={festival.id}>{festival.name}</option>
                            ))}
                        </select>
                        <h3>Voulez-vous afficher le nombre de like sur votre post ?</h3>
                        <div className="new__visible">
                            <div>
                                <input checked={likeVisible === "true"} onChange={(e) => setLikeVisible(e.target.value)} value="true" type="radio" name="yes_no" id="yes" />
                                <label htmlFor='yes'>Oui</label>
                            </div>
                            <div>
                                <input checked={likeVisible === "false"} onChange={(e) => setLikeVisible(e.target.value)} value="false" type="radio" name="yes_no" id="no" />
                                <label htmlFor='no'>Non</label>
                            </div>
                        </div>
                        <Button submit>
                            Poster
                        </Button>
                    </form>
                </section>
                <section id="new__preview">
                    <NewPreview picture={picture} description={description} location={location} festival={festival} likeVisible={likeVisible}></NewPreview>
                </section>
            </main>
        </Container>
    </StyledPage>
  )
}

export async function getStaticProps() {
    const prisma = new PrismaClient()

    const request = await prisma.festival.findMany()
    const festivals = JSON.parse(JSON.stringify(request))
    return {
      props : { festivals }
    }
  }

New.getLayout = getLayout;
