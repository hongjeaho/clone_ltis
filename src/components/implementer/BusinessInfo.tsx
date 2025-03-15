import TableBaseLayout from '@components/common/layout/table/TableBaseLayout'
import TableLabelItem from '@components/common/layout/table/TableLabelItem'
import { TableRow } from '@mui/material'
import React from 'react'

interface BusinessInfoProps {
  judgSeq: number
}

const BusinessInfo: React.FC<BusinessInfoProps> = () => {
  return (
    <TableBaseLayout title={'사업 정보'} subTitle={'LTIS 업데이트 일 : 2025-02-27 '}>
      <TableRow>
        <TableLabelItem lavel={'사건번호'} value={''} />
        <TableLabelItem lavel={'사건명'} value={''} />
      </TableRow>
      <TableRow>
        <TableLabelItem lavel={'접수일자'} value={''} />
        <TableLabelItem lavel={'진행상태'} value={''} />
      </TableRow>
      <TableRow>
        <TableLabelItem lavel={'시행자가격시점'} value={''} />
        <TableLabelItem lavel={'재결구분'} value={''} />
      </TableRow>
      <TableRow>
        <TableLabelItem lavel={'수용재결기관'} value={''} />
        <TableLabelItem lavel={'평가법인'} value={''} />
      </TableRow>
      <TableRow>
        <TableLabelItem lavel={'위치'} value={''} />
        <TableLabelItem lavel={'규모'} value={''} />
      </TableRow>
    </TableBaseLayout>
  )
}

export default BusinessInfo
