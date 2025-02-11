import styled from '@emotion/styled/macro'
import { Outlet } from 'react-router-dom'
import Footer from '../base/Footer'
import Header from '../base/Header'

const Base = styled.div``
const Main = styled.main``
const Container = styled.div`
  vertical-align: middle;
  min-height: 356px;
  width: 1600px;
  max-width: 1600px;
  margin: 0 auto;
`

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
