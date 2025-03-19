import TableLabelContainer from '@components/common/layout/table/label/TableLabelContainer'
import TableLabelItem from '@components/common/layout/table/label/TableLabelItem'
import { TableRow } from '@mui/material'
import React from 'react'
import { CgSearch } from 'react-icons/cg'

interface ReportInfoProps {
  judgSeq: number
}

const ReportInfo: React.FC<ReportInfoProps> = () => {
  return (
    <TableLabelContainer title={'조서 정보'}>
      <TableRow>
        <TableLabelItem label={'필지수'} value={''}>
          <CgSearch />
        </TableLabelItem>
        <TableLabelItem label={'지장물수'} value={''} />
      </TableRow>
      <TableRow>
        <TableLabelItem label={'필지소유자수'} value={''} />
        <TableLabelItem label={'지장물소유자수'} value={''} />
      </TableRow>
      <TableRow>
        <TableLabelItem label={'종전금액합계(원)'} value={''} />
        <TableLabelItem label={'면적'} value={''} />
      </TableRow>
    </TableLabelContainer>
  )
}
export default ReportInfo
