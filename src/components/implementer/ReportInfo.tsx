import TableBaseLayout from '@components/common/layout/table/TableBaseLayout'
import TableLabelItem from '@components/common/layout/table/TableLabelItem'
import { TableRow } from '@mui/material'
import React from 'react'
import { CgSearch } from 'react-icons/cg'

interface ReportInfoProps {
  judgSeq: number
}

const ReportInfo: React.FC<ReportInfoProps> = () => {
  return (
    <TableBaseLayout title={'조서 정보'}>
      <TableRow>
        <TableLabelItem lavel={'필지수'} value={''}>
          <CgSearch />
        </TableLabelItem>
        <TableLabelItem lavel={'지장물수'} value={''} />
      </TableRow>
      <TableRow>
        <TableLabelItem lavel={'필지소유자수'} value={''} />
        <TableLabelItem lavel={'지장물소유자수'} value={''} />
      </TableRow>
      <TableRow>
        <TableLabelItem lavel={'종전금액합계(원)'} value={''} />
        <TableLabelItem lavel={'면적'} value={''} />
      </TableRow>
    </TableBaseLayout>
  )
}
export default ReportInfo
