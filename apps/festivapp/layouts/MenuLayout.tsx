//Style
import styled from 'styled-components'

//Components
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IntroductionWrapper from '../components/index/IntroductionWrapper/IntroductionWrapper';

const MenuLayoutStyle = styled.div`
   .layout__children {
        margin-top: 100px;
   }
`
export default function DashboardLayout({ children }) {

    return (
      <MenuLayoutStyle>
        <Header />
        <IntroductionWrapper />
        <div className="layout__children">
          <Container>
            {children}
          </Container>
        </div>
        <Container>          
          <Footer />
        </Container>
      </MenuLayoutStyle>
    )
  }

  export const getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;