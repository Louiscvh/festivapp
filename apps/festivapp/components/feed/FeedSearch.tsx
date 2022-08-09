//Hook
import { useRef, useState, useEffect } from 'react';

//Style
import styled from 'styled-components';

//Components
import Link from 'next/link';

//Variable
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

    h5 {
      margin-bottom: 0.3rem;
    }

    a {
      cursor: pointer;
      border-radius: 8px;
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: ${globalColors.black};
      &:hover {
        background-color: ${globalColors.lightGrey};
      }

      p {
        font-size: 0.8rem;
      }
      img {
        height: 30px;
        border-radius: 8px;
        object-fit: cover;
        aspect-ratio: 1/1;
      }
    }
  }
`;

export default function FeedSearch() {
  //State
  const [searchList, setSearchList] = useState(null);
  const [open, setOpen] = useState(false);
  const [empty, setEmpty] = useState(false);
  //Ref
  const searchInput = useRef(null);

  /**
   * Detect if your click outside the ref
   * @param ref Element to detect click outside
   */
  const useOutside = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [ref]);
  };

  useOutside(searchInput);

  /**
   * Search user by firstname and lastname
   * @param e Event from input
   * @param text Current text in input
   */
  const handleSearch = async (e, text) => {
    e.preventDefault();
    if (text.length > 1) {
      const request = await fetch('/api/user/searchUser', {
        method: 'POST',
        body: JSON.stringify({
          text,
        }),
      });
      const data = await request.json();
      if (data.length) {
        setEmpty(false);
        setSearchList(data);
      } else {
        setEmpty(true);
      }
    } else {
      setSearchList([]);
    }
  };
  return (
    <StyledPage ref={searchInput} onClick={() => setOpen(true)}>
      <input
        onChange={(e) => handleSearch(e, e.target.value)}
        placeholder="Chercher un nom..."
      />
      {searchList && searchList.length > 0 ? (
        <div
          className="search__container"
          style={{ display: open ? 'flex' : 'none' }}
        >
          {empty ? (
            <h5>Aucun résultat</h5>
          ) : (
            <>
              <h5>
                Résultat{searchList?.length > 1 ? 's' : ''} ({searchList.length}
                )
              </h5>
              {searchList?.map((user, index) => (
                <Link passHref href={`/profil/${user.id}`} key={index}>
                  <a>
                    <img src={user.avatar} alt={user.firstName} />
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                  </a>
                </Link>
              ))}
            </>
          )}
        </div>
      ) : null}
    </StyledPage>
  );
}
