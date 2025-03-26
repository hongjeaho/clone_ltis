import NextButton from '@components/common/button/NextButton'
import PrevButton from '@components/common/button/PrevButton'
import InputTextBox from '@components/common/form/InputTextBox'
import LocalDatePicker from '@components/common/form/LocalDatePicker'
import TableBaseBody from '@components/common/layout/table/base/TableBaseBody'
import TableBaseContainer from '@components/common/layout/table/base/TableBaseContainer'
import TableBaseHead from '@components/common/layout/table/base/TableBaseHead'
import { Box, Button, TableRow } from '@mui/material'
import React from 'react'
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { useInsertOrUpdateAgreementDate } from '@/api/case-application-api/case-application-api'
import TableBaseItem from '@/components/common/layout/table/base/TableBaseItem'
import TableBaseLabelItem from '@/components/common/layout/table/base/TableBaseLabelItem'
import { type AgreementDateEntity } from '@/model/agreementDateEntity'
import { useShowAlertMessage } from '@/store/message'

interface CompensationAgreementProps {
  handleNext: () => void
  handleBack: () => void
  isButtonShown: boolean
}

interface CompensationAgreementParam {
  AgreementDateList: AgreementDateEntity[]
}

const CompensationAgreement: React.FC<CompensationAgreementProps> = ({
  handleNext,
  handleBack,
  isButtonShown,
}) => {
  const showAlertMessage = useShowAlertMessage()
  const { handleSubmit, control, register } = useForm<CompensationAgreementParam>()

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
    mutate({
      judgSeq: 123,
      data: data.AgreementDateList,
    })
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
      <TableBaseContainer title={'협의 내역'}>
        <TableBaseHead>
          <TableRow>
            <TableBaseLabelItem label={'협의 날짜'} />
            <TableBaseLabelItem label={'협의 내용'} />
            <TableBaseLabelItem>
              <Button size={'large'} variant="contained" onClick={handleAppend}>
                추가 하기
              </Button>
            </TableBaseLabelItem>
          </TableRow>
        </TableBaseHead>
        <TableBaseBody>
          {fields.map((field, index) => (
            <TableRow key={index}>
              <TableBaseItem>
                <LocalDatePicker control={control} id={`AgreementDateList.${index}.title`} />
              </TableBaseItem>
              <TableBaseItem>
                <InputTextBox
                  id={`AgreementDateList.${index}.content`}
                  register={register}
                  type={'text'}
                />
              </TableBaseItem>
              <TableBaseItem>
                <Button
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
        <NextButton onClick={handleNext} />
      </Box>
    </form>
  )
}
export default CompensationAgreement
