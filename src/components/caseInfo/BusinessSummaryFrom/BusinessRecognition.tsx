import NextButton from '@components/common/button/NextButton'
import PrevButton from '@components/common/button/PrevButton'
import InputTextBox from '@components/common/form/InputTextBox'
import TableBaseBody from '@components/common/layout/table/base/TableBaseBody'
import TableBaseContainer from '@components/common/layout/table/base/TableBaseContainer'
import TableBaseHead from '@components/common/layout/table/base/TableBaseHead'
import { Box, Button, TableRow } from '@mui/material'
import React from 'react'
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { useInsertOrUpdateBusinessRecognition } from '@/api/case-application-api/case-application-api'
import TableBaseItem from '@/components/common/layout/table/base/TableBaseItem'
import TableBaseLabelItem from '@/components/common/layout/table/base/TableBaseLabelItem'
import { type BusinessRecognitionEntity } from '@/model/businessRecognitionEntity'
import { useShowAlertMessage } from '@/store/message'

interface BusinessRecognitionProps {
  handleNext: () => void
  handleBack: () => void
  isButtonShown: boolean
}

interface BusinessRecognitionParam {
  businessRecognitionList: BusinessRecognitionEntity[]
}

const BusinessRecognition: React.FC<BusinessRecognitionProps> = ({
  handleNext,
  handleBack,
  isButtonShown,
}) => {
  const showAlertMessage = useShowAlertMessage()
  const { handleSubmit, control, register } = useForm<BusinessRecognitionParam>()

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
    mutate({
      judgSeq: 123,
      data: data.businessRecognitionList,
    })
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
            <TableBaseLabelItem label={'제목'} />
            <TableBaseLabelItem label={'내용'} />
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
                <InputTextBox
                  id={`businessRecognitionList.${index}.title`}
                  register={register}
                  type={'text'}
                />
              </TableBaseItem>
              <TableBaseItem>
                <InputTextBox
                  id={`businessRecognitionList.${index}.content`}
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
export default BusinessRecognition
