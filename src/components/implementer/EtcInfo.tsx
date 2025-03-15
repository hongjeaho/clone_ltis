import TableLabelContainer from '@components/common/layout/table/label/TableLabelContainer'
import TableLabelItem from '@components/common/layout/table/label/TableLabelItem'
import TableRow from '@mui/material/TableRow/TableRow'
import React from 'react'

interface EdcInfoProps {
  judgSeq: number
}

const EtcInfo: React.FC<EdcInfoProps> = () => {
  return (
    <TableLabelContainer title={'비고'}>
      <TableRow>
        <TableLabelItem label={'사업시행자 담당자(연락처)'} value={''} />
      </TableRow>
    </TableLabelContainer>
  )
}
export default EtcInfo
