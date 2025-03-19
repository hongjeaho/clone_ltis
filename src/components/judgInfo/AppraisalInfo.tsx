import TableBaseBody from '@components/common/layout/table/base/TableBaseBody'
import TableBaseBodyItem from '@components/common/layout/table/base/TableBaseBodyItem'
import TableBaseContainer from '@components/common/layout/table/base/TableBaseContainer'
import TableBaseHead from '@components/common/layout/table/base/TableBaseHead'
import TableLabelItem from '@components/common/layout/table/base/TableBaseHeadItem'
import { TableRow } from '@mui/material'

interface AppraisalInfoProps {
  judgSeq: number
}

const AppraisalInfo: React.FC<AppraisalInfoProps> = ({ judgSeq }) => {
  return (
    <TableBaseContainer title={'감정평가 정보'}>
      <TableBaseHead>
        <TableRow>
          <TableLabelItem rowSpan={2} label={''} />
          <TableLabelItem colSpan={4} label={'합의평가'} />
          <TableLabelItem colSpan={5} label={'경정재결'} />
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
        <TableBaseBodyItem>평가금액(원)</TableBaseBodyItem>
        <TableBaseBodyItem>-</TableBaseBodyItem>
        <TableBaseBodyItem>-</TableBaseBodyItem>
        <TableBaseBodyItem>-</TableBaseBodyItem>
        <TableBaseBodyItem>111</TableBaseBodyItem>
        <TableBaseBodyItem>111</TableBaseBodyItem>
        <TableBaseBodyItem>111</TableBaseBodyItem>
        <TableBaseBodyItem>111</TableBaseBodyItem>
        <TableBaseBodyItem>111</TableBaseBodyItem>
        <TableBaseBodyItem>111</TableBaseBodyItem>
      </TableBaseBody>
    </TableBaseContainer>
  )
}

export default AppraisalInfo
