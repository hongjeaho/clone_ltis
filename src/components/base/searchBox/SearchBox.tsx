import styled from '@emotion/styled/macro'
import { Checkbox } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid2'
import { type SubmitHandler, useForm } from 'react-hook-form'

import DateRangeBox from '@/commonComponents/form/DateRangeBox'
import { type FromProps } from '@/type/form/SearchForm'

import InputBox from '../../../commonComponents/form/InputBox'

interface SearchBoxProps {
  onSubmit: SubmitHandler<FromProps>
}

const decisionStepList = [
  { value: '1', label: '입력정보확인' },
  { value: '2', label: '재결접수' },
  { value: '3', label: '열람공고' },
  { value: '7', label: '열람공고 반려' },
  { value: '4', label: '재결신청 의견제출' },
  { value: '5', label: '재결관검토' },
  { value: '11', label: '재결관검토 반려' },
  { value: '6', label: '심의' },
]

const Form = styled.form`
  width: 100%;
`

const SearchBox: React.FC<SearchBoxProps> = ({ onSubmit }) => {
  const { handleSubmit, register, control } = useForm<FromProps>({
    defaultValues: {
      search: '',
      recepStartDt: '',
      recepEndDt: '',
      address: '',
      implementer: '',
      decisionStep: [],
    },
  })

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} width={'100%'} padding={5}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Grid container spacing={2} columns={2}>
            <Grid size={2}>
              <FormLabel component="legend">검색 키워드</FormLabel>
              <InputBox id="search" placeholder="사건번호 혹은 사업명" type="text" register={register} />
            </Grid>
            <Grid size={2}>
              <FormLabel component="legend">접수일</FormLabel>
              <DateRangeBox control={control} startId="recepStartDt" endId="recepEndDt" />
            </Grid>
            <Grid size={1}>
              <FormLabel component="legend">소재지</FormLabel>
              <InputBox id="address" type="text" register={register} />
            </Grid>
            <Grid size={1}>
              <FormLabel component="legend">시행자명</FormLabel>
              <InputBox id="implementer" type="text" register={register} />
            </Grid>
            <Grid size={2}>
              <FormLabel component="legend">심의 진행현황</FormLabel>
              {decisionStepList.map((step, index) => (
                <FormControlLabel
                  key={`decisionStep${index}`}
                  control={<Checkbox value={step.value} {...register('decisionStep')} />}
                  label={step.label}
                />
              ))}
            </Grid>
            <Grid size={2} sx={{ paddingLeft: 40, paddingRight: 40 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                검색
              </Button>
            </Grid>
          </Grid>
        </div>
      </Form>
    </Box>
  )
}

export default SearchBox
