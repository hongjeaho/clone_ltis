import styled from '@emotion/styled/macro'
import { Paper, Table, TableContainer, Typography } from '@mui/material'
import React, { type PropsWithChildren } from 'react'

interface TableBaseContainerProps extends PropsWithChildren {
  title: string
}

const Base = styled.div`
  padding-top: 50px;

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

const Title = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: #274ba9;
`
const TableBaseContainer: React.FC<TableBaseContainerProps> = ({ title, children }) => {
  return (
    <Base>
      <Typography gutterBottom display={'flex'} justifyContent={'space-between'}>
        <Title>{title}</Title>
      </Typography>
      <TableContainer component={Paper} sx={{ borderTop: '#005dab solid 2px' }}>
        <Table sx={{ tableLayout: 'fixed', borderCollapse: 'collapse' }}>{children}</Table>
      </TableContainer>
    </Base>
  )
}

export default TableBaseContainer
