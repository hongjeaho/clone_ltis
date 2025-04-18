import AppraisalInfo from '@components/caseInfo/AppraisalInfo'
import BusinessInfo from '@components/caseInfo/BusinessSummary'
import CompensationAmountByOwnerInfo from '@components/caseInfo/CompensationAmountByOwnerInfo'
import EtcInfo from '@components/caseInfo/EtcInfo'
import ReportInfo from '@components/caseInfo/ReportInfo'
import DecisionStep from '@components/common/DecisionStep'
import { Box, Button, Stack } from '@mui/material'
import { Link, useParams } from 'react-router-dom'

import Title from '@/components/base/title/Title'

interface ImplementerDetailParams {
  judgSeq: number
}

const ImplementerDetail: React.FC = () => {
  const { judgSeq } = useParams() as unknown as Readonly<ImplementerDetailParams>

  return (
    <>
      <Title text="LTIS 입력 정보 확인" />
      <Box sx={{ paddingLeft: 20, paddingRight: 20 }}>
        <DecisionStep step={'1'} />

        <Box>
          <BusinessInfo judgSeq={1212} />
          <ReportInfo judgSeq={121212} />
          <EtcInfo judgSeq={121212} />
          <AppraisalInfo judgSeq={121212} />
          <CompensationAmountByOwnerInfo judgSeq={1111} />
        </Box>

        <Stack justifyContent={'center'} spacing={2} direction={'row'} sx={{ paddingTop: 5 }}>
          <Button
            size={'large'}
            variant={'outlined'}
            component={Link}
            to={'/implementer/application'}
          >
            목록 보기
          </Button>

          <Button
            size={'large'}
            variant={'contained'}
            component={Link}
            to={`/implementer/application/${judgSeq}/write`}
          >
            LTIS 입력정보 등록
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default ImplementerDetail
