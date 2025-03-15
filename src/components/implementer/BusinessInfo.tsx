import TableLabelContainer from '@components/common/layout/table/label/TableLabelContainer'
import TableLabelItem from '@components/common/layout/table/label/TableLabelItem'
import { TableRow } from '@mui/material'
import React from 'react'

interface BusinessInfoProps {
  judgSeq: number
}

const BusinessInfo: React.FC<BusinessInfoProps> = () => {
  return (
    <TableLabelContainer title={'사업 정보'} subTitle={'LTIS 업데이트 일 : 2025-02-27 '}>
      <TableRow>
        <TableLabelItem label={'사건번호'} value={''} />
        <TableLabelItem label={'사건명'} value={''} />
      </TableRow>
      <TableRow>
        <TableLabelItem label={'접수일자'} value={''} />
        <TableLabelItem label={'진행상태'} value={''} />
      </TableRow>
      <TableRow>
        <TableLabelItem label={'시행자가격시점'} value={''} />
        <TableLabelItem label={'재결구분'} value={''} />
      </TableRow>
      <TableRow>
        <TableLabelItem label={'수용재결기관'} value={''} />
        <TableLabelItem label={'평가법인'} value={''} />
      </TableRow>
      <TableRow>
        <TableLabelItem label={'위치'} value={''} />
        <TableLabelItem label={'규모'} value={''} />
      </TableRow>
    </TableLabelContainer>
  )
}

export default BusinessInfo
