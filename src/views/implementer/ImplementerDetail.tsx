import DecisionStep from '@components/common/DecisionStep'
import AppraisalInfo from '@components/implementer/AppraisalInfo'
import BusinessInfo from '@components/implementer/BusinessInfo'
import CompensationAmountByOwnerInfo from '@components/implementer/CompensationAmountByOwnerInfo'
import EtcInfo from '@components/implementer/EtcInfo'
import ReportInfo from '@components/implementer/ReportInfo'
import { Box, Button, Stack } from '@mui/material'

import Title from '@/components/base/title/Title'

const ImplementerDetail: React.FC = () => {
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
          <Button size={'large'} variant={'contained'}>
            LTIS 입력정보 등록
          </Button>
          <Button size={'large'} variant={'outlined'}>
            목록 보기
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default ImplementerDetail
