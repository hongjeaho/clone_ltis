import Title from '@components/base/title/Title'
import BusinessInfo from '@components/caseInfo/BusinessSummary'
import DecisionStep from '@components/common/DecisionStep'
import CaseInfoForm from '@components/implementer/caseInfoFrom/CaseInfoForm'
import { Button, Stack } from '@mui/material'
import Box from '@mui/material/Box/Box'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

interface ImplementerWriteParams {
  judgSeq: number
}

const ImplementerWrite: React.FC = () => {
  const { judgSeq } = useParams() as unknown as Readonly<ImplementerWriteParams>

  return (
    <>
      <Title text="LTIS 입력 정보 등록" />
      <Box sx={{ paddingLeft: 20, paddingRight: 20 }}>
        <DecisionStep step={'1'} />

        <BusinessInfo judgSeq={judgSeq} />

        <CaseInfoForm />

        <Stack justifyContent={'center'} spacing={2} direction={'row'} sx={{ paddingTop: 5 }}>
          <Button
            size={'large'}
            variant={'outlined'}
            component={Link}
            to={'/implementer/application'}
          >
            목록 보기
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default ImplementerWrite
