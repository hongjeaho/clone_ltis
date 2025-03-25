import styled from '@emotion/styled/macro'
import { TableCell } from '@mui/material'
import React, { type PropsWithChildren } from 'react'

interface TableItemProps extends PropsWithChildren {
  width?: number
  label: string
  value?: string
  colSpan?: number
}

const TableItemValue = styled(TableCell)`
  border-bottom: solid 1px #9f9f9f;
`

const TableLabelItem: React.FC<TableItemProps> = ({
  width = 170,
  colSpan = 1,
  label,
  value,
  children,
}) => {
  return (
    <>
      <TableCell
        width={width}
        sx={{
          backgroundColor: '#e7e8ea',
          color: '#0663b2',
          borderBottom: '#9f9f9f solid 1px',
          padding: '2px 16px',
        }}
      >
        {label}
      </TableCell>
      <TableItemValue colSpan={colSpan}>
        {value} {children}
      </TableItemValue>
    </>
  )
}
export default TableLabelItem
