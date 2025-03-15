import TableBaseLayout from '@components/common/layout/table/TableBaseLayout'
import TableLabelItem from '@components/common/layout/table/TableLabelItem'
import TableRow from '@mui/material/TableRow/TableRow'
import React from 'react'

interface EdcInfoProps {
  judgSeq: number
}

const EtcInfo: React.FC<EdcInfoProps> = () => {
  return (
    <TableBaseLayout title={'비고'}>
      <TableRow>
        <TableLabelItem lavel={'사업시행자 담당자(연락처)'} value={''} />
      </TableRow>
    </TableBaseLayout>
  )
}
export default EtcInfo
