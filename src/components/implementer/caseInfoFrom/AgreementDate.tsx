import InputTextBox from '@components/common/form/InputTextBox'
import LocalDatePicker from '@components/common/form/LocalDatePicker'
import TableBaseBody from '@components/common/layout/table/base/TableBaseBody'
import TableBaseContainer from '@components/common/layout/table/base/TableBaseContainer'
import TableBaseHead from '@components/common/layout/table/base/TableBaseHead'
import TableBaseItem from '@components/common/layout/table/base/TableBaseItem'
import TableBaseLabelItem from '@components/common/layout/table/base/TableBaseLabelItem'
import SkeletonLoading from '@components/common/SkeletonLoading'
import NextButton from '@components/implementer/button/NextButton'
import PrevButton from '@components/implementer/button/PrevButton'
import { Box, Button, TableRow } from '@mui/material'
import React from 'react'
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import {
  useGetAgreementDateByJudgSeq,
  useInsertOrUpdateAgreementDate,
} from '@/api/case-application-api/case-application-api'
import { type AgreementDateEntity } from '@/model/agreementDateEntity'
import { useShowAlertMessage } from '@/store/message'

interface CompensationAgreementProps {
  judgSeq: number
  handleNext: () => void
  handleBack: () => void
  isButtonShown: boolean
}

interface CompensationAgreementParam {
  AgreementDateList: AgreementDateEntity[]
}

const AgreementDate: React.FC<CompensationAgreementProps> = ({
  judgSeq,
  handleNext,
  handleBack,
  isButtonShown,
}) => {
  const { data, isSuccess } = useGetAgreementDateByJudgSeq(judgSeq)

  if (isSuccess) {
    return (
      <AgreementDateForm
        judgSeq={judgSeq}
        handleNext={handleNext}
        handleBack={handleBack}
        isButtonShown={isButtonShown}
        defaultData={data}
      />
    )
  }

  return <SkeletonLoading />
}

interface AgreementFormProps {
  judgSeq: number
  handleNext: () => void
  handleBack: () => void
  isButtonShown: boolean
  defaultData: AgreementDateEntity[]
}

const AgreementDateForm: React.FC<AgreementFormProps> = ({
  judgSeq,
  handleNext,
  handleBack,
  isButtonShown,
  defaultData,
}) => {
  const showAlertMessage = useShowAlertMessage()
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<CompensationAgreementParam>({
    defaultValues: {
      AgreementDateList: defaultData,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'AgreementDateList',
  })

  const { mutate } = useInsertOrUpdateAgreementDate({
    mutation: {
      onSuccess: data => {},
      onError: error => {
        showAlertMessage(error.message)
      },
    },
  })

  const onSubmit: SubmitHandler<CompensationAgreementParam> = async data => {
    const AgreementDateList = data.AgreementDateList
    if (AgreementDateList.length === 0) {
      showAlertMessage('협의날짜를 하나 이상 등록해 주세요.')
      return
    }

    mutate({
      judgSeq,
      data: AgreementDateList,
    })

    handleNext()
  }

  const handleAppend = () => {
    append({
      agreedDate: '',
      agreedDesc: '',
    })
  }

  const handleRemove = (index: number) => {
    remove(index)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TableBaseContainer title={'협의 날짜'}>
        <TableBaseHead>
          <TableRow>
            <TableBaseLabelItem width={150} label={'협의 날짜'} />
            <TableBaseLabelItem width={500} label={'협의 내용'} />
            <TableBaseLabelItem>
              <Button
                type={'button'}
                size={'large'}
                variant="contained"
                onClick={handleAppend}
                sx={{ width: 130 }}
              >
                추가 하기
              </Button>
            </TableBaseLabelItem>
          </TableRow>
        </TableBaseHead>
        <TableBaseBody>
          {fields.map((field, index) => (
            <TableRow key={index}>
              <TableBaseItem>
                <LocalDatePicker
                  control={control}
                  id={`AgreementDateList.${index}.agreedDate`}
                  error={errors?.AgreementDateList?.[index]?.agreedDate}
                  rules={{
                    required: '협의 날짜를 입력해 주세요',
                  }}
                />
              </TableBaseItem>
              <TableBaseItem>
                <InputTextBox
                  id={`AgreementDateList.${index}.agreedDesc`}
                  register={register}
                  type={'text'}
                  error={errors?.AgreementDateList?.[index]?.agreedDesc}
                  rules={{
                    required: '협의 날짜 내용을 입력해 주세요',
                  }}
                />
              </TableBaseItem>
              <TableBaseItem>
                <Button
                  type={'button'}
                  size={'large'}
                  variant="outlined"
                  onClick={() => {
                    handleRemove(index)
                  }}
                  color={'error'}
                >
                  삭제 하기
                </Button>
              </TableBaseItem>
            </TableRow>
          ))}
        </TableBaseBody>
      </TableBaseContainer>
      <Box
        sx={{
          display: isButtonShown ? 'flex' : 'none',
          justifyContent: 'space-between',
          paddingTop: 1,
        }}
      >
        <PrevButton onClick={handleBack} />
        <NextButton type={'submit'} />
      </Box>
    </form>
  )
}
export default AgreementDate
