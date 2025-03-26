import { TableCell } from '@mui/material'
import React, { type PropsWithChildren } from 'react'

interface TableItemProps extends PropsWithChildren {
  label?: string
  width?: number
  colSpan?: number
  rowSpan?: number
}

const TableBaseLabelItem: React.FC<TableItemProps> = ({
  width = 200,
  colSpan = 1,
  rowSpan = 1,
  label,
  children,
}) => {
  return (
    <>
      <TableCell
        rowSpan={rowSpan}
        colSpan={colSpan}
        width={width}
        sx={{
          backgroundColor: '#e7e8ea',
          color: '#0663b2',
          borderBottom: '#9f9f9f solid 1px',
          textAlign: 'center',
          padding: '2px',
        }}
      >
        {label}
        {children}
      </TableCell>
    </>
  )
}
export default TableBaseLabelItem
