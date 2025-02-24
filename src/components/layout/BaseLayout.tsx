import styled from '@emotion/styled/macro'
import { Outlet } from 'react-router-dom'
import Footer from '../base/Footer'
import Header from '../base/Header'
import Container from '@mui/material/Container'

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
