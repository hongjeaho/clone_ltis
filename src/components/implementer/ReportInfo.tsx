import TableBaseLayout from '@components/common/layout/table/TableBaseLayout'
import TableItem from '@components/common/layout/table/TableItem'
import { TableRow } from '@mui/material'
import { CgSearch } from 'react-icons/cg'

interface ReportInfoProps {
  judgSeq: number
}

const ReportInfo: React.FC<ReportInfoProps> = ({ judgSeq }) => {
  return (
    <TableBaseLayout title={'조서 정보'}>
      <TableRow>
        <TableItem title={'필지수'} value={''}>
          <CgSearch />
        </TableItem>
        <TableItem title={'지장물수'} value={''} />
      </TableRow>
      <TableRow>
        <TableItem title={'필지소유자수'} value={''} />
        <TableItem title={'지장물소유자수'} value={''} />
      </TableRow>
      <TableRow>
        <TableItem title={'종전금액합계(원)'} value={''} />
        <TableItem title={'면적'} value={''} />
      </TableRow>
    </TableBaseLayout>
  )
}
export default ReportInfo
