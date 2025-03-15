import TableBaseLayout from '@components/common/layout/table/TableBaseLayout'

interface AppraisalInfoProps {
  judgSeq: number
}

const AppraisalInfo: React.FC<AppraisalInfoProps> = ({ judgSeq }) => {
  return <TableBaseLayout title={'감정평가 정보'}></TableBaseLayout>
}

export default AppraisalInfo
