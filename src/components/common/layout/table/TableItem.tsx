import { TableCell } from '@mui/material'
import { type PropsWithChildren } from 'react'

interface TableItemProps extends PropsWithChildren {
  width?: number
  title: string
  value: string
}

const TableItem: React.FC<TableItemProps> = ({ width = 200, title, value, children }) => {
  return (
    <>
      <TableCell width={width} sx={{ backgroundColor: '#e7e8ea', color: '#0663b2', borderBottom: '#9f9f9f solid 1px' }}>
        {title}
      </TableCell>
      <TableCell sx={{ borderBottom: '#9f9f9f solid 1px' }}>
        {value} {children}
      </TableCell>
    </>
  )
}
export default TableItem
