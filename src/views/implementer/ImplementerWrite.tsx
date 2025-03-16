import Title from '@components/base/title/Title'
import DecisionStep from '@components/common/DecisionStep'
import BusinessInfo from '@components/implementer/BusinessInfo'
import BusinessSummeryFrom from '@components/implementer/BusinessSummeryFrom'
import { Button, Stack } from '@mui/material'
import Box from '@mui/material/Box/Box'
import React from 'react'
import { type SubmitHandler } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'

import { type ImplementerApplicationRequest } from '@/model'

interface ImplementerWriteParams {
  judgSeq: number
}

const ImplementerWrite: React.FC = () => {
  const { judgSeq } = useParams() as unknown as Readonly<ImplementerWriteParams>

  const onSubmit: SubmitHandler<ImplementerApplicationRequest> = async data => {
    console.log({ ...data })
  }

  return (
    <>
      <Title text="LTIS 입력 정보 등록" />
      <Box sx={{ paddingLeft: 20, paddingRight: 20 }}>
        <DecisionStep step={'1'} />

        <BusinessInfo judgSeq={judgSeq} />

        <BusinessSummeryFrom onSubmit={onSubmit} />

        <Stack justifyContent={'center'} spacing={2} direction={'row'} sx={{ paddingTop: 5 }}>
          <Button size={'large'} variant={'outlined'} component={Link} to={'/implementer/application'}>
            목록 보기
          </Button>

          <Button size={'large'} variant={'contained'} color={'secondary'} component={Link} to={`/implementer/application/${judgSeq}/write`}>
            임시 저장
          </Button>

          <Button size={'large'} variant={'contained'} component={Link} to={`/implementer/application/${judgSeq}/write`}>
            사전 검토 요청
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default ImplementerWrite
