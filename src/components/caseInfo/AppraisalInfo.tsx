import TableBaseBody from '@components/common/layout/table/base/TableBaseBody'
import TableBaseContainer from '@components/common/layout/table/base/TableBaseContainer'
import TableBaseHead from '@components/common/layout/table/base/TableBaseHead'
import TableBaseItem from '@components/common/layout/table/base/TableBaseItem'
import TableBaseLabelItem from '@components/common/layout/table/base/TableBaseLabelItem'
import { TableRow } from '@mui/material'

interface AppraisalInfoProps {
  judgSeq: number
}

const AppraisalInfo: React.FC<AppraisalInfoProps> = ({ judgSeq }) => {
  return (
    <TableBaseContainer title={'감정평가 정보'}>
      <TableBaseHead>
        <TableRow>
          <TableBaseLabelItem rowSpan={2} label={''} />
          <TableBaseLabelItem colSpan={4} label={'합의평가'} />
          <TableBaseLabelItem colSpan={5} label={'경정재결'} />
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
        <TableBaseItem>평가금액(원)</TableBaseItem>
        <TableBaseItem>-</TableBaseItem>
        <TableBaseItem>-</TableBaseItem>
        <TableBaseItem>-</TableBaseItem>
        <TableBaseItem>111</TableBaseItem>
        <TableBaseItem>111</TableBaseItem>
        <TableBaseItem>111</TableBaseItem>
        <TableBaseItem>111</TableBaseItem>
        <TableBaseItem>111</TableBaseItem>
        <TableBaseItem>111</TableBaseItem>
      </TableBaseBody>
    </TableBaseContainer>
  )
}

export default AppraisalInfo
