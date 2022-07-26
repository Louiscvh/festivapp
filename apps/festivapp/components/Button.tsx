import Link from 'next/link';
import styled from 'styled-components';
import { globalColors } from '../pages/_app';


export default function Button({children, color, link}: {children: React.ReactNode, color: string, link?: string}) {
    const StyledButton = styled.button`
    all: unset;
    border-radius: 150px;
    background-color: ${color};
    padding: 10px 25px;
    color: ${globalColors.white};
    font-family: 'Poppins', sans-serif;
    cursor: pointer;

    a {
        color: ${globalColors.white};
    }
`
  return (
    
    <StyledButton>
        {link ? 
        <Link href={link}>
            <a>{children}</a>
        </Link> 
        : 
        children }
    </StyledButton> 
  )
}
