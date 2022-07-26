//Hooks
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';

//Style
import styled from 'styled-components';

//Components
import Button from '../components/Button';

//Funtions and variables
import Head from 'next/head';
import { getLayout } from '../layouts/MenuLayout';
import { globalTransitions, globalColors } from './_app';

const StyledPage = styled.main`
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
    @media screen and (max-width: 1024px) {
      margin-top: 100px;
    }
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 1024px) {
      flex-direction: column;
    }

    .landing__hero__left {
      padding: 20px;

      .landing__hero__content {
        opacity: 0;
        transition: opacity 0.5s ${globalTransitions.main};
        h2,
        p {
          margin: 0.5rem 0px;
        }

        button {
          background: ${globalColors.mainGradient};
          margin-top: 1rem;
        }
      }
    }

    img {
      max-width: 50%;
      clip-path: inset(0 0 100% 0);
      transition: clip-path 1s ${globalTransitions.main};
      border-radius: 8px;
      @media screen and (max-width: 1024px) {
        max-width: 100%;
        margin-top: 2rem;
      }
    }
  }

  #introduction {
    margin-top: 200px;
    h2 {
      text-align: center;
      font-size: 2.5rem;
      font-weight: 600;
      span {
        color: rgb(255, 116, 38);
      }
    }
  }
`;

export default function Index() {

  //Refs
  const h1 = useRef(null);
  const heroBannerContent = useRef(null);
  const heroBannerImg = useRef(null);

  //Router & cookie
  const router = useRouter();
  const [cookie] = useCookies(['user']);

  useEffect(() => {
    if (cookie.user) {
      router.push('/feed');
    }

    //Animation for the h1
    const letters = 'Festivapp';
    const lettersContainer = h1.current;

    [...letters].map((content, i) => {
      return (lettersContainer.innerHTML += `<span style="transition-delay: ${
        0.03 * i
      }s">${content}</span>`);
    });

    setTimeout(() => {
      document.querySelectorAll('h1 span').forEach((c: HTMLDivElement) => {
        c.style.transform = 'translateY(0px)';
      });
      if (heroBannerContent.current) {
        heroBannerImg.current.style.clipPath = 'inset(0 0 0 0)';
      }
    }, 400);

    setTimeout(() => {
      if (heroBannerContent.current) {
        heroBannerContent.current.style.opacity = '1';
      }
    }, 1500);

    return () => {
      lettersContainer.innerHTML = '';
    };
  });

  return (
    <>
      <Head>
        <title>Festivapp | Réseau social pour festival</title>
        <meta name="description" content="Landing page de présentation pour Festivapp" />
      </Head>
      <StyledPage>
        <section className="landing__hero__container">
          <div className="landing__hero__left">
            <h1 ref={h1}></h1>
            <div className="landing__hero__content" ref={heroBannerContent}>
              <h2>Réseau social pour festival</h2>
              <p>
                Le réseau social de tous vos festivals ! Festivapp vous
                accompagne pour partager vos meilleurs moments.
              </p>
              <Button link="/signin">Découvrir</Button>
            </div>
          </div>
          <img
            ref={heroBannerImg}
            src="https://img.huffingtonpost.com/asset/60dded403b0000d33eecb101.png?cache=F1LCXB5Pp7&ops=1778_1000"
            alt="Banner image"
          />
        </section>
        <section id="introduction">
          <h2>
            La puissance de votre <span>réseau</span>, sur votre smartphone
          </h2>
        </section>
      </StyledPage>
    </>
  );
}

Index.getLayout = getLayout;
