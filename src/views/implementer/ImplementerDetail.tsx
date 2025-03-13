import DecisionStep from '@components/common/DecisionStep'
import BusinessInfo from '@components/implementer/BusinessInfo'
import EtcInfo from '@components/implementer/EtcInfo'
import ReportInfo from '@components/implementer/ReportInfo'
import { Box } from '@mui/material'

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
        </Box>
      </Box>
    </>
  )
}

export default ImplementerDetail
