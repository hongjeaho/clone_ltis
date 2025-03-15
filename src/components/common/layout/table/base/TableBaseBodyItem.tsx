import { TableCell } from '@mui/material'
import React, { type PropsWithChildren } from 'react'

interface TableBaseBodyItemProps extends PropsWithChildren {}

const TableBaseBodyItem: React.FC<TableBaseBodyItemProps> = ({ children }) => {
  return (
    <>
      <TableCell
        sx={{
          color: '#0663b2',
          borderBottom: '#9f9f9f solid 1px',
          textAlign: 'center',
          padding: '5px',
        }}
      >
        {children}
      </TableCell>
    </>
  )
}
export default TableBaseBodyItem
