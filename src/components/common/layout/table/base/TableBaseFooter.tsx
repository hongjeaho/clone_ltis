import styled from '@emotion/styled/macro'
import { TableFooter } from '@mui/material'
import React, { type PropsWithChildren } from 'react'

interface TableBaseFooterProps extends PropsWithChildren {}

const TableBaseFooterWrapper = styled(TableFooter)``

const TableBaseFooter: React.FC<TableBaseFooterProps> = ({ children }) => {
  return <TableBaseFooterWrapper>{children}</TableBaseFooterWrapper>
}

export default TableBaseFooter
