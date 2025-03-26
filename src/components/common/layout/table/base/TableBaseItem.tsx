import { TableCell } from '@mui/material'
import React, { type PropsWithChildren } from 'react'

interface TableBaseItemProps extends PropsWithChildren {
  align?: 'left' | 'center' | 'right'
  label?: string
}

const TableBaseItem: React.FC<TableBaseItemProps> = ({ align = 'center', label, children }) => {
  return (
    <>
      <TableCell
        sx={{
          color: '#0663b2',
          borderBottom: '#9f9f9f solid 1px',
          textAlign: align,
          padding: '5px',
        }}
      >
        {children}
      </TableCell>
    </>
  )
}
export default TableBaseItem
