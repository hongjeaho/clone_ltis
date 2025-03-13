import TableBaseLayout from '@components/common/layout/table/TableBaseLayout'
import TableItem from '@components/common/layout/table/TableItem'

interface EdcInfoProps {
  judgSeq: number
}

const EtcInfo: React.FC<EdcInfoProps> = () => {
  return (
    <TableBaseLayout title={'비고'}>
      <TableItem title={'사업시행자 담당자(연락처)'} value={''} />
    </TableBaseLayout>
  )
}
export default EtcInfo
