import styled from '@emotion/styled/macro'
import { Outlet } from 'react-router-dom'
import Footer from '../base/Footer'
import Header from '../base/Header'

const Base = styled.div``
const Main = styled.main``
const Container = styled.div``

const BaseLayout: React.FC = () => {
  return (
    <Base>
      <Main>
        <Header />
        <Container>
          <Outlet />
        </Container>
        <Footer />
      </Main>
    </Base>
  )
}

export default BaseLayout
