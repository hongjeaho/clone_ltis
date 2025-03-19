import NextButton from '@components/common/button/NextButton'
import InputBox from '@components/common/form/InputBox'
import TableLabelContainer from '@components/common/layout/table/label/TableLabelContainer'
import TableLabelItem from '@components/common/layout/table/label/TableLabelItem'
import { Box, TableRow } from '@mui/material'
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useInsertDecision } from '@/api/implementer-application-api/implementer-application-api'
import { type InsertDecisionParams } from '@/model'
import { useShowAlertMessage } from '@/store/message'

interface DecisionProps {
  handleNext: () => void
  isButtonShown: boolean
}

const Decision: React.FC<DecisionProps> = ({ handleNext, isButtonShown }) => {
  const showAlertMessage = useShowAlertMessage()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InsertDecisionParams>()

  const { mutate } = useInsertDecision({
    mutation: {
      onSuccess: data => {},
      onError: error => {
        showAlertMessage(error.message)
      },
    },
  })

  const onSubmit: SubmitHandler<InsertDecisionParams> = async data => {
    console.log(data)

    mutate({
      judgSeq: 123,
      params: data,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TableLabelContainer title={'사업개요'}>
        <TableRow>
          <TableLabelItem label={'규모(단위)'}>
            <InputBox id="bdecision.scale" placeholder="예) 1.234㎡" type="text" register={register} error={errors?.decision?.scale} />
          </TableLabelItem>
        </TableRow>
        <TableRow>
          <TableLabelItem label={'사업 기간'}>
            <InputBox id="bdecision.usinessPeriod" placeholder="" type="text" register={register} error={errors?.decision?.businessPeriod} />
          </TableLabelItem>
        </TableRow>

        <TableRow>
          <TableLabelItem label={'재결신청 사유'}>
            <InputBox id="bdecision.decisionReason" placeholder="" type="text" register={register} error={errors?.decision?.decisionReason} />
          </TableLabelItem>
        </TableRow>

        <TableRow>
          <TableLabelItem label={'시도지사 추천여부'}>
            <InputBox id="bdecision.recommendation" placeholder="" type="text" register={register} error={errors?.decision?.recommendation} />
          </TableLabelItem>
        </TableRow>
      </TableLabelContainer>
      <Box sx={{ display: isButtonShown ? 'flex' : 'none', paddingTop: 1 }} justifyContent={'end'}>
        <NextButton onClick={handleNext} />
      </Box>
    </form>
  )
}
export default Decision
