import InputTextBox from '@components/common/form/InputTextBox'
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
  useGetBusinessRecognitionByJudgSeq,
  useInsertOrUpdateBusinessRecognition,
} from '@/api/case-application-api/case-application-api'
import { type BusinessRecognitionEntity } from '@/model/businessRecognitionEntity'
import { useShowAlertMessage } from '@/store/message'

interface BusinessRecognitionProps {
  judgSeq: number
  handleNext: () => void
  handleBack: () => void
  isButtonShown: boolean
}

const BusinessRecognition: React.FC<BusinessRecognitionProps> = ({
  judgSeq,
  handleNext,
  handleBack,
  isButtonShown,
}) => {
  const { data, isSuccess } = useGetBusinessRecognitionByJudgSeq(judgSeq)

  if (isSuccess) {
    return (
      <BusinessRecognitionForm
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

interface BusinessRecognitionFormProps {
  judgSeq: number
  handleNext: () => void
  handleBack: () => void
  isButtonShown: boolean
  defaultData: BusinessRecognitionEntity[]
}

interface BusinessRecognitionParam {
  businessRecognitionList: BusinessRecognitionEntity[]
}

const BusinessRecognitionForm: React.FC<BusinessRecognitionFormProps> = ({
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
  } = useForm<BusinessRecognitionParam>({ defaultValues: { businessRecognitionList: defaultData } })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'businessRecognitionList',
  })

  const { mutate } = useInsertOrUpdateBusinessRecognition({
    mutation: {
      onSuccess: data => {},
      onError: error => {
        showAlertMessage(error.message)
      },
    },
  })

  const onSubmit: SubmitHandler<BusinessRecognitionParam> = async data => {
    const businessRecognitionList = data.businessRecognitionList
    if (businessRecognitionList.length === 0) {
      showAlertMessage('사업 인정 관계를 하나 이상 등록해 주세요.')
      return
    }

    mutate({
      judgSeq,
      data: businessRecognitionList,
    })

    handleNext()
  }

  const handleAppend = () => {
    append({
      title: '',
      content: '',
    })
  }

  const handleRemove = (index: number) => {
    remove(index)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TableBaseContainer title={'도시계획 [사업인정]관계'}>
        <TableBaseHead>
          <TableRow>
            <TableBaseLabelItem width={300} label={'제목'} />
            <TableBaseLabelItem width={500} label={'내용'} />
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
                <InputTextBox
                  id={`businessRecognitionList.${index}.title`}
                  register={register}
                  type={'text'}
                  error={errors?.businessRecognitionList?.[index]?.title}
                  rules={{
                    required: '사업인정 관계 제목을 입력해 주세요',
                  }}
                />
              </TableBaseItem>
              <TableBaseItem>
                <InputTextBox
                  id={`businessRecognitionList.${index}.content`}
                  register={register}
                  type={'text'}
                  error={errors?.businessRecognitionList?.[index]?.content}
                  rules={{
                    required: '사업인정 관계 내요을 입력해 주세요',
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

export default BusinessRecognition
