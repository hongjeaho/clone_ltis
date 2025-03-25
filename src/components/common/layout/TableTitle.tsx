import styled from '@emotion/styled/macro'
import React, { type PropsWithChildren } from 'react'

interface TableTitleProps extends PropsWithChildren {}

const Title = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: #274ba9;
`

const TableTitle: React.FC<TableTitleProps> = ({ children }) => {
  return <Title>{children}</Title>
}

export default TableTitle
