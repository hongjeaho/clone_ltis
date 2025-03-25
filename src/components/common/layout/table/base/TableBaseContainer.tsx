import TableTitle from '@components/common/layout/TableTitle'
import styled from '@emotion/styled/macro'
import { Paper, Table, TableContainer, Typography } from '@mui/material'
import React, { type PropsWithChildren } from 'react'

interface TableBaseContainerProps extends PropsWithChildren {
  title?: string
  paddingTop?: number
}

const Base = styled.div<{ paddingTop: number }>`
  padding-top: ${({ paddingTop }) => paddingTop}px;

  th {
    border-right: 1px solid #005dab;
  }

  tr > th:last-of-type {
    border-right: none;
  }

  tr > th:last-of-type[rowspan] {
    border-left: 1px solid #005dab;
  }
`

const TableBaseContainer: React.FC<TableBaseContainerProps> = ({
  title,
  children,
  paddingTop = 50,
}) => {
  return (
    <Base paddingTop={paddingTop}>
      <Typography gutterBottom display={'flex'} justifyContent={'space-between'}>
        <TableTitle>{title}</TableTitle>
      </Typography>
      <TableContainer component={Paper} sx={{ borderTop: '#005dab solid 2px' }}>
        <Table sx={{ tableLayout: 'fixed', borderCollapse: 'collapse' }}>{children}</Table>
      </TableContainer>
    </Base>
  )
}

export default TableBaseContainer
