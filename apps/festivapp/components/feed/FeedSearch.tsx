import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { globalColors } from '../../pages/_app';

const StyledPage = styled.div`
  position: relative;

  .search__container {
    position: absolute;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    height: auto;
    overflow: scroll;
    background-color: ${globalColors.white};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    top: 60px;
    z-index: 1;

    a {
      cursor: pointer;
      border-radius: 8px;
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: ${globalColors.black};
      &:hover {
        background-color: ${globalColors.lightGrey};
      }
      img {
      height: 30px;
    }
    }

    
  }
`

export default function FeedSearch() {

    /**
    * Detect if your click outside the ref
    * @param ref Element to detect click outside
    */
  const useOutside= (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setSearchList([])
        }
      }
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [ref]);
  }

  const searchInput = useRef(null);
  useOutside(searchInput)
  const [searchList, setSearchList] = useState([]);

  const handleSearch = async(e, text) => {
    e.preventDefault()
    if(text.length > 2){
      const request = await fetch('/api/user/searchUser', {
        method: 'POST',
        body: JSON.stringify({
          text
        })
      })
      const data = await request.json()
      if(request.ok) {
        console.log(data)
        setSearchList(data)
      } else {
        setSearchList([])
      }
    }
  }
  return (
    <StyledPage ref={searchInput}>
      <input onChange={(e) => handleSearch(e, e.target.value)} placeholder='Chercher...' />
      {searchList?.length ?
        <div className="search__container">
          {searchList?.map((user, index) => (
            <Link passHref href={`/profil/${user.id}`}key={index}>
              <a>
                <img src={user.avatar} alt={user.firstName} />
                <p>{user.firstName} {user.lastName}</p>
              </a>
            </Link>
          ))}
        </div> : null
      }
      
    </StyledPage>
  )
}
