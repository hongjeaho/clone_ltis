import { Box } from '@mui/material'

import ImplementerStep from '@/components/base/step/ImplementerStep'
import Title from '@/components/base/title/Title'

const ImplementerDetail: React.FC = () => {
  return (
    <>
      <Title text="LTIS 입력 정보 확인" />
      <Box sx={{ paddingLeft: 20, paddingRight: 20 }}>
        <ImplementerStep step={'1'} />
      </Box>
    </>
  )
}

export default ImplementerDetail
