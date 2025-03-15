import styled from '@emotion/styled/macro'
import { TableCell } from '@mui/material'
import React, { type PropsWithChildren } from 'react'

interface TableItemProps extends PropsWithChildren {
  width?: number
  lavel: string
  value?: string
  colSpan?: number
}

const TableItemValue = styled(TableCell)`
  border-bottom: '#9f9f9f solid 1px';
`

const TableLabelItem: React.FC<TableItemProps> = ({ width = 200, colSpan = 1, lavel, value, children }) => {
  return (
    <>
      <TableCell width={width} sx={{ backgroundColor: '#e7e8ea', color: '#0663b2', borderBottom: '#9f9f9f solid 1px' }}>
        {lavel}
      </TableCell>
      <TableItemValue colSpan={colSpan}>
        {value} {children}
      </TableItemValue>
    </>
  )
}
export default TableLabelItem
