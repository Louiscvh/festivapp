import { useState } from "react";
import styled from "styled-components";
import { globalColors } from '../../pages/_app';
import Button from "../Button";
import { useCookies } from "react-cookie";

const StyledPage = styled.section`

    h2 {
        margin-bottom: 1rem;
    }
    img {
        height: 80px;
        width: 80px;
        aspect-ratio: 1/1;
        border-radius: 8px;
    }

    .edit__picture {
        label {
            border: 2px dashed #cacaca;
            padding: 1rem;
            border-radius: 8px;
            cursor: pointer;
            width: fit-content;
        }

        input {
            display: none;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;
        input, textarea {
            border: none;
            padding: 10px;
            background-color: ${globalColors.lightGrey};
            border-radius: 8px;
        }

        div {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
    }

    .edit__password {
        margin-top: 2rem;
    }
`

export default function EditProfil({setEditOpen, password, setPassword, passwordConfirm, setPasswordConfirm, firstName, setFirstName, bio, setBio, avatar, setAvatar, picture, setPicture, lastName, setLastName, user}) {
    const [, setCookie, ] = useCookies(['user'])
    const handlePicture = async(e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('file', picture?.pictureAsFile)
        formData.append('upload_preset', 'fbbgz8oc')

        await fetch('https://api.cloudinary.com/v1_1/dymgd55eu/image/upload?folder=avatar', {
            method: "POST",
            body: formData
        }).then(r => r.json()).then(r => {
            setAvatar(r.secure_url)
            handleEdit(r.secure_url)
        })

    }
    const handleEdit = async(pictureUrl) => {
        setEditOpen(false)
        setCookie('user', {id: user?.id, avatar: avatar || '/img/user.webp', firstName, lastName, bio}, { path: '/', secure: true, maxAge: 604800 }, );
        fetch('/api/user/updateUser', {
            method: 'POST',
            body : JSON.stringify({
                userId: user?.id,
                avatar: pictureUrl,
                bio,
                firstName,
                lastName,
            })
        })
    }

    const handlePassword = (e) => {
        e.preventDefault();
        if(password || passwordConfirm) {
            if(password == passwordConfirm) {
                console.log('password ok')
                console.log(password)
            } else {
                console.log('password not ok')
            }
        } else {
            console.log('password empty')
        }

        
    }
  return (
    <StyledPage>
      <h2>Modifier mon profil</h2>
      <form onSubmit={(e) => handlePicture(e)}>
        <div>
            <h3>Modifier mon image de profil</h3>
            
            <div className="edit__picture">
                <label htmlFor="picture">
                    {picture ? <img src={picture ? picture?.picturePreview : user?.avatar} alt="Profil image"></img> :  "Ajouter une photo"}
                </label>
                <input id="picture" type="file" accept="image/*" 
                    onChange={(e) => setPicture({
                        picturePreview: URL.createObjectURL(e.target.files[0]),
                        pictureAsFile: e.target.files[0],
                    })}></input>
            </div>
        </div>
        <div>
            <h3>{user?.bio ? "Modifier ma biographie" :  "Ajouter une biographie"}</h3>
            <textarea onChange={(e) => setBio(e.target.value)} placeholder={user?.bio ? "Modifier ma biographie" :  "Ajouter une biographie"} value={bio}></textarea>
        </div>
        <div>
            <h3>Modifier mon prénom et mon nom</h3>
            <div>
                <input type="text" placeholder="Modifier mon prénom" onChange={(e) => setFirstName(e.target.value)} value={firstName}></input>
                <input type="text" placeholder="Modifier mon nom" onChange={(e) => setLastName(e.target.value)} value={lastName}></input>
            </div>
        </div>
        
        <Button submit>Modifier</Button>
      </form>
      <form className="edit__password" onSubmit={(e) => handlePassword(e)}>
        <div>
            <h3>Modifier mon mot de passe</h3>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Nouveau mot de passe"></input>
            <input value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} type="password" placeholder="Confirmer mot de passe"></input>
        </div>
        <Button submit>Modifier mon mot de passe</Button>
      </form>
    </StyledPage>
  )
}
