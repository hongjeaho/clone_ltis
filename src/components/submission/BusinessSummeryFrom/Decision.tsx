import NextButton from '@components/common/button/NextButton'
import InputRadioBox from '@components/common/form/InputRadioBox'
import InputTextBox from '@components/common/form/InputTextBox'
import TableLabelContainer from '@components/common/layout/table/label/TableLabelContainer'
import TableLabelItem from '@components/common/layout/table/label/TableLabelItem'
import SkeletonLoading from '@components/common/SkeletonLoading'
import { Box, TableRow } from '@mui/material'
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useDecisionInfo, useInsertDecision } from '@/api/implementer-application-api/implementer-application-api'
import { type DecisionEntity } from '@/model'
import { useShowAlertMessage } from '@/store/message'

interface DecisionProps {
  handleNext: () => void
  isButtonShown: boolean
  judgSeq: number
}

const Decision: React.FC<DecisionProps> = ({ judgSeq, handleNext, isButtonShown }) => {
  // 사업 개요 조회
  const { data, isSuccess } = useDecisionInfo(judgSeq)
  if (isSuccess) {
    return <DecisionForm defaultData={data} handleNext={handleNext} isButtonShown={isButtonShown} judgSeq={judgSeq} />
  }

  return <SkeletonLoading />
}

interface DecisionFromProps {
  handleNext: () => void
  isButtonShown: boolean
  judgSeq: number
  defaultData?: DecisionEntity
}

const DecisionForm: React.FC<DecisionFromProps> = ({ defaultData, judgSeq, handleNext, isButtonShown }) => {
  const showAlertMessage = useShowAlertMessage()

  // 사업 개요 저장 API 설정
  const { mutate } = useInsertDecision({
    mutation: {
      onSuccess: data => {
        handleNext()
      },
      onError: error => {
        showAlertMessage(error.message)
      },
    },
  })

  // 사업 개요 form 설정
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DecisionEntity>({
    defaultValues: defaultData,
  })

  // 사업 개용 저장 submit
  const onSubmit: SubmitHandler<DecisionEntity> = async data => {
    console.log(data)

    mutate({
      judgSeq,
      data,
    })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <TableLabelContainer title={'사업개요'}>
        <TableRow>
          <TableLabelItem label={'규모(단위)'}>
            <InputTextBox
              id="scale"
              placeholder="예) 1.234㎡"
              type="text"
              register={register}
              error={errors?.scale}
              rules={{
                required: '규모 단위를 입력해 주세요.',
              }}
            />
          </TableLabelItem>
        </TableRow>
        <TableRow>
          <TableLabelItem label={'사업 기간'}>
            <InputTextBox
              id="businessPeriod"
              type="text"
              register={register}
              error={errors?.businessPeriod}
              rules={{
                required: '사업 기간을 입력해 주세요.',
              }}
            />
          </TableLabelItem>
        </TableRow>

        <TableRow>
          <TableLabelItem label={'재결신청 사유'}>
            <InputTextBox
              id="decisionReason"
              placeholder=""
              type="text"
              register={register}
              error={errors?.decisionReason}
              rules={{
                required: '재결신청 사유를 입력해 주세요.',
              }}
            />
          </TableLabelItem>
        </TableRow>

        <TableRow>
          <TableLabelItem label={'시도지사 추천여부'}>
            <InputRadioBox
              id={'recommendation'}
              register={register}
              error={errors?.recommendation}
              defaultValue={defaultData?.recommendation}
              rules={{
                required: '시도지사 추천여부 선택은 필수 입니다.',
              }}
              data={[
                { value: true, label: '네' },
                { value: false, label: '아니오' },
              ]}
            />
          </TableLabelItem>
        </TableRow>
      </TableLabelContainer>
      <Box sx={{ display: isButtonShown ? 'flex' : 'none', paddingTop: 1 }} justifyContent={'end'}>
        <NextButton type={'submit'} />
      </Box>
    </Box>
  )
}

export default Decision
