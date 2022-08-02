import styled from "styled-components"
import { globalColors } from '../../pages/_app';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import Like from "../feed/Like";

const StyledPage = styled.aside`
    @media screen and (max-width: 1024px) {
        display: none;
    }
    padding: 1rem;
    border-radius: 8px;
    background-color: ${globalColors.white};
    width: 500px;

    & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    .new__picture {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 8px;
        background-color: ${globalColors.lightGrey};
    }
    
    .new__like{
        margin-top: 0.5rem;
    }
    & > h4{
        margin-top: 0.5rem;
    }

    .new__user {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        img {
            height: 30px;
            width: 30px;
        }
    }
`
export default function NewPreview({picture, description, location, festival, likeVisible}) {
    const [cookies, , ] = useCookies(['user']);
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        if (cookies.user) {
            setCurrentUser(cookies.user)
        }
    }, [cookies.user])

  return (
    <StyledPage>
        <div>
            <div className="new__user">
                <img src={currentUser?.avatar} alt='User avatar'></img>
                <h4>{cookies.user?.firstName} {cookies.user?.lastName}</h4>
            </div>
            <p>{location || '-'}</p>
        </div>
        <img className='new__picture' src={picture ? picture.picturePreview : '/icon-192x192.png'} alt="preview" />
        <div className="new__like">
            <svg width="28" height="24" viewBox="0 0 38 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.25 2.25C5.41825 2.25 1.5 6.128 1.5 10.9125C1.5 14.7747 3.03125 23.9412 18.104 33.2075C18.374 33.3718 18.684 33.4587 19 33.4587C19.3161 33.4587 19.626 33.3718 19.896 33.2075C34.9688 23.9412 36.5 14.7747 36.5 10.9125C36.5 6.128 32.5818 2.25 27.75 2.25C22.9183 2.25 19 7.5 19 7.5C19 7.5 15.0818 2.25 10.25 2.25Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>{likeVisible == 'true' ? '0 like' : ''}</p>
        </div>
        <h4>{festival || '-'}</h4>
        <p>{description || '-'}</p>
    </StyledPage>
  )
}
