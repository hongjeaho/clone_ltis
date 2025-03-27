import TableBaseBody from '@components/common/layout/table/base/TableBaseBody'
import TableBaseContainer from '@components/common/layout/table/base/TableBaseContainer'
import TableBaseHead from '@components/common/layout/table/base/TableBaseHead'
import TableBaseItem from '@components/common/layout/table/base/TableBaseItem'
import TableBaseLabelItem from '@components/common/layout/table/base/TableBaseLabelItem'
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
          <TableBaseLabelItem rowSpan={2} label={'연번'} />
          <TableBaseLabelItem rowSpan={2} label={'소유자'} />
          <TableBaseLabelItem rowSpan={2} label={'토지'} />
          <TableBaseLabelItem rowSpan={2} label={'지장물'} />
          <TableBaseLabelItem colSpan={4} label={'합의평가'} />
          <TableBaseLabelItem colSpan={5} label={'경정재결'} />
          <TableBaseLabelItem rowSpan={2} label={'세부정보'} />
        </TableRow>
        <TableRow>
          <TableBaseLabelItem label={'A'} />
          <TableBaseLabelItem label={'B'} />
          <TableBaseLabelItem label={'C'} />
          <TableBaseLabelItem label={'종전'} />
          <TableBaseLabelItem label={'A'} />
          <TableBaseLabelItem label={'B'} />
          <TableBaseLabelItem label={'평균'} />
          <TableBaseLabelItem label={'격차'} />
          <TableBaseLabelItem label={'상승률'} />
        </TableRow>
      </TableBaseHead>
      <TableBaseBody>
        <TableBaseItem>1</TableBaseItem>
        <TableBaseItem>홍길동</TableBaseItem>
        <TableBaseItem>토지</TableBaseItem>
        <TableBaseItem>지장물</TableBaseItem>
        <TableBaseItem>111</TableBaseItem>
        <TableBaseItem>111</TableBaseItem>
        <TableBaseItem>111</TableBaseItem>
        <TableBaseItem>111</TableBaseItem>
        <TableBaseItem>111</TableBaseItem>
        <TableBaseItem>111</TableBaseItem>
        <TableBaseItem>111</TableBaseItem>
        <TableBaseItem>111</TableBaseItem>
        <TableBaseItem>111</TableBaseItem>
        <TableBaseItem>
          <CgSearch />
        </TableBaseItem>
      </TableBaseBody>
    </TableBaseContainer>
  )
}

export default CompensationAmountByOwnerInfo
