import NextButton from '@components/common/button/NextButton'
import PrevButton from '@components/common/button/PrevButton'
import InputTextBox from '@components/common/form/InputTextBox'
import TableBaseBody from '@components/common/layout/table/base/TableBaseBody'
import TableBaseBodyItem from '@components/common/layout/table/base/TableBaseBodyItem'
import TableBaseContainer from '@components/common/layout/table/base/TableBaseContainer'
import TableBaseHead from '@components/common/layout/table/base/TableBaseHead'
import TableBaseHeadItem from '@components/common/layout/table/base/TableBaseHeadItem'
import { Box, Button, TableRow } from '@mui/material'
import React from 'react'
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { useInsertDecisionBusinessRecognition } from '@/api/implementer-application-api/implementer-application-api'
import { type DecisionBusinessRecognitionEntity } from '@/model'
import { useShowAlertMessage } from '@/store/message'

interface BusinessRecognitionProps {
  handleNext: () => void
  handleBack: () => void
  isButtonShown: boolean
}

interface BusinessRecognitionParam {
  decisionBusinessRecognitionList: DecisionBusinessRecognitionEntity[]
}

const BusinessRecognition: React.FC<BusinessRecognitionProps> = ({ handleNext, handleBack, isButtonShown }) => {
  const showAlertMessage = useShowAlertMessage()
  const { handleSubmit, control, register } = useForm<BusinessRecognitionParam>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'decisionBusinessRecognitionList',
  })

  const { mutate } = useInsertDecisionBusinessRecognition({
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
      data: data.decisionBusinessRecognitionList,
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
            <TableBaseHeadItem label={'제목'} />
            <TableBaseHeadItem label={'내용'} />
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
                <InputTextBox id={`decisionBusinessRecognitionList.${index}.title`} register={register} type={'text'} />
              </TableBaseBodyItem>
              <TableBaseBodyItem>
                <InputTextBox id={`decisionBusinessRecognitionList.${index}.content`} register={register} type={'text'} />
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
export default BusinessRecognition
