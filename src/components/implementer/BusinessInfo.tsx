import TableBaseLayout from '@components/common/layout/table/TableBaseLayout'
import TableItem from '@components/common/layout/table/TableItem'
import { TableRow } from '@mui/material'

interface BusinessInfoProps {
  judgSeq: number
}

const BusinessInfo: React.FC<BusinessInfoProps> = () => {
  return (
    <TableBaseLayout title={'사업 정보'} subTitle={'LTIS 업데이트 일 : 2025-02-27 '}>
      <TableRow>
        <TableItem title={'사건번호'} value={''} />
        <TableItem title={'사건명'} value={''} />
      </TableRow>
      <TableRow>
        <TableItem title={'접수일자'} value={''} />
        <TableItem title={'진행상태'} value={''} />
      </TableRow>
      <TableRow>
        <TableItem title={'시행자가격시점'} value={''} />
        <TableItem title={'재결구분'} value={''} />
      </TableRow>
      <TableRow>
        <TableItem title={'수용재결기관'} value={''} />
        <TableItem title={'평가법인'} value={''} />
      </TableRow>
      <TableRow>
        <TableItem title={'위치'} value={''} />
        <TableItem title={'규모'} value={''} />
      </TableRow>
    </TableBaseLayout>
  )
}

export default BusinessInfo
