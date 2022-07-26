import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Container from '../components/Container';
import Header from '../components/Header';
import IntroductionWrapper from '../components/index/IntroductionWrapper/IntroductionWrapper';
import { globalColors } from './_app';
import { getLayout } from '../layouts/MenuLayout';
const StyledPage = styled.div`

  h1 {
    overflow: hidden;
    span {
      transform: translateY(150px);
      font-size: 3rem;
      display: inline-block;
      transition: transform 1.2s cubic-bezier(.73,.01,0,1),-webkit-transform 1.2s cubic-bezier(.73,.01,0,1);
      will-change: transform;
    }
  }
`

export default function Index() {

  const h1 = useRef(null)

  useEffect(() => {
    window.addEventListener('load',() => {
      const letters = 'Festivapp';
      const lettersContainer = h1.current;
  
      [...letters].map((content,i) => {
        return lettersContainer.innerHTML += `<span style="transition-delay: ${0.07 * i}s">${content}</span>`
      })

      setTimeout(() => {
        document.querySelectorAll('h1 span').forEach((c: HTMLDivElement) => {
          c.style.transform = "translateY(0px)"
        })
      }, 100)

    })
  })

  return (
    <>
      <IntroductionWrapper />
      <StyledPage>
        <Container>
          <h1 ref={h1}></h1>
          <p>Le réseau social de tous vos festivals !</p>
        </Container>
      </StyledPage>
    </>
  );
}

Index.getLayout = getLayout;
