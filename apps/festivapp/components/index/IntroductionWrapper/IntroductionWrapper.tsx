import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { globalColors } from '../../../pages/_app';

const IntroWrapper = styled.div`
    height: 100vh;
    width: 100Vw;
    background: ${globalColors.mainGradient};
    position: absolute;
    z-index: 1000;
    transform: translateX(0%);
    transition: transform 1.2s cubic-bezier(.73,.01,0,1),-webkit-transform 1.2s cubic-bezier(.73,.01,0,1);
    will-change: transform;
`
export default function IntroductionWrapper() {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
    }, [loading])
    
  return (
    <IntroWrapper style={{transform: loading ? "translateX(-100%)" : "translateX(0%)"}}/>
  )
}
