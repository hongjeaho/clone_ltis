import TableBaseBody from '@components/common/layout/table/base/TableBaseBody'
import TableBaseBodyItem from '@components/common/layout/table/base/TableBaseBodyItem'
import TableBaseContainer from '@components/common/layout/table/base/TableBaseContainer'
import TableBaseHead from '@components/common/layout/table/base/TableBaseHead'
import TableLabelItem from '@components/common/layout/table/base/TableBaseHeadItem'
import { TableRow } from '@mui/material'
import React from 'react'
import { CgSearch } from 'react-icons/cg'

interface CompensationAmountByOwnerInfoProps {
  judgSeq: number
}

const CompensationAmountByOwnerInfo: React.FC<CompensationAmountByOwnerInfoProps> = () => {
  return (
    <TableBaseContainer title={'소유자별 보상액'}>
      <TableBaseHead>
        <TableRow>
          <TableLabelItem rowSpan={2} label={'연번'} />
          <TableLabelItem rowSpan={2} label={'소유자'} />
          <TableLabelItem rowSpan={2} label={'토지'} />
          <TableLabelItem rowSpan={2} label={'지장물'} />
          <TableLabelItem colSpan={4} label={'합의평가'} />
          <TableLabelItem colSpan={5} label={'경정재결'} />
          <TableLabelItem rowSpan={2} label={'세부정보'} />
        </TableRow>
        <TableRow>
          <TableLabelItem label={'A'} />
          <TableLabelItem label={'B'} />
          <TableLabelItem label={'C'} />
          <TableLabelItem label={'종전'} />
          <TableLabelItem label={'A'} />
          <TableLabelItem label={'B'} />
          <TableLabelItem label={'평균'} />
          <TableLabelItem label={'격차'} />
          <TableLabelItem label={'상승률'} />
        </TableRow>
      </TableBaseHead>
      <TableBaseBody>
        <TableBaseBodyItem>1</TableBaseBodyItem>
        <TableBaseBodyItem>홍길동</TableBaseBodyItem>
        <TableBaseBodyItem>토지</TableBaseBodyItem>
        <TableBaseBodyItem>지장물</TableBaseBodyItem>
        <TableBaseBodyItem>111</TableBaseBodyItem>
        <TableBaseBodyItem>111</TableBaseBodyItem>
        <TableBaseBodyItem>111</TableBaseBodyItem>
        <TableBaseBodyItem>111</TableBaseBodyItem>
        <TableBaseBodyItem>111</TableBaseBodyItem>
        <TableBaseBodyItem>111</TableBaseBodyItem>
        <TableBaseBodyItem>111</TableBaseBodyItem>
        <TableBaseBodyItem>111</TableBaseBodyItem>
        <TableBaseBodyItem>111</TableBaseBodyItem>
        <TableBaseBodyItem>
          <CgSearch />
        </TableBaseBodyItem>
      </TableBaseBody>
    </TableBaseContainer>
  )
}

export default CompensationAmountByOwnerInfo
