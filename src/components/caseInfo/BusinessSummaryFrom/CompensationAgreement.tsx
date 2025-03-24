import NextButton from '@components/common/button/NextButton'
import PrevButton from '@components/common/button/PrevButton'
import InputTextBox from '@components/common/form/InputTextBox'
import LocalDatePicker from '@components/common/form/LocalDatePicker'
import TableBaseBody from '@components/common/layout/table/base/TableBaseBody'
import TableBaseBodyItem from '@components/common/layout/table/base/TableBaseBodyItem'
import TableBaseContainer from '@components/common/layout/table/base/TableBaseContainer'
import TableBaseHead from '@components/common/layout/table/base/TableBaseHead'
import TableBaseHeadItem from '@components/common/layout/table/base/TableBaseHeadItem'
import { Box, Button, TableRow } from '@mui/material'
import React from 'react'
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { useInsertAgreementDate } from '@/api/case-application-api/case-application-api'
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

const CompensationAgreement: React.FC<CompensationAgreementProps> = ({ handleNext, handleBack, isButtonShown }) => {
  const showAlertMessage = useShowAlertMessage()
  const { handleSubmit, control, register } = useForm<CompensationAgreementParam>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'AgreementDateList',
  })

  const { mutate } = useInsertAgreementDate({
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
      agreementDate: '',
      agreementDetail: '',
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
            <TableBaseHeadItem label={'협의 날짜'} />
            <TableBaseHeadItem label={'협의 내용'} />
            <TableBaseHeadItem>
              <Button size={'large'} variant="contained" onClick={handleAppend}>
                추가 하기
              </Button>
            </TableBaseHeadItem>
          </TableRow>
        </TableBaseHead>
        <TableBaseBody>
          {fields.map((field, index) => (
            <TableRow key={index}>
              <TableBaseBodyItem>
                <LocalDatePicker control={control} id={`AgreementDateList.${index}.title`} />
              </TableBaseBodyItem>
              <TableBaseBodyItem>
                <InputTextBox id={`AgreementDateList.${index}.content`} register={register} type={'text'} />
              </TableBaseBodyItem>
              <TableBaseBodyItem>
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
              </TableBaseBodyItem>
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
