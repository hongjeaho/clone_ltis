import styled from '@emotion/styled/macro'
import { Paper, Table, TableBody, TableContainer, Typography } from '@mui/material'
import { type PropsWithChildren } from 'react'

interface TableLayoutProps extends PropsWithChildren {
  title?: string
  subTitle?: string
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
  letter-spacing: 0.5px;
  padding-top: 10px;
`

const TableBaseLayout: React.FC<TableLayoutProps> = ({ title, subTitle, children }) => {
  return (
    <Base>
      <Typography display={'flex'} justifyContent={'space-between'} gutterBottom>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: 'fixed' }}>
          <TableBody sx={{ borderTop: '#005dab solid 2px' }}>{children}</TableBody>
        </Table>
      </TableContainer>
    </Base>
  )
}
export default TableBaseLayout
