import Head from 'next/head';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Container from '../components/Container';
import { getLayout } from '../layouts/MenuLayout';
import { globalTransitions } from './_app';

const StyledPage = styled.div`
  h1 {
    overflow: hidden;
    span {
      transform: translateY(150px);
      font-size: 3rem;
      display: inline-block;
      transition: transform 1.2s ${globalTransitions.main};
      will-change: transform;
    }
  }

  .landing__hero__container {
    position: relative;
    display: flex;
    margin-top: 25vh;
    justify-content: space-between;
    align-items: center;

    .landing__hero__left {
      background-color: rgba(255, 255, 255, 0.3);
      -webkit-backdrop-filter: blur(10px);
      padding: 20px;
      backdrop-filter: blur(10px);
      .landing__hero__content {
        opacity: 0;
        transition: opacity 0.5s ${globalTransitions.main};
      }
    }
    
    img {
      max-width: 50%;
      position: relative;
      left: -80px;
      z-index: -1;
    }
  }
`

export default function Index() {

  const h1 = useRef(null)
  const heroBannerContent = useRef(null)

  useEffect(() => {
      const letters = 'Festivapp';
      const lettersContainer = h1.current;
  
      [...letters].map((content,i) => {
        return lettersContainer.innerHTML += `<span style="transition-delay: ${0.03 * i}s">${content}</span>`     
      })

      setTimeout(() => {
        document.querySelectorAll('h1 span').forEach((c: HTMLDivElement) => {
          c.style.transform = "translateY(0px)"
        })
      }, 300)

      setTimeout(() => {
        heroBannerContent.current.style.opacity = "1"
      }, 1500) 
      return () => {
        lettersContainer.innerHTML = ""
       }
  })

  return (
    <>
      <Head>
        <title>Festivapp | Réseau social pour festival</title>
      </Head>
      <Container>
        <StyledPage>
          <div className="landing__hero__container">
            <div className='landing__hero__left'>
              <h1 ref={h1}></h1>
              <div className="landing__hero__content" ref={heroBannerContent}>
                <h2>Réseau social pour festival</h2>
                <p>Le réseau social de tous vos festivals ! Festivapp vous accompagne pour partager vos meilleurs moments.</p>
                <Button color="black" link="/login">Découvrir</Button>
              </div>
            </div>
            <img src="https://cdn.sortiraparis.com/images/80/1462/692910-festival-du-11-11-entre-concerts-et-shopping-au-parc-des-expositions-programmation.jpg" alt="Banner image" />
          </div>
        </StyledPage>
      </Container>
    </>
  );
}

Index.getLayout = getLayout;
