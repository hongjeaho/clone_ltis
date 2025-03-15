import styled from '@emotion/styled/macro'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { type PropsWithChildren } from 'react'

interface TableLayoutProps extends PropsWithChildren {
  title?: string
  subTitle?: string
  columnSize?: number
}

const Base = styled.div`
  padding-top: 50px;
`

const Title = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: #274ba9;
`
const SubTitle = styled.span`
  white-space: nowrap;
  font-size: 14px;
  letter-spacing: 0.0357em;
  padding-top: 10px;
`

const TableLabelContainer: React.FC<TableLayoutProps> = ({ columnSize = 2, title, subTitle, children }) => {
  return (
    <Base>
      <Typography gutterBottom display={'flex'} justifyContent={'space-between'}>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: 'fixed', borderCollapse: 'collapse' }}>
          <TableHead sx={{ display: 'none' }}>
            <TableRow>
              {Array.from(Array(columnSize)).map((_, index) => (
                <TableCell key={`tableBaseLayout${index}`} />
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ borderTop: '#005dab solid 2px' }}>{children}</TableBody>
        </Table>
      </TableContainer>
    </Base>
  )
}
export default TableLabelContainer
