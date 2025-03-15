import DateRangeBox from '@components/common/form/DateRangeBox'
import InputBox from '@components/common/form/InputBox'
import styled from '@emotion/styled/macro'
import { Button, Checkbox, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { type GetImplementerApplicationParams } from '@/model'
import { DecisionStepList } from '@/store'

import TableBaseLayout from '../common/layout/table/TableBaseLayout'
import TableItem from '../common/layout/table/TableItem'

interface SearchFilterProps {
  onSubmit: SubmitHandler<GetImplementerApplicationParams>
}

const Form = styled.form`
  width: 100%;
`

const SearchFilter: React.FC<SearchFilterProps> = ({ onSubmit }) => {
  const { handleSubmit, register, control } = useForm<GetImplementerApplicationParams>({
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
        <TableBaseLayout columnSize={4}>
          <TableRow>
            <TableItem title={'검색 키워드'} colSpan={3}>
              <InputBox id="keyword" placeholder="사건번호 혹은 사업명" type="text" register={register} />
            </TableItem>
          </TableRow>
          <TableRow>
            <TableItem title={'접수일'} colSpan={3}>
              <DateRangeBox control={control} startId="recepStartDt" endId="recepEndDt" />
            </TableItem>
          </TableRow>
          <TableRow>
            <TableItem title={'소재지'}>
              <InputBox id="address" type="text" register={register} />
            </TableItem>
            <TableItem title={'시행자명'}>
              <InputBox id="implementerNm" type="text" register={register} />
            </TableItem>
          </TableRow>
          <TableRow>
            <TableItem title={'심의 진행현황'} colSpan={3}>
              {DecisionStepList.map((step, index) => (
                <FormControlLabel
                  key={`decisionStep${index}`}
                  control={<Checkbox value={step.value} {...register('decisionStep')} />}
                  label={step.label}
                />
              ))}
            </TableItem>
          </TableRow>
        </TableBaseLayout>
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
