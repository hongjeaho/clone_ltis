import styled from '@emotion/styled/macro'
import { TableHead } from '@mui/material'
import React, { type PropsWithChildren } from 'react'

interface TableBaseHeadProps extends PropsWithChildren {}

const TableBaseBodyWrapper = styled(TableHead)`
  th {
    border-right: 1px solid #005dab;
  }

  th:not(:has(+ th)) {
    border-right: 0;
  }
`

const TableBaseBody: React.FC<TableBaseHeadProps> = ({ children }) => {
  return <TableBaseBodyWrapper>{children}</TableBaseBodyWrapper>
}

export default TableBaseBody
