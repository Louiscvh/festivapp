import Link from 'next/link';
import styled from 'styled-components';

export default function Button({children, link, submit, ...buttonProps}: {children: React.ReactNode, color?: string, link?: string, submit?: boolean, onClick?: any}) {

    const StyledButton = styled.button.attrs({ 
        type: submit ? "submit" : "button",
      })`
        color: white;
        position: relative;
        padding: 12px 20px;
        font-weight: 600;
        font-size: 0.8rem;
        cursor: pointer;
        border: none;
        background: transparent;
        font-weight: 600;
        border-radius: 150px;

        &::before {
            content: '';
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0px;
            top: 0px;
            z-index: -1;
            background: rgba(249, 58, 19, 0.32);
            border-radius: 3rem;
            transform: scale(1.08) scaleY(1.08);
        }
        
        &:hover {
            &::after {
                transform: scale(1.08) scaleY(1.08);
            }
        }
        &::after {
            content: '';
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0px;
            top: 0px;
            z-index: -1;
            background: linear-gradient(92.83deg, rgb(255, 116, 38) 0%, rgb(249, 58, 19) 100%);
            border-radius: 3rem;
            transition: transform .15s ease;
        }

        a {
            color: white;
        }
    `
  return (
    
    <StyledButton {...buttonProps}>
        {link ? 
        <Link href={link}>
            <a>{children}</a>
        </Link> 
        : 
        children }
    </StyledButton> 
  )
}
