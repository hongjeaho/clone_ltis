import styled from '@emotion/styled/macro'
import { TableHead } from '@mui/material'
import React, { type PropsWithChildren } from 'react'

interface TableBaseHeadProps extends PropsWithChildren {}

const TableBaseHeadWrapper = styled(TableHead)``

const TableBaseHead: React.FC<TableBaseHeadProps> = ({ children }) => {
  return <TableBaseHeadWrapper>{children}</TableBaseHeadWrapper>
}

export default TableBaseHead
