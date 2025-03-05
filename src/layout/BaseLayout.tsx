import styled from '@emotion/styled/macro'
import Container from '@mui/material/Container'
import { Outlet } from 'react-router-dom'

import Footer from '@/components/base/footer/Footer'
import Header from '@/components/base/header/Header'

const Base = styled.div`
  height: 100%;
  margin: 0;
`
const Main = styled.main``

const BaseLayout: React.FC = () => {
  return (
    <Base>
      <Main>
        <Header />
        <Container fixed>
          <Outlet />
        </Container>
        <Footer />
      </Main>
    </Base>
  )
}

export default BaseLayout
