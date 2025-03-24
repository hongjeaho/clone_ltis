import DatePickerRangeBox from '@components/common/form/DatePickerRangeBox'
import InputTextBox from '@components/common/form/InputTextBox'
import styled from '@emotion/styled/macro'
import { Button, Checkbox, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { type CaseInfoListParams } from '@/model'
import { DecisionStepList } from '@/store'

import TableLabelContainer from '../common/layout/table/label/TableLabelContainer'
import TableLabelItem from '../common/layout/table/label/TableLabelItem'

interface SearchFilterProps {
  onSubmit: SubmitHandler<CaseInfoListParams>
}

const Form = styled.form`
  width: 100%;
`

const SearchFilter: React.FC<SearchFilterProps> = ({ onSubmit }) => {
  const { handleSubmit, register, control } = useForm<CaseInfoListParams>({
    defaultValues: {
      keyword: undefined,
      startRecepDt: undefined,
      endRecepDt: undefined,
      address: undefined,
      implementerNm: undefined,
      decisionStep: [],
    },
  })

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} paddingTop={2}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TableLabelContainer columnSize={4}>
          <TableRow>
            <TableLabelItem label={'검색 키워드'} colSpan={3}>
              <InputTextBox id="keyword" placeholder="사건번호 혹은 사업명" type="text" register={register} />
            </TableLabelItem>
          </TableRow>
          <TableRow>
            <TableLabelItem label={'접수일'} colSpan={3}>
              <DatePickerRangeBox control={control} startId="recepStartDt" endId="recepEndDt" />
            </TableLabelItem>
          </TableRow>
          <TableRow>
            <TableLabelItem label={'소재지'}>
              <InputTextBox id="address" type="text" register={register} />
            </TableLabelItem>
            <TableLabelItem label={'시행자명'}>
              <InputTextBox id="implementerNm" type="text" register={register} />
            </TableLabelItem>
          </TableRow>
          <TableRow>
            <TableLabelItem label={'심의 진행현황'} colSpan={3}>
              {DecisionStepList.map((step, index) => (
                <FormControlLabel
                  key={`decisionStep${index}`}
                  control={<Checkbox value={step.value} {...register('decisionStep')} />}
                  label={step.label}
                />
              ))}
            </TableLabelItem>
          </TableRow>
        </TableLabelContainer>
        <Box sx={{ paddingTop: 2 }} display={'flex'} justifyContent={'center'}>
          <Button type="submit" variant="contained" color="primary" size="large" sx={{ width: '150px' }}>
            검색
          </Button>
        </Box>
      </Form>
    </Box>
  )
}

export default SearchFilter
