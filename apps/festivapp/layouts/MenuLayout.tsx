import styled from 'styled-components'
import Header from '../components/Header';

const DashboardLayoutStyle = styled.div`
   
`
export default function DashboardLayout({ children }) {

    return (
      <DashboardLayoutStyle>
        <Header />
        {children}
      </DashboardLayoutStyle>
    )
  }

  export const getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;