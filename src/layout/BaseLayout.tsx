import styled from '@emotion/styled/macro'
import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '@/components/base/footer/Footer'
import Header from '@/components/base/header/Header'
import { useAxiosInstance } from '@/util/http'

const Base = styled.div`
  height: 100%;
  margin: 0;
`
const Main = styled.main``

const BaseLayout: React.FC = () => {
  useAxiosInstance()

  return (
    <Base>
      <Main>
        <Header />
        <Outlet />
        <Footer />
      </Main>
    </Base>
  )
}

export default BaseLayout
