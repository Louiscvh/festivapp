//Style
import styled from 'styled-components';

//Variable
import { globalColors } from '../../pages/_app';

const StyledPage = styled.button`
  display: flex;
  border: none;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.8rem;
  cursor: pointer;
  padding: 10px;
  color: ${globalColors.black};
  border-radius: 8px;
  background-color: ${globalColors.lightGrey};
  svg {
    will-change: transform;
    transition: transform 0.2s ease-in-out;
  }
  &:hover svg {
    transform: scale(1.1);
  }
`;

export default function Like({
  likeVisible,
  isLiked,
  setIsLiked,
  likeCount,
  setLikeCount,
  postId,
  userId,
}: {
  likeVisible?: boolean;
  isLiked: any;
  setIsLiked: any;
  likeCount: any;
  setLikeCount: any;
  postId: number;
  userId: number;
}) {

  /**
   * Like a post
   * @param e Event from input
   * @param postId Id of the post to like
   * @param userId Id of the user who liked the post
   */
  const handleLike = async (e, postId: number, userId: number) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    await fetch(`/api/like`, {
      method: 'POST',
      body: JSON.stringify({
        postId,
        userId,
      }),
    });
  };

  return (
    <StyledPage onClick={(e) => handleLike(e, postId, userId)}>
      {!isLiked ? (
        <svg
          width="28"
          height="24"
          viewBox="0 0 38 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.25 2.25C5.41825 2.25 1.5 6.128 1.5 10.9125C1.5 14.7747 3.03125 23.9412 18.104 33.2075C18.374 33.3718 18.684 33.4587 19 33.4587C19.3161 33.4587 19.626 33.3718 19.896 33.2075C34.9688 23.9412 36.5 14.7747 36.5 10.9125C36.5 6.128 32.5818 2.25 27.75 2.25C22.9183 2.25 19 7.5 19 7.5C19 7.5 15.0818 2.25 10.25 2.25Z"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="28"
          height="24"
          viewBox="0 0 38 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.25 2.25C5.41825 2.25 1.5 6.128 1.5 10.9125C1.5 14.7747 3.03125 23.9412 18.104 33.2075C18.374 33.3718 18.684 33.4587 19 33.4587C19.3161 33.4587 19.626 33.3718 19.896 33.2075C34.9688 23.9412 36.5 14.7747 36.5 10.9125C36.5 6.128 32.5818 2.25 27.75 2.25C22.9183 2.25 19 7.5 19 7.5C19 7.5 15.0818 2.25 10.25 2.25Z"
            fill="black"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {likeVisible && (
        <p>
          {likeCount} like{likeCount > 1 ? 's' : ''}
        </p>
      )}
    </StyledPage>
  );
}
